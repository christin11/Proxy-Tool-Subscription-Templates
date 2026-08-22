if (typeof $content === 'string') {
  const SUBSTORE_HOST = 'https://substore-rear.planet-teddy.org'
  const TARGET = 'QX'
  const DEFAULT_ICON = 'https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Airport.png'

  // 参数表 key = airports，多个机场用 | 分隔，每个机场内部用 ; 分隔字段：
  // 显示名;sub或collection;Sub-Store里的订阅/组合订阅名;图标链接(可省略)
  const airportsRaw = $arguments?.airports || ''

  if (!airportsRaw) {
    console.log(`[脚本操作] WARN: 参数表里没有配置 airports，请检查`)
  }

  const entries = airportsRaw.split('|').map(s => s.trim()).filter(Boolean)
  const lines = []

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

    lines.push(
      `${url}, tag=${name}, img-url=${iconUrl}, update-interval=172800, opt-parser=false, enabled=true`
    )
  })

  $content = $content.replace(/\{\{SERVER_REMOTE_BLOCK\}\}/g, lines.join('\n'))
}
