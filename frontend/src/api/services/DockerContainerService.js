import {apiRequest, HttpMethod} from '../apiRequest';
import apiEndpoints from '../apiEndpoints';

export default class DockerContainerService {

  static getContainers() {
    return apiRequest({
      httpMethod: HttpMethod.GET,
      resourceUrl: apiEndpoints.DOCKER_CONTAINERS
    }).then(result => {
      return JSON.parse(result.text);
    });
  }
}
