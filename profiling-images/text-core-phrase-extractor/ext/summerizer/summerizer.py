from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer

from sumy.summarizers.lsa import LsaSummarizer as LsaSummarizer                                                         # http://www.kiv.zcu.cz/~jstein/publikace/isim2004.pdf
from sumy.summarizers.luhn import LuhnSummarizer as LuhnSummarizer                                                      # https://ieeexplore.ieee.org/document/5392672?arnumber=5392672
from sumy.summarizers.lex_rank import LexRankSummarizer as LexRankSummarizer                                            # http://tangra.cs.yale.edu/~radev/si/lexrank/lexrank.pdf
from sumy.summarizers.text_rank import TextRankSummarizer as TextRankSummarizer                                         #
from sumy.summarizers.sum_basic import SumBasicSummarizer as SumBasicSummarizer                                         # http://www.cis.upenn.edu/~nenkova/papers/ipm.pdf
from sumy.summarizers.kl import KLSummarizer as KLSummarizer                                                            # http://www.aclweb.org/anthology/N09-1041

from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

import sys
import json

supportedLanguages = [
    ('en', 'english'),
    ('de', 'german'),
    ('cs', 'czech'),
    ('fr', 'french'),
    ('sk', 'slovak'),
    ('ja', 'japanese'),
    ('pt', 'portuguese'),
    ('es', 'spanish'),
]

LANGUAGE = [language for language in supportedLanguages if language[0] == sys.argv[2]][0][1]
SENTENCES_COUNT = sys.argv[3]

if __name__ == "__main__":

    summarizeResultList = []

    parser = PlaintextParser.from_file(sys.argv[1], Tokenizer(LANGUAGE))
    stemmer = Stemmer(LANGUAGE)


    # LSA
    lsa_result = []
    lsa_summarizer = LsaSummarizer(stemmer)
    lsa_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in lsa_summarizer(parser.document, SENTENCES_COUNT):
        lsa_result.append(str(sentence))

    summarizeResultList.append(('LSA', lsa_result))


    # Luhn
    luhn_result = []
    luhn_summarizer = LuhnSummarizer(stemmer)
    luhn_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in luhn_summarizer(parser.document, SENTENCES_COUNT):
        luhn_result.append(str(sentence))

    summarizeResultList.append(('Luhn', luhn_result))

    """
    # LexRank
    lex_result = []
    lex_summarizer = LexRankSummarizer(stemmer)
    lex_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in lex_summarizer(parser.document, SENTENCES_COUNT):
        lex_result.append(str(sentence))

    summarizeResultList.append(('LexRank', lex_result))


    # TextRank
    text_result = []
    text_summarizer = TextRankSummarizer(stemmer)
    text_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in text_summarizer(parser.document, SENTENCES_COUNT):
        text_result.append(str(sentence))


    # SumBasic
    sum_result = []
    sum_summarizer = SumBasicSummarizer(stemmer)
    sum_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in sum_summarizer(parser.document, SENTENCES_COUNT):
        sum_result.append(str(sentence))

    summarizeResultList.append(('SumBasic', sum_result))


    # KL
    kl_result = []
    kl_summarizer = KLSummarizer(stemmer)
    kl_summarizer.stop_words = get_stop_words(LANGUAGE)

    for sentence in kl_summarizer(parser.document, SENTENCES_COUNT):
        kl_result.append(str(sentence))

    summarizeResultList.append(('KL', kl_result))
    """

    json_string = json.dumps(summarizeResultList)
    print(json_string)
