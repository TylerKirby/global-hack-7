const { RESTDataSource } = require('apollo-datasource-rest');

 class EmploymentAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:9200/';
  }

  async getEmploymentOpportuntitiesForId(id) {
    return this.get(`stabilty_orgs/orgs/_search?q=${id}`).then(result=>result.hits.hits);
  }
}

module.exports = {
   EmploymentAPI
};
