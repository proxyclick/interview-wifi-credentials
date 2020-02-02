import * as rp from 'request-promise-native';
import { RequestPromiseOptions } from 'request-promise-native';
import { UriOptions } from "request";
import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, PASSWORD, USERNAME } from "../constants/constants";

let storedToken: string;

interface ITokenResponse {
    access_token: string,
}

export const AuthService = {

    getToken: async function (): Promise<string> {
        return storedToken ? storedToken : await this.retrieveAndStoreToken();
    },

    retrieveAndStoreToken: async function (): Promise<string> {
        const options: UriOptions & RequestPromiseOptions = {
            method: 'POST',
            uri: 'https://api.proxyclick.com/oauth/token',
            form: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: GRANT_TYPE,
                username: USERNAME,
                password: PASSWORD
            },
            json: true
        };
        return (await rp(options) as ITokenResponse).access_token;
    },
};
