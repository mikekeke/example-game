CREATE TABLE submissions (
  submission_id SERIAL,
  wallet_address TEXT NOT NULL,
  symbols TEXT NOT NULL,
  guess TEXT NOT NULL,
  is_success BOOLEAN NOT NULL,
  PRIMARY KEY (submission_id, wallet_address)
);

CREATE TABLE achievements (
  nft_id TEXT PRIMARY KEY,
  contract_address TEXT NOT NULL,
  achievements TEXT [] default array[]::text[] NOT NULL
);
