/* Dependencies ********************************************************************************* */
const fs = require('fs-extra');
const path = require('path');
const jstring = require('jstring');
const { Language } = require('node-nlp');
const { PythonShell } = require('python-shell');
const tmp = require('tmp-promise');

const appRoot = process.cwd();

const languagesCorePhrases = [
  'cs',
  'en',
  'fr',
  'de',
  'ja',
  'pt',
  'sk',
  'es',
];

/* Path to external tools *********************************************************************** */
const corePhraserPath = path.join(appRoot, 'ext', 'summerizer');
const corePhraserAppName = 'summerizer.py';


/**
 * Sanatize text by removing double whitespaces and non-ASCII characters
 * @param {String} String to be sanitized
 * @param {String} sanitized Text
 */
function sanitizeText(text) {
  let t = text.replace(/\r?\n|\r/g, ' ');
  t = jstring.minifyWhitespace(t);
  return t;
}

/**
 * Language guessing used from node-nlp. Works in almost all cases.
 * @param {String} text: the text of which the language should be guessed
 * @param {Array}
 */
function guessLanguages(text) {
  const language = new Language();
  const guess = language.guess(
    text,
    null,
    3,
  );
  return guess[0].alpha2;
}


/**
 * This functions calls a Python script that summerizes a given text
 * @param {String} text to be summerized
 * @param {String} languageAlpha2 language of text in alpha2 coding
 * @return {Promise|Array}
 */
async function extractCorePhrases(text, languageAlpha2) {
  if (languagesCorePhrases.indexOf(languageAlpha2) > -1) {
    const { path, cleanup } = await tmp.file();
    await fs.outputFile(path, text);

    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: corePhraserPath,
        args: [path, languageAlpha2, 10],
      };

      PythonShell.run(corePhraserAppName, options, (err, results) => {
        cleanup();

        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(results[0]));
        }
      });
    });
  }
  return {};
}


function mapResult(corePhrases) {
  const res = [];
  corePhrases.forEach((e) => {
    res.push({
      sentences: e[1],
      algorithm: e[0],
    });
  });
  return res;
}


async function processFile(content) {
  const sanitizedText = sanitizeText(content);
  const languageAlpha2 = guessLanguages(sanitizedText);
  const corePhrases = await extractCorePhrases(sanitizedText, languageAlpha2);
  return mapResult(corePhrases);
}

module.exports = {
  processFile,
};
