-- Create the teams table
CREATE TABLE teams (
    team_id serial PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

-- Create the games table
CREATE TABLE games (
    game_id serial PRIMARY KEY,
    year INT,
    round VARCHAR(255),
    winner_id INT REFERENCES teams(team_id),
    opponent_id INT REFERENCES teams(team_id),
    winner_goals INT,
    opponent_goals INT
);
