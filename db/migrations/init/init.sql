CREATE TABLE submissions (
  submission_id SERIAL,
  wallet_address TEXT NOT NULL,
  symbols TEXT NOT NULL,
  guess TEXT NOT NULL,
  is_success BOOLEAN NOT NULL,
  PRIMARY KEY (submission_id, wallet_address)
);