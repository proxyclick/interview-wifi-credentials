import api from './api';

const { PROXYCLICK_COMPANY_ID} = process.env;

export interface IVisitor {
    firstname: string,
    lastname: string,
    email: string
}

interface VisitorsResult {
  object: string,
  id: string,
  firstname: string,
  lastname: string,
  companyName: string,
  email: string,
  phone: string,
  mobile: string,
  language: object,
  pictureOriginal: string,
  picture24: string,
  picture36: string,
  picture64: string,
  picture128: string,
  picture192: string,
  function: string,
  about: string,
  licensePlate: string,
  // customFields: array,
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
    }): Promise<VisitorsResult[]> {
        const queryString = Object.entries(filter)
          .filter(([key]) => key !== '')
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
        const uri = `/companies/${PROXYCLICK_COMPANY_ID}/vm/visitors?${queryString}`;
        const { data } = await api.get(uri);
        const { visitors = [] } = data;

        return visitors;
    },

    // Do not change this function
    updateVisitor: function (email: string, update: {
        firstname?: string,
        lastname?: string
    }) { }
};