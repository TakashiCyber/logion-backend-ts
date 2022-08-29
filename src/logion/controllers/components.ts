/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {}

export interface components {
  schemas: {
    /**
     * AcceptProtectionRequestView
     * @description Parameters for Protection Request's acceptance
     */
    AcceptProtectionRequestView: {
      /** @description ID of the Identity LOC to associate with the protection request */
      locId?: string;
    };
    ItemDeliveriesResponse: {
      [key: string]: components["schemas"]["CheckLatestDeliveryResponse"][];
    };
    CheckLatestDeliveryResponse: {
      /** @description The hash of the latest delivered copy */
      copyHash?: string;
      /**
       * Format: date-time
       * @description The date/time at which the delivered copy was generated on
       */
      generatedOn?: string;
      /** @description The address of the owner of the linked token */
      owner?: string;
      belongsToCurrentOwner?: boolean;
    };
    /**
     * CreateProtectionRequestView
     * @description A Protection Request to create
     */
    CreateProtectionRequestView: {
      /** @description If this request is a recovery request, tells the address to recover */
      addressToRecover?: string;
      /** @description True if the the protection request is also a recovery request */
      isRecovery?: boolean;
      /** @description The SS58 address of the other legal officer the request was submitted to */
      otherLegalOfficerAddress?: string;
      /** @description The SS58 address of the requester */
      requesterAddress?: string;
      /** @description The identification data of the requester */
      userIdentity?: components["schemas"]["UserIdentityView"];
      /** @description The postal address of the requester */
      userPostalAddress?: components["schemas"]["PostalAddressView"];
    };
    /**
     * AcceptProtectionRequestView
     * @description Parameters for Protection Request's acceptance
     */
    UpdateProtectionRequestView: {
      /** @description The SS58 address of the other legal officer a new request is submitted to */
      otherLegalOfficerAddress?: string;
    };
    /**
     * FetchProtectionRequestsResponseView
     * @description The fetched Protection Requests
     */
    FetchProtectionRequestsResponseView: {
      /** @description The Protection Requests matching provided specification */
      requests?: components["schemas"]["ProtectionRequestView"][];
    };
    /**
     * FetchProtectionRequestsSpecificationView
     * @description The specification for fetching Protection Requests
     */
    FetchProtectionRequestsSpecificationView: {
      /** @description The statuses of expected Protection Requests */
      statuses?: (
        | "ACCEPTED"
        | "PENDING"
        | "REJECTED"
        | "ACTIVATED"
        | "CANCELLED"
        | "REJECTED_CANCELLED"
        | "ACCEPTED_CANCELLED"
      )[];
      /**
       * @description The kind of protection request to be returned
       * @enum {string}
       */
      kind?: "ANY" | "PROTECTION_ONLY" | "RECOVERY";
      /** @description The SS58 address of the requester in expected Protection Requests */
      requesterAddress?: string;
    };
    /**
     * FetchTransactionsResponseView
     * @description The fetched transactions
     */
    FetchTransactionsResponseView: {
      /** @description The transactions matching provided specification */
      transactions?: components["schemas"]["TransactionView"][];
    };
    /**
     * FetchTransactionsSpecificationView
     * @description The specification for fetching Tokenization Requests
     */
    FetchTransactionsSpecificationView: {
      /** @description The SS58 address of the account from or to which the expected transaction is done */
      address?: string;
    };
    /**
     * LegalOfficerDecisionView
     * @description Legal Officer decision
     */
    LegalOfficerDecisionView: {
      /**
       * Format: date-time
       * @description The decision timestamp (if status is 'ACCEPTED' or 'REJECTED')
       */
      decisionOn?: string;
      /** @description If status is 'REJECTED', the reason of the rejection */
      rejectReason?: string;
      /**
       * @description The decision status
       * @enum {string}
       */
      status?: "ACCEPTED" | "PENDING" | "REJECTED";
      /** @description ID of the Identity LOC linked to an accepted protection request. */
      locId?: string;
    };
    /**
     * PostalAddressView
     * @description A postal address
     */
    PostalAddressView: {
      /** @description City */
      city?: string;
      /** @description Country */
      country?: string;
      /** @description First address line */
      line1?: string;
      /** @description Second address line */
      line2?: string;
      /** @description Postal code */
      postalCode?: string;
    };
    /**
     * ProtectionRequestView
     * @description Information about the created Protection Request
     */
    ProtectionRequestView: {
      /** @description If this request is a recovery request, tells the address to recover */
      addressToRecover?: string;
      /**
       * Format: date-time
       * @description The creation timestamp
       */
      createdOn?: string;
      decision?: components["schemas"]["LegalOfficerDecisionView"];
      /**
       * Format: uuid
       * @description The ID of created Protection Request
       */
      id?: string;
      /** @description True if the the protection request is also a recovery request */
      isRecovery?: boolean;
      /** @description The SS58 address of the legal officer the request was submitted to */
      legalOfficerAddress?: string;
      /** @description The SS58 address of the other legal officer the request was submitted to */
      otherLegalOfficerAddress?: string;
      /** @description The SS58 address of the requester */
      requesterAddress?: string;
      /**
       * @description The status
       * @enum {string}
       */
      status?:
        | "ACCEPTED"
        | "PENDING"
        | "REJECTED"
        | "ACTIVATED"
        | "CANCELLED"
        | "REJECTED_CANCELLED"
        | "ACCEPTED_CANCELLED";
      /** @description The identification data of the requester */
      userIdentity?: components["schemas"]["UserIdentityView"];
      /** @description The postal address of the requester */
      userPostalAddress?: components["schemas"]["PostalAddressView"];
    };
    /**
     * RecoveryInfoView
     * @description The new (recovery) and old (to recover) account data
     */
    RecoveryInfoView: {
      /** @description The address to recover */
      addressToRecover?: string;
      accountToRecover?: components["schemas"]["ProtectionRequestView"];
      recoveryAccount?: components["schemas"]["ProtectionRequestView"];
    };
    /**
     * RejectProtectionRequestView
     * @description The Protection Request to reject
     */
    RejectProtectionRequestView: {
      /** @description The rejection reason */
      rejectReason?: string;
    };
    /**
     * RejectTokenRequestView
     * @description The Tokenization Request to reject
     */
    RejectTokenRequestView: {
      /** @description The rejection reason */
      rejectReason?: string;
    };
    /**
     * TransactionView
     * @description A transaction between 2 accounts
     */
    TransactionView: {
      /**
       * Format: uuid
       * @description The ID of the transaction
       */
      id?: string;
      /**
       * Format: date-time
       * @description The timestamp of the transaction
       */
      createdOn?: string;
      /** @description The fee of the transaction. */
      fee?: string;
      /** @description The SS58 address of the account from which the transaction is done */
      from?: string;
      /** @description The method that created the transaction. */
      method?: string;
      /** @description The pallet that created the transaction. */
      pallet?: string;
      /** @description The reserved amount of the transaction. */
      reserved?: string;
      /** @description The tip of the transaction. */
      tip?: string;
      /** @description The SS58address of the account to which the transaction is done. May be null. */
      to?: string;
      /** @description The total amount of the transaction. */
      total?: string;
      /** @description The value of the transfer, iff the transaction is a transfer. */
      transferValue?: string;
      /** @description Indicates if the transaction was successful. */
      successful?: boolean;
      error?: {
        /** @description The error section, typically equal to the pallet. */
        section?: string;
        /** @description The error name. */
        name?: string;
        /** @description Some details about the error. */
        details?: string;
      };
    };
    /**
     * UserIdentityView
     * @description Physical person identification data
     */
    UserIdentityView: {
      /** @description E-mail */
      email?: string;
      /** @description First name */
      firstName?: string;
      /** @description Last name */
      lastName?: string;
      /** @description Phone number */
      phoneNumber?: string;
    };
    /**
     * SignInRequestView
     * @description the sign-in request
     */
    SignInRequestView: {
      /** @description Addresses of the accounts to be signed in */
      addresses?: string[];
    };
    /**
     * SignInResponseView
     * @description the sign-in response
     */
    SignInResponseView: {
      /**
       * Format: uuid
       * @description Session identifier
       * @example 5e4ef4bb-8657-444c-9880-d89e9403fc85
       */
      sessionId?: string;
    };
    SignatureView: {
      /** @description <p>A base64-encoded SHA256 hash of a concatenation of</p><ol><li>a resource</li><li>an operation</li><li>the <code>signedOn</code> field</li><li>additional fields in function of the request</li></ol> */
      signature?: string;
      /**
       * Format: date-time
       * @description The signature's timestamp
       */
      signedOn?: string;
      /**
       * @description The type of signature. If not set, POLKADOT is assumed.
       * @enum {string}
       */
      type?: "POLKADOT" | "ETHEREUM";
    };
    TokenView: {
      /** @description The encoded JWT token */
      value?: string;
      /**
       * Format: date-time
       * @description The token expiration timestamp
       */
      expiredOn?: string;
    };
    /**
     * AuthenticateRequestView
     * @description the authentication request
     */
    AuthenticateRequestView: {
      /**
       * @description A map of signatures, index by SS58 addresses of authentication requester
       * @example [object Object]
       */
      signatures?: { [key: string]: components["schemas"]["SignatureView"] };
    };
    /**
     * AuthenticateResponseView
     * @description the authentication response
     */
    AuthenticateResponseView: {
      /**
       * @description A map of tokens, indexed by SS58 address of authentication requester
       * @example [object Object]
       */
      tokens?: { [key: string]: components["schemas"]["TokenView"] };
    };
    /**
     * @description The request's status
     * @enum {string}
     */
    LocRequestStatus: "OPEN" | "REQUESTED" | "REJECTED" | "CLOSED";
    /**
     * @description The LOC's type
     * @enum {string}
     */
    LocType: "Identity" | "Transaction" | "Collection";
    /**
     * @description The Identity LOC's type
     * @enum {string}
     */
    IdentityLocType: "Polkadot" | "Logion";
    /**
     * CreateLocRequestView
     * @description A LOC Request to create
     */
    CreateLocRequestView: {
      /** @description The SS58 address of the LOC requester */
      requesterAddress?: string;
      /**
       * Format: uuid
       * @description The ID of the LOC identifying the requester
       */
      requesterIdentityLoc?: string;
      /** @description A description of the LOC */
      description?: string;
      /** @description The type of the LOC to create */
      locType?: components["schemas"]["LocType"];
      /** @description The identification data of the requester */
      userIdentity?: components["schemas"]["UserIdentityView"];
    };
    /**
     * LocRequestView
     * @description An existing LOC Request
     */
    LocRequestView: {
      /** @description The SS58 address of the legal officer that will own the LOC upon acceptance */
      ownerAddress?: string;
      /** @description The SS58 address of the LOC requester */
      requesterAddress?: string;
      /**
       * Format: uuid
       * @description The ID of the LOC identifying the requester
       */
      requesterIdentityLoc?: string;
      /** @description A description of the LOC */
      description?: string;
      /** @description The identification data of the requester */
      userIdentity?: components["schemas"]["UserIdentityView"];
      /**
       * Format: date-time
       * @description The creation timestamp
       */
      createdOn?: string;
      /**
       * Format: date-time
       * @description The decision timestamp (if status is 'OPEN' or 'REJECTED')
       */
      decisionOn?: string;
      /**
       * Format: date-time
       * @description The closing timestamp (if status is 'CLOSED')
       */
      closedOn?: string;
      /**
       * Format: uuid
       * @description The ID of the LOC request, which is also the ID of the LOC
       */
      id?: string;
      status?: components["schemas"]["LocRequestStatus"];
      /** @description If status is 'REJECTED', the reason of the rejection */
      rejectReason?: string;
      /** @description The files attached to this request's LOC */
      files?: {
        /** @description The file's name */
        name?: string;
        /** @description The file's hash */
        hash?: string;
        /** @description The file's nature */
        nature?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The SS58 address of the file submitter */
        submitter?: string;
      }[];
      /** @description The links attached to this request's LOC */
      links?: {
        /** @description The link's target */
        target?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The link's nature */
        nature?: string;
      }[];
      /** @description The type of the LOC to create */
      locType?: components["schemas"]["LocType"];
      /** @description The metadata attached to this request's LOC */
      metadata?: {
        /** @description The item's name */
        name?: string;
        /** @description The item's value */
        value?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The SS58 address of the metadata item submitter */
        submitter?: string;
      }[];
      /** @description Data about LOC voiding */
      voidInfo?: {
        /** @description Voiding reason */
        reason?: string;
        /**
         * Format: date-time
         * @description The date-time of voiding (chain time)
         */
        voidedOn?: string;
      };
    };
    /**
     * LocPublicView
     * @description The published attributes of an existing LOC
     */
    LocPublicView: {
      /** @description The SS58 address of the legal officer that will own the LOC upon acceptance */
      ownerAddress?: string;
      /** @description The SS58 address of the LOC requester */
      requesterAddress?: string;
      /**
       * Format: uuid
       * @description The ID of the LOC identifying the requester
       */
      requesterIdentityLoc?: string;
      /**
       * Format: date-time
       * @description The creation timestamp
       */
      createdOn?: string;
      /**
       * Format: date-time
       * @description The closing timestamp (if status is 'CLOSED')
       */
      closedOn?: string;
      /**
       * Format: uuid
       * @description The ID of the LOC request, which is also the ID of the LOC
       */
      id?: string;
      /** @description The files attached to this request's LOC */
      files?: {
        /** @description The file's nature */
        nature?: string;
        /** @description The file's hash */
        hash?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The SS58 address of the file submitter */
        submitter?: string;
      }[];
      /** @description The links attached to this request's LOC */
      links?: {
        /** @description The link's target */
        target?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The link's nature */
        nature?: string;
      }[];
      /** @description The type of the LOC to create */
      locType?: components["schemas"]["LocType"];
      /** @description The metadata attached to this request's LOC */
      metadata?: {
        /** @description The item's name */
        name?: string;
        /** @description The item's value */
        value?: string;
        /**
         * Format: date-time
         * @description The date-time of addition (chain time)
         */
        addedOn?: string;
        /** @description The SS58 address of the metadata item submitter */
        submitter?: string;
      }[];
      /** @description Data about LOC voiding */
      voidInfo?: {
        /**
         * Format: date-time
         * @description The date-time of voiding (chain time)
         */
        voidedOn?: string;
      };
    };
    /**
     * FetchLocRequestsSpecificationView
     * @description The specification for fetching LOC Requests
     */
    FetchLocRequestsSpecificationView: {
      /** @description The SS58 address of the owner in expected LOC Requests */
      ownerAddress?: string;
      /** @description The SS58 address of the requester in expected LOC Requests */
      requesterAddress?: string;
      /** @description The statuses of expected LOC Requests */
      statuses?: components["schemas"]["LocRequestStatus"][];
      /** @description The type of the LOC to fetch */
      locTypes?: components["schemas"]["LocType"][];
      identityLocType?: components["schemas"]["IdentityLocType"];
    };
    /**
     * FetchLocRequestsResponseView
     * @description The fetched LOC Requests
     */
    FetchLocRequestsResponseView: {
      /** @description The LOC Requests matching provided specification */
      requests?: components["schemas"]["LocRequestView"][];
    };
    /**
     * RejectLocRequestView
     * @description The info to reject a LOC request
     */
    RejectLocRequestView: {
      /** @description The rejection reason */
      rejectReason?: string;
    };
    AddFileView: {
      /** @description The file's nature */
      nature?: string;
    };
    /**
     * AddFileResultView
     * @description The result of adding a file to a LOC
     */
    AddFileResultView: {
      /** @description Hex-encoded SHA256 hash of added file */
      hash?: string;
    };
    AddLinkView: {
      /** @description The link's target */
      target?: string;
      /** @description The file's nature */
      nature?: string;
    };
    AddMetadataView: {
      /** @description The item's name */
      name?: string;
      /** @description The item's value */
      value?: string;
    };
    /**
     * VoidLocView
     * @description The parameters of LOC voiding
     */
    VoidLocView: {
      /** @description The voiding reason */
      reason?: string;
    };
    CollectionItemView: {
      /**
       * @description The id of the collection loc
       * @example 5e4ef4bb-8657-444c-9880-d89e9403fc85
       */
      collectionLocId?: string;
      /**
       * @description The id of the collection item
       * @example 0x818f1c9cd44ed4ca11f2ede8e865c02a82f9f8a158d8d17368a6818346899705
       */
      itemId?: string;
      /**
       * Format: date-time
       * @description The creation timestamp
       */
      addedOn?: string;
      /** @description The files present in DB */
      files?: string[];
    };
    /**
     * RefreshRequestView
     * @description the refresh request
     */
    RefreshRequestView: {
      /**
       * @description A map of tokens, index by SS58 addresses of refresh requester
       * @example [object Object]
       */
      tokens?: { [key: string]: string };
    };
    /**
     * CreateVaultTransferRequestView
     * @description A Protection Request to create
     */
    CreateVaultTransferRequestView: {
      /** @description The origin SS58 address of the transfer. In case of a regular vault-out transfer, this equals to requesterAddress. In case of a vault recovery, this equals to the recovered account */
      origin?: string;
      /** @description The destination SS58 address of the transfer */
      destination?: string;
      /** @description The amount to transfer */
      amount?: string;
      /** @description The block number at which the call was submitted */
      block?: string;
      /** @description The index of the call's transaction in the block */
      index?: number;
    };
    /**
     * FetchVaultTransferRequestsResponseView
     * @description The fetched Protection Requests
     */
    FetchVaultTransferRequestsResponseView: {
      /** @description The Protection Requests matching provided specification */
      requests?: components["schemas"]["VaultTransferRequestView"][];
    };
    /**
     * VaultTransferRequestStatusView
     * @description The status of a Vault Transfer Request
     * @enum {undefined}
     */
    VaultTransferRequestStatusView:
      | "ACCEPTED"
      | "PENDING"
      | "REJECTED"
      | "CANCELLED"
      | "REJECTED_CANCELLED";
    /**
     * FetchVaultTransferRequestsSpecificationView
     * @description The specification for fetching Protection Requests
     */
    FetchVaultTransferRequestsSpecificationView: {
      /** @description The statuses of expected Protection Requests */
      statuses?: components["schemas"]["VaultTransferRequestStatusView"][];
      /** @description The SS58 address of the requester in expected Protection Requests */
      requesterAddress?: string;
    };
    /**
     * VaultTransferRequestDecisionDecisionView
     * @description Legal Officer decision
     */
    VaultTransferRequestDecisionDecisionView: {
      /**
       * Format: date-time
       * @description The decision timestamp (if status is 'ACCEPTED' or 'REJECTED')
       */
      decisionOn?: string;
      /** @description If decision is reject, the reason of the rejection */
      rejectReason?: string;
    };
    /**
     * VaultTransferRequestView
     * @description Information about the created Protection Request
     */
    VaultTransferRequestView: {
      /**
       * Format: date-time
       * @description The creation timestamp
       */
      createdOn?: string;
      decision?: components["schemas"]["VaultTransferRequestDecisionDecisionView"];
      /**
       * Format: uuid
       * @description The ID of created Protection Request
       */
      id?: string;
      /** @description The origin SS58 address of the transfer. In case of a regular vault-out transfer, this equals to requesterAddress. In case of a vault recovery, this equals to the recovered account */
      origin?: string;
      /** @description The destination SS58 address of the transfer */
      destination?: string;
      /** @description The amount to transfer */
      amount?: string;
      /** @description The block number at which the call was submitted */
      block?: string;
      /** @description The index of the call's transaction in the block */
      index?: number;
      status?: components["schemas"]["VaultTransferRequestStatusView"];
      requesterIdentity?: components["schemas"]["UserIdentityView"];
      requesterPostalAddress?: components["schemas"]["PostalAddressView"];
    };
    /**
     * RejectVaultTransferRequestView
     * @description The Protection Request to reject
     */
    RejectVaultTransferRequestView: {
      /** @description The rejection reason */
      rejectReason?: string;
    };
    /**
     * CreateSofRequestView
     * @description A Statement of Facts Request to create
     */
    CreateSofRequestView: {
      /**
       * Format: uuid
       * @description The ID of the LOC
       * @example 5e4ef4bb-8657-444c-9880-d89e9403fc85
       */
      locId?: string;
      /**
       * @description The ID of the collection item, if the LOC is a collection
       * @example 0xecdc3920d5cb4d6721f65c6c36f35996faf34eccf8f7948d69004483fddf19e6
       */
      itemId?: string;
    };
  };
}

export interface operations {}

export interface external {}
