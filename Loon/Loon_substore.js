if (typeof $content === 'string') {
  const SUBSTORE_HOST = 'https://substore-rear.planet-teddy.org'
  const TARGET = 'Loon'
  const DEFAULT_ICON = 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Global.png'

  // 参数表 key = airports，多个机场用 | 分隔，每个机场内部用 ; 分隔字段：
  // 显示名;sub或collection;Sub-Store里的订阅/组合订阅名;图标链接(可省略)
  const airportsRaw = $arguments?.airports || ''

  if (!airportsRaw) {
    console.log(`[脚本操作] WARN: 参数表里没有配置 airports，请检查`)
  }

  const entries = airportsRaw.split('|').map(s => s.trim()).filter(Boolean)
  const remoteProxyLines = []
  const displayNames = []

  entries.forEach(entry => {
    const parts = entry.split(';').map(s => s.trim())
    const [name, type, subName, icon] = parts

    if (!name || !subName) {
      console.log(`[脚本操作] WARN: 机场条目 "${entry}" 格式不完整，已跳过`)
      return
    }
    const t = (type || 'sub').toLowerCase()
    if (!['sub', 'collection'].includes(t)) {
      console.log(`[脚本操作] WARN: 机场 "${name}" 的类型 "${type}" 不识别，已跳过`)
      return
    }

    const pathPrefix = t === 'collection' ? 'collection/' : ''
    const url = `${SUBSTORE_HOST}/download/${pathPrefix}${encodeURIComponent(subName)}?target=${TARGET}`
    const iconUrl = icon || DEFAULT_ICON

    remoteProxyLines.push(
      `${name} = ${url},udp=true,block-quic=true,fast-open=false,vmess-aead=true,skip-cert-verify=true,enabled=true,flexible-sni=true,img-url=${iconUrl}`
    )
    displayNames.push(name)
  })

  $content = $content
    .replace(/\{\{REMOTE_PROXY_BLOCK\}\}/g, remoteProxyLines.join('\n'))
    .replace(/\{\{AIRPORT_NAME\}\}/g, displayNames.join(','))
}
