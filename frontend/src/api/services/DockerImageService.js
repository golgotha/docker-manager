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

  static removeImage(id, force = false) {
    return apiRequest({
      httpMethod: HttpMethod.POST,
      resourceUrl: apiEndpoints.DOCKER_REMOVE_IMAGE,
      payload: {id, force}
    }).then(result => {
      return JSON.parse(result.text);
    });
  }
}
