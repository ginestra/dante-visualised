import json
import os
# import re
import string

# https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files

pathToFile = "../texts/Inferno/Petrocchi/"
line_number = 0
tercet_number = 1
last_word_odd = ""
last_word_even = ""
rhyme_length = 0

# Helper to remove punctuation
translator = str.maketrans('', '', string.punctuation)

# Loop over files in texts directory
for root, dirs, files in os.walk(pathToFile):
    for file in files:
        if file.endswith(".txt"):

            with open(pathToFile + file) as cantoI:
                lines = []

                # Array for tercets
                tercets = []

                # print("Tercet #", tercet_number)
                for line in cantoI:
                    '''
                    If the line is not blank, assign a line number,
                    otherwise print an empty line to separate tercets
                    '''
                    if line.strip():
                        line_number += 1

                        # Store the last word in the line
                        words = line.split()
                        last_word = words[-1]

                        '''
                        Replacing special characters that are not included
                        in string.punctuation (TODO: Needs improvement)
                        Convert to lowercase for good measure
                        and removed punctuation at the end of the line
                        last_word = last_word.replace('»', '')
                        '''
                        last_word = last_word.lower().translate(translator)

                        # Matching last part of the line / Needs improvement
                        # rhyme = "".join(re.findall(r"\w", last_word[-3:], re.U))

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
                                    # print(last_word[::-1])
                                    rhyme_length = len(
                                        set(last_word[::-1]) &
                                        set(last_word_odd[::-1]))
                                else:
                                    # It's a new rhyme, store it
                                    last_word_odd = last_word
                                    # print(last_word[::-1])

                            # It must be the first line and there is no word
                            # stored yet
                            else:
                                last_word_odd = last_word
                                print(last_word[::-1])

                            current_line = {
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
                                    # print(last_word[::-1])
                                    rhyme_length = len(
                                        set(last_word[::-1]) &
                                        set(last_word_even[::-1]))
                                else:
                                    # It's a new rhyme, store it
                                    last_word_even = last_word
                                    # print(last_word[::-1])

                            # It must be the first line and there is no word
                            #vstored yet
                            else:
                                last_word_even = last_word
                                # print(last_word[::-1])

                            current_line = {
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

                        # TODO: clean what gets added to the tercets
                        # TODO: create array for tercets
            #             if (line_number % 3 == 0):
            #                 tercets.append(lines)
            #                 lines.clear()
            #                 lines.append(current_line)
            #             else:
                        tercets.append(current_line)

                    else:
                        tercet_number += 1
                        # print("")
                        # print("Tercet #", tercet_number)

                # print("\nNumber of lines: ", line_number)
                steps = line_number

            json_obj = {
                "title": "La Divina Commedia",
                "author": "Dante Alighier",
                "year": "1308-1320",
                "lang": "IT",
                "cantica": [
                    {
                        "title": "Inferno",
                        "canto": [
                            {
                                "number": 1,
                                "title": "Canto I",
                                "tercet": [
                                    {
                                        "number": 1,
                                        "lines": tercets
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }

# Generate JSON file
with open("json_sample.json", "a+") as json_sample:
    json.dump(json_obj, json_sample, indent=4)
