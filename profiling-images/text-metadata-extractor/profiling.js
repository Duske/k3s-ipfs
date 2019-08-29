/* Dependencies ********************************************************************************* */
const path = require('path');

const appRoot = process.cwd();
const { spawn, execSync } = require('child_process');

/* Path to external tools *********************************************************************** */
const tikaPath = path.join(appRoot, 'ext', 'tika', 'tika-app-1.19.1.jar');

/**
 * Extracting metadata of text file by using Apache TIKA
 *
 * @param {String} filePath: path to temporary file
 * @returns {Promise|Object} Object with metadata of the table-data file
 */
async function extractMetadata(filePath) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    const ls = spawn('java', ['-jar', tikaPath, '-j', filePath]);

    ls.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    ls.stderr.on('data', (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    ls.on('exit', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(stdout);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error('Error on reading file'));
      }
    });
  });
}

function mapResultProperties(metadata) {
  const result = {
    byteSize: parseInt(metadata['Content-Length'], 0),
  };
  if (metadata['Content-Encoding']) result.characterEncoding = metadata['Content-Encoding'];
  if (metadata['dcterms:created']) result.dctermsCreated = metadata['dcterms:created'];
  if (metadata['dcterms:modified']) result.dctermsModified = metadata['dcterms:modified'];
  if (metadata['Last-Save-Date']) result.lastSaveDate = metadata['Last-Save-Date'];
  if (metadata['pdf:docinfo:creator_tool']) result.pdfDocinfoCreatorTool = metadata['pdf:docinfo:creator_tool'];
  if (metadata['pdf:docinfo:producer']) result.pdfDocinfoProducer = metadata['pdf:docinfo:producer'];
  if (metadata['pdf:encrypted']) result.pdfEncrypted = metadata['pdf:encrypted'] === 'true';
  if (metadata['pdf:PDFVersion']) result.pdfVersion = metadata['pdf:PDFVersion'];
  if (metadata['xmpTPg:NPages']) result.numberOfPages = parseInt(metadata['xmpTPg:NPages'], 10);
  return result;
}

async function processFile(filePath) {
  const metadata = await extractMetadata(filePath);
  console.log(metadata);
  return mapResultProperties(metadata);
}

function getContent(filePath) {
  return execSync(`java -jar ${tikaPath} --text ${filePath}`, {
    encoding: 'utf-8',
  });
}

module.exports = {
  processFile,
  getContent,
};
