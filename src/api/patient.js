import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/doctor/getPatientOrder',
    method: 'post'
  })
}
