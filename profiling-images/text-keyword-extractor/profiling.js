/* Dependencies ********************************************************************************* */
const fs = require('fs-extra');
const path = require('path');
const jstring = require('jstring');
const { Language } = require('node-nlp');
const { PythonShell } = require('python-shell');
const tmp = require('tmp-promise');

const appRoot = process.cwd();

const languagesKeywordExtraction = [
  'de',
  'en',
];

/* Path to external tools *********************************************************************** */
const keywordExtractorPath = path.join(appRoot, 'ext', 'keyword-extractor');
const keywordExtractorAppName = 'keyword-extractor.py';



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
 *
 * @param {String} Text of which the keywords should be extracted
 * @param {String} Language of the text in alpha2 coding
 * @return {Promise|Array} List of most important keywords
 */
async function extractKeywords(text, languageAlpha2) {
  if (languagesKeywordExtraction.indexOf(languageAlpha2) > -1) {
    const { path, cleanup } = await tmp.file();
    await fs.outputFile(path, text);

    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: keywordExtractorPath,
        args: [path, languageAlpha2, 20],
      };

      PythonShell.run(keywordExtractorAppName, options, (err, results) => {
        cleanup();

        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(results[0]));
        }
      });
    });
  }
  return [];
}


async function processFile(content) {
  const sanitizedText = sanitizeText(content);
  const languageAlpha2 = guessLanguages(sanitizedText);
  const keywords = await extractKeywords(sanitizedText, languageAlpha2);
  return keywords;
}

module.exports = {
  processFile,
};
