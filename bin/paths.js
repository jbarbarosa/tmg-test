const path = require('path');

const root = path.join(__dirname, "..");
const src = path.join(root, "src");
const build = path.join(root, "build");

const d = (...pathParam) => path.join(...(pathParam[1].includes("/") ? [`${pathParam[0]}${pathParam[1]}`] : pathParam))

module.exports = {
    d, root, src, build
}