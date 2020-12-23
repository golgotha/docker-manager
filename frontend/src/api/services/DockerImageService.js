import {apiRequest, HttpMethod} from '../apiRequest';
import apiEndpoints from '../apiEndpoints';

export default class DockerImageService {

  static getImages() {
    return apiRequest({
      httpMethod: HttpMethod.GET,
      resourceUrl: apiEndpoints.DOCKER_IMAGES
    }).then(result => {
      return JSON.parse(result.text);
    });
  }

  // static readResource(id) {
  //   return `/numizmatclub/api/${apiEndpoints.READ_UKRAINIAN_COINS_RESOURCE}?id=${id}`;
  // }
}
