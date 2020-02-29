import {request} from './request'

export function getHmoeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

