import request from '@/utils/request';

export function login (account) {
   return request({
    url: '/api/visitor/login',
    method: 'post',
    data: account
  })
}

export function register (params) {
  return request({
    url: '/api/visitor/register',
    method: 'post',
    data: params
  })
}

export function commit(params){
  return request({
    url: '/api/record/commit',
    method: 'post',
    data:params
  })
}

export function update(params) {
  return request({
    url: '/api/record/update',
    method: 'post',
    data:params
  })
}

export function getRecordById(id){
  return request({
    url: `/api/record/info/${id}`,
    method: 'get'
  })
}

export function getReserveRecordsByUserId(){
  return request({
    url: '/api/record/getReserveRecordsByUserId',
    method: 'get'
  })
}


export function getReserveRecords(){
  return request({
    url: '/api/record/getReserveRecords',
    method: 'get'
  })
}