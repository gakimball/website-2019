const fs = require('fs')
const path = require('path')
const { marked } = require('marked')
const Gemtext = require('gemtext')

const srcDir = path.join(__dirname, 'src')

const build = () => {
  const content = fs.readFileSync(path.join(srcDir, 'index.gmi')).toString()
  const template = fs.readFileSync(path.join(srcDir, 'template.html')).toString()

  const page = template.replace(
    '{{body}}',
    Gemtext.parse(content).generate(Gemtext.HTMLRenderer),
  )

  fs.writeFileSync(path.join(__dirname, 'docs/index.html'), page)

  console.log('Built!')
}

fs.watch(srcDir, build)

build()
