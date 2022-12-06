const fs = require('fs');
const path = require('path');

const copyDir = async function (src, dest) {
  fs.mkdir(dest, { recursive: true }, async () => {
      fs.readdir(src, { withFileTypes: true }, async (err, entries) => {
          for (let entry of entries) {
              let srcPath = path.join(src, entry.name);
              let destPath = path.join(dest, entry.name);

              entry.isDirectory() ?
                  await copyDir(srcPath, destPath) :
                  fs.copyFile(srcPath, destPath, (err) => {
                      if (err) console.error(err)
                  });
          }
      });


  });

}

module.exports = {
    copyDir
}