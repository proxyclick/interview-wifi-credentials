import * as rp from 'request-promise-native';
import { RequestPromiseOptions } from 'request-promise-native';
import { UriOptions } from "request";
import { AuthService } from "../auth/auth";
import { COMPANY_ID, UNAUTHORIZED } from "../constants/constants";

export interface IVisitor {
    firstname: string,
    lastname: string,
    email: string
}

export const VisitorsService = {

    /**
     * Find visitors by searching through the Proxyclick API
     * @param filter a filter containing email and/or company name
     * @returns a promise of an array of visitors
     */
    getVisitors: async function (filter: {
        email?: string,
        companyName?: string
    }): Promise<IVisitor[]> {
        const { email, companyName } = filter;
        const options: UriOptions & RequestPromiseOptions = {
            uri: `https://api.proxyclick.com/v1/companies/${ COMPANY_ID }/vm/visitors`,
            auth: {
                'bearer': await AuthService.getToken()
            },
            qs: {},
            json: true
        };
        if (email) {
            options.qs.email = email
        }
        try {
            const allVisitors = (await rp(options)).visitors;

            if (companyName) {
                // Would be nice to add this filter directly on the api
                return allVisitors.filter(v => v.companyName === companyName)
            }
            return allVisitors
        } catch (e) {
            if (e.statusCode === UNAUTHORIZED) {
                // Auth mecanism could be improved but it is not the scope of this exercice
                await AuthService.retrieveAndStoreToken();
                return this.getVisitors({ companyName, email })
            }
        }
    },

    // Do not change this function
    updateVisitor: function (email: string, update: {
        firstname?: string,
        lastname?: string
    }) { }
};
