#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

generate_random_number() {
  echo $((RANDOM % 1000 + 1))
}

# Prompt the user for a username
echo "Enter your username:"
read USERNAME

USERNAME_AVAILABLE=$($PSQL "SELECT username FROM users WHERE username='$USERNAME'")
GAMES_PLAYED=$($PSQL "SELECT COUNT(*) FROM users INNER JOIN games USING(user_id) WHERE username = '$USERNAME'")
BEST_GAME=$($PSQL "SELECT MIN(number_guesses) FROM users INNER JOIN games USING(user_id) WHERE username = '$USERNAME'")

if [[ -z $USERNAME_AVAILABLE ]]; then
  INSERT_USER=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  echo "Welcome, $USERNAME! It looks like this is your first time here."
else
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

SECRET_NUMBER=$(generate_random_number)
# echo "Secret number: $SECRET_NUMBER"

# Main game loop
number_of_guesses=0
while true; do
  echo "Guess the secret number between 1 and 1000:"
  read USER_GUESS
  # Validate input (numeric value)
  if ! [[ "$USER_GUESS" =~ ^[0-9]+$ ]]; then
    echo "That is not an integer, guess again:"
    continue
  fi

  ((number_of_guesses++))

  # Check if the guess is correct, too low, or too high
  if [ "$USER_GUESS" -eq "$SECRET_NUMBER" ]; then
    echo "You guessed it in $number_of_guesses tries. The secret number was $SECRET_NUMBER. Nice job!"
    break
  elif [ "$USER_GUESS" -lt "$SECRET_NUMBER" ]; then
    echo "It's higher than that, guess again:"
  else
    echo "It's lower than that, guess again:"
  fi
done

USER_ID=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME'")
INSERT_GAME=$($PSQL "INSERT INTO games(number_guesses, user_id) VALUES($number_of_guesses, $USER_ID)")
