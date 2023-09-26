/**
 * 产生随机数
 * @date 2023/9/26 - 16:22:26
 *
 * @param {*} start 开始（包含）
 * @param {*} end 结束（包含）
 * @returns {*}
 */
function numberRandom(start, end){
  const res = Math.ceil(Math.random() * end);
  if (start <= res) {
    return res
  }
  return end - start + res;
}

/**
 * 随机返回数组中的某个元素
 * @date 2023/9/26 - 16:23:04
 *
 * @param {*} arr
 * @returns {*}
 */
function arrayRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 返回随机数，每一位都是按照规则随机的
 * @date 2023/9/26 - 16:44:48
 *
 * @param {*} startEndArr
 * @returns {string}
 */
function arrayRandomRange(startEndArr){
  let res = ''
  for(let i = 0; i < startEndArr.length; i++) {
    res += numberRandom(startEndArr[i]['start'], startEndArr[i]['end'])
  }
  return res
}

export default {
  numberRandom,
  arrayRandom,
  arrayRandomRange
}