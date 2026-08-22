if (typeof $content === 'string') {
  const raw = $arguments?.target || ''
  const nameParam = $arguments?.name || ''
  const iconParam = $arguments?.icon || ''

  let type = 'sub'
  let subName = raw
  if (raw.includes(':')) {
    const idx = raw.indexOf(':')
    type = raw.slice(0, idx).trim().toLowerCase()
    subName = raw.slice(idx + 1).trim()
  }

  if (!subName) {
    console.log(`[脚本操作] WARN: 参数表里没有配置 target，请检查`)
  } else if (!['sub', 'collection'].includes(type)) {
    console.log(`[脚本操作] WARN: target 的类型 "${type}" 不识别，仅支持 sub 或 collection`)
  }

  const SUBSTORE_HOST = 'https://substore-rear.planet-teddy.org'
  const TARGET = 'Loon'   // Sub-Store 支持的目标格式，专供 Loon 使用
  const pathPrefix = type === 'collection' ? 'collection/' : ''

  const url = subName
    ? `${SUBSTORE_HOST}/download/${pathPrefix}${encodeURIComponent(subName)}?target=${TARGET}`
    : ''

  const displayName = nameParam || subName || 'AirPort'
  // 没在参数表配置 icon 就用一个通用的机场图标兜底
  const iconUrl = iconParam || 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Airport.png'

  $content = $content
    .replace(/\{\{AIRPORT_NAME\}\}/g, displayName)
    .replace(/\{\{SUB_URL\}\}/g, url)
    .replace(/\{\{SUB_img-url\}\}/g, iconUrl)
}
