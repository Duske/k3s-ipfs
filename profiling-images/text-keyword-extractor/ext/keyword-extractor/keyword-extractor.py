import sys
import json

from multi_rake import Rake

result = []

# load text into memory
file_object = open(sys.argv[1], 'r')
text = file_object.read()

# initialize RAKE (Multi-RAKE)
rake = Rake(
    min_chars=3,
    max_words=1,
    min_freq=1,
    language_code=sys.argv[2],
    stopwords=None,  # {'and', 'of'}
    lang_detect_threshold=50,
    max_words_unknown_lang=2,
    generated_stopwords_percentile=80,
    generated_stopwords_max_len=3,
    generated_stopwords_min_freq=2,
)


keywords_scores_rake = rake.apply(text)                 # Apply Multi-Rake to text
keywords_rake = [x[0] for x in keywords_scores_rake]    # create variable with removed scores for further processing

if sys.argv[2] == 'de':

    from KeywordReasoner.KeywordReasonerGerman import KeywordReasonerGerman
    result = KeywordReasonerGerman(keywords_rake, text, int(sys.argv[3]))

elif sys.argv[2] == 'en':
    from KeywordReasoner.KeywordReasonerEnglish import KeywordReasonerEnglish
    result = KeywordReasonerEnglish(keywords_rake, text, int(sys.argv[3]))


json_string = json.dumps(result)
print(json_string)