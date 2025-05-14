import watch from 'node-watch'
import JSZip from 'jszip'
import fs from 'node:fs/promises'
import path from 'node:path'

const log = (/** @type {any[]} */ ...args) => {
  console.log(`[${new Date().toLocaleString().replaceAll('/', '-')}]`, ...args)
}

const args = process.argv.slice(2)

const watcher = watch('./src', { recursive: true })
const zip = new JSZip()

const addDir = async (/** @type{string} */ dir) => {
  const files = await fs.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      await addDir(filePath)
    } else {
      const content = await fs.readFile(filePath)
      const path = filePath.replaceAll('\\', '/').replace('src/', '')
      zip.file(path, content)
    }
  }
}

await addDir('./src')

await fs.mkdir('./dist', { recursive: true })

await fs.writeFile(
  `./dist/sole.ecnu.edu.cn.zip`,
  await zip.generateAsync({ type: 'nodebuffer' })
)

log('Packaged!')

if (args && args[0] === '--build') {
  process.exit(0)
}

log('Start watching for changes...')

watcher.on('change', async (_, file) => {
  try {
    await fs.access(file)
  } catch {
    zip.remove(file.replaceAll('\\', '/').replace('src/', ''))
    return
  }
  const stat = await fs.stat(file)
  if (stat.isDirectory()) {
    return
  }
  log(`File changed: ${file}`)
  const path = file.replaceAll('\\', '/').replace('src/', '')
  zip.file(path, await fs.readFile(file))
  await fs.writeFile(
    `./dist/sole.ecnu.edu.cn.zip`,
    await zip.generateAsync({ type: 'nodebuffer' })
  )
  log('Packaged!')
})
