const fsPromises = require('fs').promises;
const fs = require('fs-extra');
const path = require('path');


const calc = async () => {
  try {
    const dirPath = process.argv[2];
    const filenames = await fsPromises.readdir(dirPath);
    const map = filenames.reduce((map, name) => {
        return {
          ...map,
          [name]: fs.readFileSync(path.join(dirPath, name), {encoding: 'utf-8'})
        }
    }, {});
    console.log(map);
    fs.writeJsonSync('./result.json', map);
  } catch (e) {
    console.error(JSON.stringify(e));
  }
};

calc().then(() => console.log('success')).catch(err => console.err(err));
