import chineseLibraryClassification from './config/chinese_library_classification.js'

const chineseLibraryClassificationMap = new Map()
for(let i = 0; i < chineseLibraryClassification.length; i++) {
  chineseLibraryClassificationMap.set(chineseLibraryClassification[i]['key'], chineseLibraryClassification[i]['value'])
}

export default chineseLibraryClassificationMap