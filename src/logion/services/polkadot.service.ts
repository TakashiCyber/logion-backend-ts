import { injectable } from 'inversify';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Log } from "../util/Log";

const { logger } = Log;

@injectable()
export class PolkadotService {

    async readyApi(): Promise<ApiPromise> {
        if(this._api === null) {
            this._api = await this._createApi();
        }
        return this._api;
    }

    private _api: ApiPromise | null = null;

    private async _createApi(): Promise<ApiPromise> {
        const wsProviderUrl = process.env.WS_PROVIDER_URL || 'ws://localhost:9944';
        logger.info("Connecting to node %s", wsProviderUrl);
        const wsProvider = new WsProvider(wsProviderUrl);
        return await ApiPromise.create({
            provider: wsProvider,
            types: {
                Address: "MultiAddress",
                LookupSource: "MultiAddress",
                PeerId: "(Vec<u8>)",
                AccountInfo: "AccountInfoWithDualRefCount",
                TAssetBalance: "u128",
                AssetId: "u64",
                AssetDetails: {
                    owner: "AccountId",
                    issuer: "AccountId",
                    admin: "AccountId",
                    freezer: "AccountId",
                    supply: "Balance",
                    deposit: "DepositBalance",
                    max_zombies: "u32",
                    min_balance: "Balance",
                    zombies: "u32",
                    accounts: "u32",
                    is_frozen: "bool"
                },
                AssetMetadata: {
                    deposit: "DepositBalance",
                    name: "Vec<u8>",
                    symbol: "Vec<u8>",
                    decimals: "u8"
                }
            }
        });
    }
}