/* Dependencies ********************************************************************************* */
const fs = require('fs-extra');
const path = require('path');
const jstring = require('jstring');
const { Language } = require('node-nlp');
const { PythonShell } = require('python-shell');
const tmp = require('tmp-promise');

const appRoot = process.cwd();

const statisticsLanguages = [
  'de',
  'en',
];

/* Path to external tools *********************************************************************** */
const textStatisticanPath = path.join(appRoot, 'ext', 'statistics');
const textStatisticanAppName = 'text-statistics.py';

function sanitizeText(text) {
  let t = text.replace(/\r?\n|\r/g, ' ');
  t = jstring.minifyWhitespace(t);
  return t;
}

function guessLanguages(text) {
  const language = new Language();
  const guess = language.guess(
    text,
    null,
    3,
  );
  return guess[0].alpha2;
}

function mapResult(res) {
  const map = {
    numberOfCharacters: res.numberOfCharacters,
    numberOfWords: res.numberOfWords,
    numberOfSentences: res.numberOfSentences,
    characterDistribution: res.characterDistribution.map(e => ({
      character: e[0],
      count: e[1],
    })),
  };
  return map;
}

async function stats(text, languageAlpha2) {
  if (statisticsLanguages.indexOf(languageAlpha2) > -1) {
    const { path, cleanup } = await tmp.file();
    await fs.outputFile(path, text);

    return new Promise((resolve, reject) => {
      const options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: textStatisticanPath,
        args: [path, languageAlpha2],
      };

      PythonShell.run(textStatisticanAppName, options, (err, results) => {
        cleanup();

        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(results));
        }
      });
    });
  }
  return [];
}


async function processFile(content) {
  const sanitizedText = sanitizeText(content);
  const languageAlpha2 = guessLanguages(sanitizedText);
  const res = await stats(sanitizedText, languageAlpha2);
  return mapResult(res);
}

module.exports = {
  processFile,
};
