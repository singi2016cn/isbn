import publishConfigs from './config/publish.js'

const publishMap = new Map()
for(let i = 0; i < publishConfigs.length; i++) {
  publishMap.set(publishConfigs[i]['key'], publishConfigs[i]['value'])
}

export default publishMap