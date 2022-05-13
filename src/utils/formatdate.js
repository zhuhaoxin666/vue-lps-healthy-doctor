export function formatDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var time = year + '-'
  if (month < 10) { time += '0' }
  time += month + '-'
  if (day < 10) { time += '0' }
  time += day

  return time
  // return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
}
