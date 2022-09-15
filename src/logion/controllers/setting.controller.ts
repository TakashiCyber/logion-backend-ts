import { injectable } from 'inversify';
import { ApiController, Controller, HttpPut, Async, HttpGet } from 'dinoloop';
import { SettingFactory, SettingRepository } from '../model/setting.model';
import { AuthenticationService } from '@logion/rest-api-core';

@injectable()
@Controller('/setting')
export class SettingController extends ApiController {

    constructor(
        private settingRepository: SettingRepository,
        private settingFactory: SettingFactory,
        private authenticationService: AuthenticationService,
    ) {
        super();
    }

    @Async()
    @HttpGet('')
    async fetchSettings(): Promise<{settings: Record<string, string>}> {
        (await this.authenticationService.authenticatedUser(this.request))
            .require(user => user.isNodeOwner());
        const settings = await this.settingRepository.findAll();
        const responseBody: Record<string, string> = {};
        for(const setting of settings) {
            responseBody[setting.id!] = setting.value!;
        }
        return { settings: responseBody };
    }

    @Async()
    @HttpPut('/:id')
    async createOrUpdate(body: { value: string }, id: string): Promise<void> {
        (await this.authenticationService.authenticatedUser(this.request))
            .require(user => user.isNodeOwner());
        const value = body.value;
        const existingSetting = await this.settingRepository.findById(id);
        if(existingSetting) {
            existingSetting.value = value;
            await this.settingRepository.save(existingSetting);
        } else {
            const newSetting = this.settingFactory.newSetting({id, value});
            await this.settingRepository.save(newSetting);
        }
    }
}
