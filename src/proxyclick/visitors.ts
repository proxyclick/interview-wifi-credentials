export interface IVisitor {
  firstname: string;
  lastname: string;
  email: string;
}

export const VisitorsService = {
  /**
   * Find visitors by searching through the Proxyclick API
   * @param filter a filter containing email and/or company name
   * @returns a promise of an array of visitors
   */
  getVisitors: async function (filter: {
    email?: string;
    companyName?: string;
  }): Promise<any[]> {
    // TODO : Write the body of this function that will call the Proxyclick API to search visitors based on email
    return [];
  },

  // Do not change this function
  updateVisitor: function (
    email: string,
    update: {
      firstname?: string;
      lastname?: string;
    }
  ) {},
};
