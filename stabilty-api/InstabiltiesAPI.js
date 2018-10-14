const { RESTDataSource } = require('apollo-datasource-rest');

 class InstabiltiesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8083/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getInstabilites() {
    return this.get(`/api/instabilty`);
  }

  async getMostViewedMovies(limit = 10) {
    const data = await this.get('movies', {
      per_page: limit,
      order_by: 'most_viewed',
    });
    return data.results;
  }
}

module.exports = {
   InstabiltiesAPI
};
