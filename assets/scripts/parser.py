import json, nltk, os, re, string
from nltk import RegexpTokenizer

# Settings
title = "La Divina Commedia"
author = "Dante Alighier"
year = "1308-1320"
lang = "it"
cantica = "Inferno"

pathToFile = "texts/" + lang + "/" + cantica + "/"
tercet_number = 1
last_word_odd = ""
last_word_even = ""
rhyme_length = 0
canto_num = 0

# Helper to remove punctuation
tokenizer = RegexpTokenizer(r'\w+')

'''
Loop over files in texts directory
Docs: https://docs.python.org/3/tutorial/inputoutput.html\
#reading-and-writing-files
'''
for root, dirs, files in os.walk(pathToFile):
    cantos = []
    for file in sorted(files):

        # Reset line and tercet number at the beginning of each canto
        line_number = 0
        tercet_number = 1

        if file.endswith(".txt"):

            with open(pathToFile + file) as canto:
                lines = []

                for line in canto:
                    '''
                    If the line is not blank, assign a line number,
                    otherwise print an empty line to separate tercets
                    '''
                    if line.strip():
                        line_number += 1

                        '''
                        Split words and store the last one with no punctuation
                        '''
                        words = line.split()
                        last_word = tokenizer.tokenize(words[-1])
                        if last_word:
                            last_word = last_word[-1]

                        '''
                        Storing alternate rhymes for odd and even lines
                        Storying last_word for odd and even lines too
                        Odd lines first
                        '''
                        if (line_number % 2 != 0):
                            if (len(last_word_odd) != 0):
                                '''
                                Check how many chars are equal and in the same
                                position
                                This DOESN'T verify if the end of the word is
                                where the match happens
                                TODO: fix it
                                '''
                                if (len(set(last_word[::-1]) &
                                        set(last_word_odd[::-1])) >= 2):
                                    rhyme_length = len(
                                        set(last_word[::-1]) &
                                        set(last_word_odd[::-1]))
                                else:
                                    # It's a new rhyme, store it
                                    last_word_odd = last_word

                            # It must be the first line and there is no word
                            # stored yet
                            else:
                                last_word_odd = last_word

                            current_line = {
                                "tercet_number": tercet_number,
                                "line_number": line_number,
                                "text": line,
                                "chars": len(line),
                                "last_word": last_word,
                                "rhyme_length": rhyme_length,
                                # This should be based on the word we are
                                # passing not on a fix 3 chars
                                # TODO: improve
                                "rhyme": last_word[-3:],
                                # TODO: Create authority list for colour scheme
                                # Last letter for           R
                                # Second to last letter for G
                                # Third to last letter for  B
                                "color": "rgba(162, 63, 234, 1)"
                            }

                        # Even lines now
                        else:
                            if (len(last_word_even) != 0):
                                '''
                                Check how many chars are equal and in the same
                                position
                                This DOESN'T verify if the end of the word is
                                where the match happens
                                TODO: fix it
                                '''
                                if (len(set(last_word[::-1]) &
                                        set(last_word_even[::-1])) >= 2):
                                    rhyme_length = len(
                                        set(last_word[::-1]) &
                                        set(last_word_even[::-1]))
                                else:
                                    # It's a new rhyme, store it
                                    last_word_even = last_word

                            # It must be the first line and there is no word
                            # stored yet
                            else:
                                last_word_even = last_word

                            current_line = {
                                "tercet_number": tercet_number,
                                "line_number": line_number,
                                "text": line,
                                "chars": len(line),
                                "last_word": last_word,
                                "rhyme_length": rhyme_length,
                                # This should be based on the word we are
                                # passing not on a fix 3 chars
                                # TODO: improve
                                "rhyme": last_word[-3:],
                                # TODO: Create authority list for colour scheme
                                # Last letter for           R
                                # Second to last letter for G
                                # Third to last letter for  B
                                "color": "rgba(162, 63, 234, 1)"
                            }

                        lines.append(current_line)

                    else:
                        tercet_number += 1

                title_num = convert_to_roman(canto_num)

                current_canto = {
                    "number": canto_num,
                    "title": "Canto " + title_num,
                    "lines": lines
                }

                cantos.append(current_canto)

        # Array for cantos
        canto_num += 1


# Initiate the file structure out of any loop
json_obj = {
    "title": title,
    "author": author,
    "year": year,
    "lang": lang,
    "cantica": [
        {
            "title": cantica,
            "canto": cantos
        }
    ]
}

# Generate JSON file
with open("json_" + cantica.lower() + "_/" +
          lang + ".json", "w") as json_cantica:
    json.dump(json_obj, json_cantica, indent=4)
