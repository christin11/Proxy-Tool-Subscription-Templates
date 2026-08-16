if (typeof $content === 'string') {
  const raw = $arguments?.target || ''

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
  const TARGET = 'ClashMeta'

  // 单条订阅: /download/<name>
  // 组合订阅: /download/collection/<name>  ← 比单条订阅多一段 collection/
  const pathPrefix = type === 'collection' ? 'collection/' : ''

  const url = subName
    ? `${SUBSTORE_HOST}/download/${pathPrefix}${encodeURIComponent(subName)}?target=${TARGET}`
    : ''

  $content = $content
    .replace(/\{\{AIRPORT_NAME\}\}/g, '良心云')
    .replace(/\{\{SUB_URL\}\}/g, url)
}
