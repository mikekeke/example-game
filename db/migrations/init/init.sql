CREATE TABLE submissions (
  user_address TEXT PRIMARY KEY,
  symbols TEXT NOT NULL,
  guess TEXT NOT NULL,
  is_success BOOLEAN NOT NULL
);