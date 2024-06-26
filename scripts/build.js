const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const process = require('process')

const buildDir = path.join(process.cwd(), 'build')
const distDir = path.join(process.cwd(), 'dist')

const buildIndexJs = path.join(buildDir, 'index.js')
const distIndexJs = path.join(distDir, 'index.js')

var ncc = `./node_modules/.bin/ncc`;
if (process.platform === "win32") {
    ncc = `.\\node_modules\\.bin\\ncc.cmd`;
}

if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir)
}

// Build the main index.js file
console.log('Building index.js...')
execSync(`${ncc} build index.js -q -o ${buildDir}`)
if (fs.existsSync(distIndexJs)) {
    fs.unlinkSync(distIndexJs)
}
fs.renameSync(buildIndexJs, distIndexJs)
console.log('Cleaning up...')

console.log('Done')