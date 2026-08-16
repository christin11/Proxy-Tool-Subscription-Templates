if (typeof $content === 'string') {
  const raw = $arguments?.target || ''
  // 新增：机场名称也从参数表读，没配置就自动用 subName 兜底
  const nameParam = $arguments?.name || ''

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
  const pathPrefix = type === 'collection' ? 'collection/' : ''

  const url = subName
    ? `${SUBSTORE_HOST}/download/${pathPrefix}${encodeURIComponent(subName)}?target=${TARGET}`
    : ''

  // 显示名称优先用 name 参数，没填就退回用 subName，都没有才兜底 AirPort
  const displayName = nameParam || subName || 'AirPort'

  $content = $content
    .replace(/\{\{AIRPORT_NAME\}\}/g, displayName)
    .replace(/\{\{SUB_URL\}\}/g, url)
}
