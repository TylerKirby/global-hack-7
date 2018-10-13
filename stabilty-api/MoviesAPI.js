const { RESTDataSource } = require('apollo-datasource-rest');

 class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://movies-api.example.com/';
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getMovie(id) {
    console.log(id);
    return Promise.resolve({
      title: "aoeu",
    });
    // return this.get(`movies/${id}`);
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
   MoviesAPI
};
