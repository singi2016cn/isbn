# ISBN

本库提供ISBN的解析，验证，生成假数据等功能。

> 国际标准书号（International Standard Book Number），简称ISBN，是专门为识别图书等文献而设计的国际编号。


# 使用

## 安装

```
npm i international-standard-book-number
```

## 简单用法
```js
import Isbn from "isbn"

try {
  const isbn = new Isbn('9787559602176')

  // 格式是否合法
  const isValid = isbn.isValid()
  console.log(isValid) // true

  // 获取分隔符的格式
  const isbnSeparator = isbn.parseWithSeparator()
  console.log(isbnSeparator) // 978-7-5596-0217-6

  // 获取各部分
  const isbnParts = isbn.parse()
  console.log(isbnParts)
  /* 
  {
    prefixCode: '978',
    groupCode: '7',
    publishCode: '5596',
    bookCode: '0217',
    checkCode: '6'
  }
  */

  // 获取出版社名称
  const publishName = isbn.publishName()
  console.log(publishName) // 北京联合出版公司
} catch (e) {
  console.log(e.message)
}
```


## 生成数据

```javascript
import Isbn from "isbn"

const isbn = new Isbn()

// 随机生成当前版本的假数据
// 随机生成10个当前版本的数据
for (let i = 0; i < 10; i++) {
  const isbnFakeCurrentVersionSeparator = isbn.fakeCurrentVersion().parseWithSeparator()
  console.log(isbnFakeCurrentVersionSeparator)
}

/* 
978-7-227-99984-3
979-7-158-37984-3
979-7-7155-7132-1
978-7-378-74386-9
978-7-197-41592-3
978-7-5134-2935-1
978-7-129-76919-3
979-7-467-87794-8
979-7-5539-7196-3
978-7-984227-63-0
*/


// 随机生成10个旧版本的数据
for (let i = 0; i < 10; i++) {
  const isbnFakeOldVersionSeparator = isbn.fakeOldVersion().parseWithSeparator()
  console.log(isbnFakeOldVersionSeparator)
}

/* 
7-5349-6296-X
7-215-65943-7
7-122-46576-4
7-145-47464-6
7-443-93119-0
7-5236-1269-5
7-457-51395-7
7-7212-1365-7
7-89187-338-0
7-383-62877-2
*/


// 随机生成10个随机版本的数据
for (let i = 0; i < 10; i++) {
  const isbnFakeSeparator = isbn.fake().parseWithSeparator()
  console.log(isbnFakeSeparator)
}

/* 
978-7-5296-8717-2
979-7-7393-1861-2
978-7-6662-9937-5
7-959362-33-5
978-7-299-32829-9
7-151-34897-5
7-86388-617-1
7-315-51583-6
7-5992-8693-4
7-234-66128-X
*/
```

# 开发

```
# 安装依赖
npm i

# 运行测试用例
npm test
```

# 功能

- 验证格式是否正确
- 解析（暂时只支持中国）
  - 无分隔格式 => 对象格式
  - 无分隔格式 => 分隔符格式

- 生成数据
  - 随机旧版本数据
  - 随机当前版本数据
  - 随机的随机版本数据
# TODO
  - 完善出版社配置