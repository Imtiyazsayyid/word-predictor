import numpy as np
import pickle
from keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import sys


modelName = sys.argv[1]
inputText = sys.argv[2]

# Load the LSTM Model
model = load_model(f"{modelName}.h5", compile=False)  # Avoid loading with an invalid compile state
model.compile(optimizer='adam', loss='categorical_crossentropy')  # Explicitly compile

# print(model)

# Load the tokenizer
with open(f'{modelName}-tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Function to predict the next word
def predict_next_word(model, tokenizer, text, max_sequence_len):
    token_list = tokenizer.texts_to_sequences([text])[0]
    if len(token_list) >= max_sequence_len:
        token_list = token_list[-(max_sequence_len-1):]  # Ensure the sequence length matches max_sequence_len-1
    token_list = pad_sequences([token_list], maxlen=max_sequence_len-1, padding='pre')
    predicted = model.predict(token_list, verbose=0)
    predicted_word_index = np.argmax(predicted, axis=1)[0]  # Extract scalar value from array
    for word, index in tokenizer.word_index.items():
        if index == predicted_word_index:
            return word
    return None


def generate(input_text):
    max_sequence_len = model.input_shape[1] + 1  # Retrieve the max sequence length from the model input shape
    next_word = predict_next_word(model, tokenizer, input_text, max_sequence_len)
    return next_word
    # print(f'Next word: {next_word}')


# input_text = st.text_input("Enter the sequence of Words", "To be or not to")
# "Barnardo. Who's"
word = generate(inputText)
print(word)
# print(word)
sys.stdout.flush()