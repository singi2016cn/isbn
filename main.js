const isbn = ''

/* 
  验证格式
  是否旧的格式，即2007年1月1日之前，ISBN由10位数字组成
*/
const isOldVersion = isbn => {
  return isbn.length == 11
}

const isCurrentVersion = isbn => {
  return isbn.length == 13
}

