import { Settings } from "../models/settings";

export class Global {
    
    private static instance: Global;

    private settings: Settings;
    constructor() { }
    static get Instance() {
        if (!this.instance) {
            this.instance = new Global
        }
        return this.instance;        
    }
    static get Settings(): Settings {
        if (!this.Instance.settings) {
            throw "Application settings are not set, Please read define at AppModule file";
        }
        return this.Instance.settings;
    }
    static set Settings(newSettings: Settings) {
        this.Instance.settings = newSettings;
    }

    static get backEndUrl(): string {
        const settings = this.Settings;
        const url = settings.apiProtocol + '://' + settings.apiHost;
        return settings.apiPort ? url + ':' + settings.apiPort + '/' : url + '/';
    }

    static get restUrl(): string {
        const settings = this.Settings;
        return this.backEndUrl + settings.apiEndPoint + '/';
    }
}