#!/bin/bash

# Define the command without spaces around the assignment
createSQL="pg_dump -cC --inserts -U freecodecamp number_guess > number_guess.sql"

# Execute the command
eval "$createSQL"
