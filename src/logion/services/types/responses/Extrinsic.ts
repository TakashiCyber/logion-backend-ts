import { JsonArgs, JsonMethod } from "../../call";

export interface JsonExtrinsic {
    method: JsonMethod;
    signer: string | null;
    args: JsonArgs;
    tip: string | null;
    partialFee?: string;
    events: JsonEvent[];
    paysFee: boolean;
}

export interface JsonEvent {
    method: JsonMethod;
    data: string[];
}