/* Dependencies ********************************************************************************* */
const jstring = require('jstring');
const { Language } = require('node-nlp');

/**
 * Sanatize text by removing double whitespaces and non-ASCII characters
 * @param {String} String to be sanitized
 * @param {String} sanitized Text
 */
function sanitizeText (text) {
  let t = text.replace(/\r?\n|\r/g, ' ');
  t = jstring.minifyWhitespace(t);
  return t;
}

/**
 * Language guessing used from node-nlp. Works in almost all cases.
 * @param {String} text: the text of which the language should be guessed
 * @param {Array}
 */
function guessLanguages (text) {
  const language = new Language();
  const guess = language.guess(
    text,
    null,
    3,
  );
  return guess;
}


async function processFile(content) {
  const languages = guessLanguages(sanitizeText(content));
  return languages;
}

module.exports = {
  processFile,
};
