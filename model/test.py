import nltk
nltk.download('gutenberg')
from nltk.corpus import gutenberg

availableTexts = gutenberg.fileids()
## load the dataset

for file in availableTexts:
    data=gutenberg.raw(file)

    with open(file,'w') as file:
        file.write(data)    


## save to a file
