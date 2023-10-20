#!/bin/bash

# Set the PSQL variable based on the environment
if [[ $1 == "test" ]]; then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Ensure team names are unique by adding a constraint
$PSQL "ALTER TABLE teams ADD CONSTRAINT teams_name_unique UNIQUE (name)"

# Truncate both tables before inserting data
echo $($PSQL "TRUNCATE TABLE games, teams")

# Read data from the CSV file and insert it into the tables
cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_G OPPONENT_G; do
  # Skip the header row
  if [[ $YEAR == "year" ]]; then
    continue
  fi

  # Insert team names into the teams table, ensuring they are unique
  $PSQL "INSERT INTO teams(name) VALUES ('$WINNER') ON CONFLICT (name) DO NOTHING"
  $PSQL "INSERT INTO teams(name) VALUES ('$OPPONENT') ON CONFLICT (name) DO NOTHING"

  # Retrieve the team IDs
  WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
  OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

  # Insert game data into the games table
  $PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ('$YEAR', '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_G, $OPPONENT_G)"
done

echo "Data insertion completed."
