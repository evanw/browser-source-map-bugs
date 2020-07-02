const sm = require('source-map')
const fs = require('fs')

async function verify(source) {
  const js = fs.readFileSync(source, 'utf8')
  const map = fs.readFileSync(source + '.map', 'utf8')
  const index = js.indexOf('console.trace')
  const line = js.slice(0, index).split('\n').length
  const column = js.slice(0, index).split('\n').slice(-1)[0].length
  const sourceMap = await new sm.SourceMapConsumer(map)
  const original = sourceMap.originalPositionFor({ line, column })
  console.table([
    { kind: 'generated', source, line, column },
    { kind: 'original', source: original.source, line: original.line, column: original.column },
  ])
}

async function main() {
  await verify('out.js')
  await verify('out.min.js')
}

main().catch(e => setTimeout(() => { throw e }))
