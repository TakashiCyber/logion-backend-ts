import { Entity, PrimaryColumn, Column, getRepository, Repository, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { injectable } from "inversify";
import { components } from "../controllers/components";
import { Moment } from "moment";
import { EmbeddableUserIdentity, UserIdentity } from "./useridentity";

export type LocRequestStatus = components["schemas"]["LocRequestStatus"];

export interface LocRequestDescription {
    readonly requesterAddress: string;
    readonly ownerAddress: string;
    readonly description: string;
    readonly createdOn: string;
    readonly userIdentity: UserIdentity | undefined
}

export interface FileDescription {
    readonly name: string;
    readonly hash: string;
    readonly oid: number;
    readonly contentType: string;
}

@Entity("loc_request")
export class LocRequestAggregateRoot {

    reject(reason: string, rejectedOn: Moment): void {
        if(this.status != 'REQUESTED') {
            throw new Error("Cannot reject already decided request");
        }

        this.status = 'REJECTED';
        this.rejectReason = reason;
        this.decisionOn = rejectedOn.toISOString();
    }

    accept(decisionOn: Moment): void {
        if(this.status != 'REQUESTED') {
            throw new Error("Cannot accept already decided request");
        }

        this.status = 'OPEN';
        this.decisionOn = decisionOn.toISOString();
    }

    getDescription(): LocRequestDescription {
        const userIdentity = this.userIdentity &&
            (this.userIdentity.firstName || this.userIdentity.lastName || this.userIdentity.email || this.userIdentity.phoneNumber) ?
            {
                firstName: this.userIdentity.firstName || "",
                lastName: this.userIdentity.lastName || "",
                email: this.userIdentity.email || "",
                phoneNumber: this.userIdentity.phoneNumber || "",
            } : undefined;
        return {
            requesterAddress: this.requesterAddress!,
            ownerAddress: this.ownerAddress!,
            description: this.description!,
            createdOn: this.createdOn!,
            userIdentity
        }
    }

    addFile(fileDescription: FileDescription) {
        const file = new LocFile();
        file.request = this;
        file.requestId = this.id;
        file.hash! = fileDescription.hash;
        file.oid = fileDescription.oid;
        file.contentType = fileDescription.contentType;
        this.files!.push(file);
    }

    hasFile(hash: string): boolean {
        return this.files!.find(file => file.hash === hash) !== undefined;
    }

    getFile(hash: string): FileDescription {
        const file = this.files!.find(file => file.hash === hash);
        return {
            name: file!.name!,
            contentType: file!.contentType!,
            hash: file!.hash!,
            oid: file!.oid!,
        };
    }

    close(timestamp: Moment) {
        if(this.closedOn !== undefined && this.closedOn !== null) {
            throw new Error("LOC is already closed");
        }
        this.closedOn = timestamp.toISOString();
        this.status = 'CLOSED';
    }

    @PrimaryColumn({ type: "uuid" })
    id?: string;

    @Column({ length: 255 })
    status?: LocRequestStatus;

    @Column({ length: 255, name: "requester_address" })
    requesterAddress?: string;

    @Column({ length: 255, name: "owner_address" })
    ownerAddress?: string;

    @Column({ length: 255, name: "description" })
    description?: string;

    @Column("timestamp without time zone", { name: "decision_on", nullable: true })
    decisionOn?: string | null;

    @Column("varchar", { length: 255, name: "reject_reason", nullable: true })
    rejectReason?: string | null;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: string | null;

    @Column("timestamp without time zone", { name: "closed_on", nullable: true })
    closedOn?: string | null;

    @Column(() => EmbeddableUserIdentity, { prefix: "" })
    userIdentity?: EmbeddableUserIdentity;

    @OneToMany(() => LocFile, file => file.request, {
        eager: true,
        cascade: true
    })
    files?: LocFile[];
}

@Entity("loc_request_file")
export class LocFile {

    @PrimaryColumn({ type: "uuid", name: "request_id" })
    requestId?: string;

    @PrimaryColumn({name: "hash"})
    hash?: string;

    @Column("timestamp without time zone", { name: "added_on", nullable: true })
    addedOn?: string;

    @Column({ length: 255 })
    name?: string;

    @Column("int4")
    oid?: number;

    @Column({ length: 255, name: "content_type" })
    contentType?: string;

    @ManyToOne(() => LocRequestAggregateRoot, request => request.files)
    @JoinColumn({ name: "request_id" })
    request?: LocRequestAggregateRoot;
}

export interface FetchLocRequestsSpecification {

    readonly expectedRequesterAddress?: string;
    readonly expectedOwnerAddress?: string;
    readonly expectedStatuses?: LocRequestStatus[];
}

@injectable()
export class LocRequestRepository {

    constructor() {
        this.repository = getRepository(LocRequestAggregateRoot);
    }

    readonly repository: Repository<LocRequestAggregateRoot>;

    public findById(id: string): Promise<LocRequestAggregateRoot | undefined> {
        return this.repository.findOne(id);
    }

    public async save(root: LocRequestAggregateRoot): Promise<void> {
        await this.repository.save(root);
    }

    public async findBy(specification: FetchLocRequestsSpecification): Promise<LocRequestAggregateRoot[]> {
        let builder = this.repository.createQueryBuilder("request");

        if (specification.expectedRequesterAddress) {
            builder.where("request.requester_address = :expectedRequesterAddress",
                { expectedRequesterAddress: specification.expectedRequesterAddress });
        } else if (specification.expectedOwnerAddress) {
            builder.where("request.owner_address = :expectedOwnerAddress",
                { expectedOwnerAddress: specification.expectedOwnerAddress });
        }

        if (specification.expectedStatuses) {
            builder.andWhere("request.status IN (:...expectedStatuses)",
                { expectedStatuses: specification.expectedStatuses });
        }

        return builder.getMany();
    }

    async deleteAll() {
        const all = await this.findBy({});
        await this.repository.remove(all);
    }
}

export interface NewLocRequestParameters {
    readonly id: string;
    readonly description: LocRequestDescription;
}

@injectable()
export class LocRequestFactory {

    public newLocRequest(params: NewLocRequestParameters): LocRequestAggregateRoot {
        const request = new LocRequestAggregateRoot();
        request.id = params.id;
        request.status = "REQUESTED";
        request.requesterAddress = params.description.requesterAddress;
        request.ownerAddress = params.description.ownerAddress;
        request.description = params.description.description;
        request.createdOn = params.description.createdOn;
        const userIdentity = params.description.userIdentity;
        if (userIdentity !== undefined) {
            request.userIdentity = new EmbeddableUserIdentity();
            request.userIdentity.firstName = userIdentity.firstName;
            request.userIdentity.lastName = userIdentity.lastName;
            request.userIdentity.email = userIdentity.email;
            request.userIdentity.phoneNumber = userIdentity.phoneNumber;
        }
        request.files = [];
        return request;
    }
}
