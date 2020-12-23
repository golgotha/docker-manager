import request from 'superagent';
import {isEmptyObject} from '../utils/CommonUtils';

export const BACKEND_PATH = '/v1';

export async function apiRequest({httpMethod, resourceUrl, urlParams, payload, headers}) {
  let fullUrl = `${BACKEND_PATH}${resourceUrl}`;
  // const defaultHeaders = {'Content-Type': 'application/json'};
  const mergedHeaders = mergeHeaders(headers, {}/*defaultHeaders*/);

  if (urlParams && !isEmptyObject(urlParams)) {
    fullUrl += '?';
    Object.keys(urlParams).forEach(key => {
      const value = urlParams[key];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            fullUrl += `${key}=${v}&`;
          });
        } else {
          fullUrl += `${key}=${value}&`;
        }

      }
    });

    if (fullUrl[fullUrl.length - 1] === '&') {
      fullUrl = fullUrl.substr(0, fullUrl.length - 1);
    }
  }

  switch (httpMethod.toUpperCase()) {
    case HttpMethod.GET:
    default:
      return await request.get(fullUrl)
        .withCredentials()
        .set(mergedHeaders);

    case HttpMethod.POST:
      return await request.post(fullUrl)
        .withCredentials()
        .set(mergedHeaders)
        .send(payload);

    case HttpMethod.DELETE:
      return await request.delete(fullUrl)
        .withCredentials()
        .set(mergedHeaders)
        .send(payload);

    case HttpMethod.PUT:
      return await request.put(fullUrl)
        .withCredentials()
        .set(mergedHeaders)
        .send(payload);
  }
}

function mergeHeaders(headers, defaultHeaders) {
  if (!headers) {
    headers = defaultHeaders;
    return headers;
  }

  for (let key in defaultHeaders) {
    if (headers[key] === undefined) {
      headers[key] = defaultHeaders[key];
    }
  }
  return headers;
}

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
