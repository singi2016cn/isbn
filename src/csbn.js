import InternationalStandardBookNumber from './isbn.js'
import chineseLibraryClassification from "./chinese_library_classification.js";
import common from './util/common.js'

class ChinaStandardBookNumber{
  static STANDARD_SEPARATOR = '/'
  static CATEGORY_ORDER_CODE_SEPARATOR = '·'

  isbn = null

  #csbn = null
  #categoryPart = null

  effectiveDate = '1987-01-01'
  endDate = '2007-01-01'

  
  /**
   * 大类类号
   * @date 2023/10/7 - 15:52:20
   *
   * @type {*}
   */
  #categoryCode = null


  /**
   * 种次号
   * @date 2023/10/7 - 15:52:35
   *
   * @type {*}
   */
  #orderCode = null
  
  /**
   * Creates an instance of ChinaStandardBookNumber.
   * @date 2023/10/7 - 15:52:49
   *
   * @constructor
   * @param {*} [csbn=null]
   */
  constructor(csbn = null) {
    if (csbn !== null){
      const csbnArr = csbn.split(ChinaStandardBookNumber.STANDARD_SEPARATOR)
      if (csbnArr.length !== 2){
        throw new Error('invalid csbn')
      }
      
      const categoryPartArr = csbnArr[1].split(ChinaStandardBookNumber.CATEGORY_ORDER_CODE_SEPARATOR)
      if (categoryPartArr.length !== 2){
        throw new Error('invalid category part')
      }
      
      
      this.isbn = new InternationalStandardBookNumber(csbnArr[0])
      
      this.#csbn = csbn
      this.#categoryPart = csbnArr[1]
      this.#categoryCode = categoryPartArr[0]
      this.#orderCode = categoryPartArr[1]
    }
  }

  /**
   * 验证分类部分是否合法
   * @date 2023/10/7 - 16:18:00
   */
  #verifyCategoryPart(){
    // 大类类号 && 种次号
    return  (this.#categoryCode) && /^\d+/g.test(this.#orderCode)
  }

  /**
   * 格式是否合法
   * @date 2023/10/7 - 16:18:12
   *
   * @returns {(false | void)}
   */
  isValid(){
    return this.isbn.isValid() && this.#verifyCategoryPart()
  }

  /**
   * 解析为对象格式
   * @date 2023/10/7 - 16:13:44
   *
   * @returns {{ prefixCode: any; groupCode: any; publishCode: any; bookCode: any; checkCode: any; categoryCode: any; orderCode: any; }}
   */
  parse(){
    const { prefixCode, groupCode, publishCode, bookCode, checkCode } = this.isbn.parse()
    return {
      prefixCode,
      groupCode,
      publishCode,
      bookCode,
      checkCode,
      categoryCode: this.#categoryCode,
      orderCode: this.#orderCode,
    }
  }

  /**
   * 分类名称
   * @date 2023/10/7 - 16:53:48
   *
   * @returns {*}
   */
  categoryName(){
    return chineseLibraryClassification.get(this.#categoryCode)
  }

  /**
   * 生成假数据
   * @date 2023/10/7 - 17:14:15
   *
   * @returns {string}
   */
  fake(){
    const isbn = (new InternationalStandardBookNumber()).fakeOldVersion().parseWithSeparator()
    const categoryCode = common.arrayRandom(Array.from(chineseLibraryClassification))[0]
    const orderCode = common.numberRandom(1, 9999)
    return `${isbn}${ChinaStandardBookNumber.STANDARD_SEPARATOR}${categoryCode}${ChinaStandardBookNumber.CATEGORY_ORDER_CODE_SEPARATOR}${orderCode}`
  }
}

export default ChinaStandardBookNumber;