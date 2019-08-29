const fs = require('fs-extra');
const fsPromises = require('fs').promises;

const { processFile } = require('./profiling');

const calc = async () => {
  try {
    const path = process.argv[2];
    const content = fs.readFileSync(path, {encoding: 'utf-8'});
    const language = await processFile(content);
    fs.writeJsonSync('./language.json', language);
  } catch (e) {
    console.error('Resource path could not be processed', e.message);
  }
};

calc().then(() => console.log('success')).catch(err => console.err(err));
