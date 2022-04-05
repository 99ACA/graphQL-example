import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class ExampleSourceAPI extends RESTDataSource {
    constructor(){
        super()
        this.baseURL = 'https://source-api.example.com/';
    }

  override willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }
}