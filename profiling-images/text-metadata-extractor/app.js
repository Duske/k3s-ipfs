const fs = require('fs-extra');
const fsPromises = require('fs').promises;

const { processFile, getContent } = require('./profiling');

const calc = async () => {
  try {
    const path = process.argv[2];
    const meta = await processFile(path);
    const content = getContent(path);
    fs.writeJsonSync('./meta.json', meta);
    await fsPromises.writeFile('./text.txt', content);
  } catch (e) {
    console.error('Resource path could not be processed', e.message);
  }
};

calc().then(() => console.log('success')).catch(err => console.err(err));
