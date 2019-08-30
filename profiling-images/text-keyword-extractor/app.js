const fs = require('fs-extra');
const fsPromises = require('fs').promises;

const { processFile } = require('./profiling');

const calc = async () => {
  try {
    const path = process.argv[2];
    const content = fs.readFileSync(path, {encoding: 'utf-8'});
    const keywords = await processFile(content);
    fs.writeJsonSync('./keywords.json', keywords);
  } catch (e) {
    console.error('Resource path could not be processed', e.message);
  }
};

calc().then(() => console.log('success')).catch(err => console.err(err));