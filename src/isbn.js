import publish from "./publish.js";
import common from './util/common.js'

class InternationalStandardBookNumber {
  // 旧版本长度
  static OLD_VERSION_LENGTH = 10
  // 当前版本长度
  static CURRENT_VERSION_LENGTH = 13
  // 出版社和书号的长度
  static PUBLISH_BOOK_LENGTH = 8
  // 前缀
  static PRIFIX_CODE_978 = '978'
  static PRIFIX_CODE_979 = '979'
  // 默认分隔符
  static SEPARATOR = '-'
  // 中国的组号
  static GROUP_CODE = '7'

  #isbn = null
  #isbnInput = null

  #prefixCode = null
  #groupCode = null
  #publishCode = null
  #bookCode = null
  #checkCode = null

  #isValid = false

  constructor(isbn = null) {
    if (isbn !== null) {
      this.#isbnInput = isbn
      this.#isbn = this.#format(isbn)
      this.#init()
    }
  }

  /**
   * 初始化
   * @date 2023/9/28 - 12:00:03
   */
  #init(){
    this.#verify()

    if (this.#isValid) {
      const { prefixCode, groupCode, publishCode, bookCode, checkCode } = this.#handle();
      this.#prefixCode = prefixCode
      this.#groupCode = groupCode
      this.#publishCode = publishCode
      this.#bookCode = bookCode
      this.#checkCode = checkCode
    }
  }

  /**
   * 检查格式
   * @date 2023/9/28 - 14:03:08
   *
   */
  #verify(){
    if (this.#isOldVersion()) {
      this.#isValid = this.#isValidOldVersion();
    } else if(this.#isCurrentVersion()) {
      this.#isValid = this.#isValidCurrentVersion();
    } else {
      this.#isValid = false
    }
  }

  /**
   * 是否合法的格式
   * @date 2023/9/27 - 10:01:23
   *
   * @returns {boolean}
   */
  isValid() {
    return this.#isValid
  }

  /**
   * 解析ISBN为5部分：前缀，组号（国家、地区、语言的代号），出版者号，书序号和检验码
   * @date 2023/9/22 - 17:14:14
   *
   * @returns {{ prefixCode: any; groupCode: any; publishCode: any; bookCode: any; checkCode: any; }}
   */
  #handle() {
    if (this.#isOldVersion()) {
      const prefixCode = null;
      const { groupCode, publishCode, bookCode, checkCode } = this.#parseOldVersion();
      return { prefixCode, groupCode, publishCode, bookCode, checkCode };
    } else if (this.#isCurrentVersion()) {
      return this.#parseCurrentVersion();
    }
  }

  /**
   * 解析ISBN为5部分：前缀，组号（国家、地区、语言的代号），出版者号，书序号和检验码
   * @date 2023/9/28 - 14:11:51
   *
   * @returns {{ prefixCode: any; groupCode: any; publishCode: any; bookCode: any; checkCode: any; }}
   */
  parse(){
    return {
      prefixCode: this.#prefixCode,
      groupCode: this.#groupCode,
      publishCode: this.#publishCode,
      bookCode: this.#bookCode,
      checkCode: this.#checkCode,
    }
  }

  /**
   * 解析为有分隔符的形式
   * @date 2023/9/20 - 09:40:56
   *
   * @param {string} [separator=InternationalStandardBookNumber.SEPARATOR]
   * @returns {string}
   */
  parseWithSeparator(separator = InternationalStandardBookNumber.SEPARATOR) {
    const res = [];
    if (this.#prefixCode !== null) {
      res.push(this.#prefixCode);
    }
    if (this.#groupCode !== null) {
      res.push(this.#groupCode);
    }
    if (this.#publishCode !== null) {
      res.push(this.#publishCode);
    }
    if (this.#bookCode !== null) {
      res.push(this.#bookCode);
    }
    if (this.#checkCode !== null) {
      res.push(this.#checkCode);
    }
    return res.join(separator);
  }

  /**
   * 旧格式转当前格式
   * @date 2023/9/19 - 14:44:41
   *
   * @param {number} [prefixCode=InternationalStandardBookNumber.PRIFIX_CODE_978]
   * @returns {string}
   */
  oldToCurrentVersion(prefixCode = InternationalStandardBookNumber.PRIFIX_CODE_978) {
    const isbn = this.#isbn;
    // 去掉校验位
    const isbnWithoutCheckCode = isbn.slice(0, -1);
    // 加上前缀
    const isbnWaitCheck = prefixCode + isbnWithoutCheckCode;
    // 计算校验值
    const checkCode = this.#currentVersionCheckCode(isbnWaitCheck);
    return isbnWaitCheck + checkCode;
  }

  /**
   * 当前格式转旧格式
   * @date 2023/9/19 - 15:00:53
   *
   * @returns {string}
   */
  currentToOldVersion() {
    const isbn = this.#isbn;
    // 去掉前缀和校验位
    const isbnWaitCheck = isbn.slice(3, -1);
    // 检验值
    const checkCode = this.#oldVersionCheckCode(isbnWaitCheck);
    return isbnWaitCheck + checkCode;
  }

  /**
   * 出版社名称
   * @date 2023/9/22 - 17:15:55
   *
   * @returns {*}
   */
  publishName() {
    return publish.get(this.#publishCode);
  }

  #format(isbn){
    return isbn.replaceAll(/[-\s,.;:，。；：]/g, '')
  }

  /**
   * 是否旧的格式，即2007年1月1日之前，ISBN由10位数字组成
   * @date 2023/9/19 - 11:13:09
   *
   * @returns {boolean}
   */
  #isOldVersion() {
    return this.#isbn.length === InternationalStandardBookNumber.OLD_VERSION_LENGTH;
  }

  /**
   * 是否当前版本，即2007年1月1日之后，新版ISBN由13位数字组成
   * @date 2023/9/19 - 11:15:05
   *
   * @returns {boolean}
   */
  #isCurrentVersion() {
    return this.#isbn.length === InternationalStandardBookNumber.CURRENT_VERSION_LENGTH;
  }

  /**
   * 旧格式是否合法
   * @date 2023/9/19 - 11:24:33
   *
   * @returns {boolean}
   */
  #isValidOldVersion() {
    const isbn = this.#isbn;
    // 校验值
    const isbnCheckCode = isbn.slice(-1);
    // 计算的检验值
    const checkCode = this.#oldVersionCheckCode(isbn.slice(0, -1));
    return checkCode === isbnCheckCode;
  }

  /**
   * 计算旧格式的加权和
   * @date 2023/9/19 - 15:06:23
   *
   * @param {*} isbnWaitCheck
   * @returns {number}
   */
  #oldVersionSum(isbnWaitCheck) {
    const isbnWaitCheckLength = isbnWaitCheck.length + 1;
    // 加权和S
    let sum = 0;
    for (let i = isbnWaitCheckLength; i > 1; i--) {
      const index = isbnWaitCheckLength - i;
      const value = isbnWaitCheck.slice(index, index + 1);
      sum += parseInt(value) * i;
    }
    return sum;
  }

  /**
   * 计算旧格式的检验值
   * @date 2023/9/19 - 15:45:04
   *
   * @param {*} isbnWaitCheck
   * @returns {*}
   */
  #oldVersionCheckCode(isbnWaitCheck) {
    const sum = this.#oldVersionSum(isbnWaitCheck);
    // 余数M
    const m = sum % 11;
    // 差N
    const n = 11 - m;

    let checkCode = n + "";
    if (n === 11) {
      checkCode = "0";
    } else if (n === 10) {
      checkCode = "X";
    }
    return checkCode;
  }

  /**
   * 当前格式是否合法
   * @date 2023/9/19 - 15:49:31
   *
   * @returns {boolean}
   */
  #isValidCurrentVersion() {
    const isbn = this.#isbn;
    // 校验值
    const isbnCheckCode = isbn.slice(-1);
    // 计算的检验值
    const checkCode = this.#currentVersionCheckCode(isbn.slice(0, -1));
    return checkCode === isbnCheckCode;
  }

  /**
   * 计算当前格式的加权和
   * @date 2023/9/19 - 15:47:36
   *
   * @param {*} isbnWaitCheck
   * @returns {number}
   */
  #currentVersionSum(isbnWaitCheck) {
    let sum = 0;
    for (let i = 0; i < isbnWaitCheck.length; i++) {
      // 加权因子
      let weightFactor = 1;
      if (i % 2 === 1) {
        weightFactor = 3;
      }
      const isbnWaitCheckSlice = isbnWaitCheck.slice(i, i + 1);
      sum += parseInt(isbnWaitCheckSlice) * weightFactor;
    }
    return sum;
  }

  /**
   * 计算当前格式的校验值
   * @date 2023/9/19 - 15:48:22
   *
   * @param {*} isbnWaitCheck
   * @returns {string}
   */
  #currentVersionCheckCode(isbnWaitCheck) {
    const sum = this.#currentVersionSum(isbnWaitCheck);
    // 余数M
    const m = sum % 10;
    // 差N
    const n = 10 - m;
    // 校验值
    let checkCode = n + "";
    if (n === 10) {
      checkCode = "0";
    }
    return checkCode;
  }

  /**
   * 解析ISBN为4部分：组号（国家、地区、语言的代号），出版者号，书序号和检验码
   * @date 2023/9/19 - 16:15:35
   *
   * @returns {{ groupCode: any; publishCode: any; bookCode: any; checkCode: any; }}
   */
  #parseOldVersion() {
    const isbn = this.#isbn;

    const { groupCode, publishCode, bookCode } = this.#parseGroupPublishBookCode(isbn.slice(0, -1));
    const checkCode = isbn.slice(-1);

    return {
      groupCode,
      publishCode,
      bookCode,
      checkCode,
    };
  }

  /**
   * 解析ISBN为5部分：前缀，组号（国家、地区、语言的代号），出版者号，书序号和检验码
   * @date 2023/9/19 - 16:19:58
   *
   * @returns {{ prefixCode: any; groupCode: any; publishCode: any; bookCode: any; checkCode: any; }}
   */
  #parseCurrentVersion() {
    const isbn = this.#isbn;
    const prefixCode = isbn.slice(0, 3);
    const { groupCode, publishCode, bookCode } = this.#parseGroupPublishBookCode(isbn.slice(3, -1));
    const checkCode = isbn.slice(-1);

    return {
      prefixCode,
      groupCode,
      publishCode,
      bookCode,
      checkCode,
    };
  }

  /**
   * 解析ISBN中间三部分：组号（国家、地区、语言的代号），出版者号，书序号
   * @date 2023/9/19 - 16:24:24
   *
   * @param {*} waitParseIsbn
   * @returns {{ groupCode: any; publishCode: any; bookCode: any; }}
   */
  #parseGroupPublishBookCode(waitParseIsbn) {
    const { groupCode, resIsbn } = this.#parseGroupCode(waitParseIsbn);
    const { publishCode, bookCode } = this.#parsePublishCode(resIsbn);

    return {
      groupCode,
      publishCode,
      bookCode,
    };
  }

  /**
   * 解析组号（中国）
   * @date 2023/9/19 - 17:26:22
   *
   * @param {*} waitParseIsbn
   * @returns {{ groupCode: any; resIsbn: any; }}
   */
  #parseGroupCode(waitParseIsbn) {
    let groupCode = null;
    const groupCodeRegexs = [
      /^[0-7]/g,
      /^[80-94]/g,
      /^[950-997]/g,
      /^[9980-9989]/g,
      /^[99900-99999]/g,
    ];
    for (let i = 0; i < groupCodeRegexs.length; i++) {
      const groupCodeRegexMatch = waitParseIsbn.match(groupCodeRegexs[i]);
      if (groupCodeRegexMatch !== null) {
        groupCode = groupCodeRegexMatch[0];
        break;
      }
    }
    const resIsbn = waitParseIsbn.slice(groupCode.length);
    return {
      groupCode,
      resIsbn,
    };
  }

  /**
   * 解析出版社号（中国）
   * @date 2023/9/19 - 17:26:22
   *
   * @param {*} waitParseIsbn
   * @returns {{ publishCode: any; resIsbn: any; }}
   */
  #parsePublishCode(waitParseIsbn) {
    let publishCode = null;
    const publishCodeRegexs = [
      /^0[0-9]/g,
      /^[1-4][0-9][0-9]/g,
      /^[5-7][0-9][0-9][0-9]/g,
      /^8[0-9][0-9][0-9][0-9]/g,
      /^9[0-9][0-9][0-9][0-9][0-9]/g,
    ];
    for (let i = 0; i < publishCodeRegexs.length; i++) {
      const publishCodeRegexMatch = waitParseIsbn.match(publishCodeRegexs[i]);
      if (publishCodeRegexMatch !== null) {
        publishCode = publishCodeRegexMatch[0];
        break;
      }
    }
    const bookCode = waitParseIsbn.slice(publishCode.length);
    return {
      publishCode,
      bookCode,
    };
  }

  /**
   * 生成ISBN
   * @date 2023/9/26 - 17:13:49
   *
   * @returns {{ prefixCode: any; groupCode: string; publishCode: any; bookCode: any; checkCode: string; }}
   */
  fake(){
    let prefixCode = common.arrayRandom([0, 1])
    if (prefixCode === 0) {
      return this.fakeOldVersion()
    } else {
      return this.fakeCurrentVersion()
    }
  }

  /**
   * 生成旧的版本的ISBN
   * @date 2023/9/26 - 17:20:18
   *
   * @returns {this}
   */
  fakeOldVersion(){
    this.#prefixCode = null

    this.#groupCode = InternationalStandardBookNumber.GROUP_CODE
    
    this.#publishCode = this.#fakePublishCode()
    
    const bookCodeLength = InternationalStandardBookNumber.PUBLISH_BOOK_LENGTH - this.#publishCode.length
    this.#bookCode = this.#fakeBookCode(bookCodeLength)
    
    const waitParseIsbn = this.#groupCode + this.#publishCode + this.#bookCode
    this.#checkCode = this.#oldVersionCheckCode(waitParseIsbn)
    
    this.#isbn = waitParseIsbn + this.#checkCode

    return this
  }

  /**
   * 生成当前版本的ISBN
   * @date 2023/9/26 - 17:20:18
   *
   * @returns {this}
   */
  fakeCurrentVersion(){
    this.#prefixCode = common.arrayRandom([InternationalStandardBookNumber.PRIFIX_CODE_978, InternationalStandardBookNumber.PRIFIX_CODE_979])

    this.#groupCode = InternationalStandardBookNumber.GROUP_CODE
    
    this.#publishCode = this.#fakePublishCode()
    
    const bookCodeLength = InternationalStandardBookNumber.PUBLISH_BOOK_LENGTH - this.#publishCode.length
    this.#bookCode = this.#fakeBookCode(bookCodeLength)
    
    const waitParseIsbn = this.#prefixCode + this.#groupCode + this.#publishCode + this.#bookCode
    this.#checkCode = this.#currentVersionCheckCode(waitParseIsbn)
    
    this.#isbn = waitParseIsbn + this.#checkCode

    return this
  }

  /**
   * 生成出版社号
   * @date 2023/9/26 - 16:57:31
   *
   * @returns {*}
   */
  #fakePublishCode(){
    // 获取随机规则
    const randomIndex = common.numberRandom(0, 4)
    // /^0[0-9]/g
    let arrayRandomRangeRule = [
      { start: 0, end:0},
      { start: 0, end:9}
    ]
    if (randomIndex === 1) {
      // /^[1-4][0-9][0-9]/g
      arrayRandomRangeRule = [
        { start: 1, end:4},
        { start: 0, end:9},
        { start: 0, end:9}
      ]
    } else if (randomIndex === 2) {
      // /^[5-7][0-9][0-9][0-9]/g
      arrayRandomRangeRule = [
        { start: 5, end:7},
        { start: 0, end:9},
        { start: 0, end:9},
        { start: 0, end:9}
      ]
    } else if (randomIndex === 3) {
      // /^8[0-9][0-9][0-9][0-9]/g
      arrayRandomRangeRule = [
        { start: 8, end:8},
        { start: 0, end:9},
        { start: 0, end:9},
        { start: 0, end:9}
      ]
    } else if (randomIndex === 4) {
      // /^9[0-9][0-9][0-9][0-9][0-9]/g
      arrayRandomRangeRule = [
        { start: 9, end:9},
        { start: 0, end:9},
        { start: 0, end:9},
        { start: 0, end:9},
        { start: 0, end:9}
      ]
    }

    return common.arrayRandomRange(arrayRandomRangeRule)
  }

  /**
   * 生成书号
   * @date 2023/9/26 - 17:01:14
   *
   * @param {*} length
   * @returns {*}
   */
  #fakeBookCode(length){
    const arrayRandomRangeRule = []
    for(let i = 0; i < length; i++) {
      arrayRandomRangeRule.push({start: 0, end:9})
    }
    return common.arrayRandomRange(arrayRandomRangeRule)
  }
}

export default InternationalStandardBookNumber;
