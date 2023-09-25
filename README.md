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

const isbn = new Isbn('9788721304621')
isbn.isValid() // 格式是否合法
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

# TODO

- 生成假数据
