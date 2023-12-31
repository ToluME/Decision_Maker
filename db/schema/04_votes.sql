-- Drop and recreate Votes table
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id SERIAL NOT NULL,
  choice_id INTEGER REFERENCES choices(id),
  voter_name VARCHAR(255) NOT NULL,
  rank INTEGER NOT NULL
);
