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

  async createInstability(instabilty) {
    return this.post('/api/instabilty', JSON.stringify(instabilty), {
      headers: {
        'content-type': 'application/json'
      }
    })
        .catch((err)=>{
          console.log(err)
          return instabilty;
        });
  }
}

module.exports = {
   InstabiltiesAPI
};
