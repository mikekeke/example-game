/* 
  @name insert_submission
*/
INSERT INTO submissions (
  wallet_address,
  symbols,
  guess,
  is_success
) VALUES (
  :wallet_address!,
  :symbols!,
  :guess!,
  :is_success!
);

/* 
  @name init_achievements
*/
INSERT INTO achievements (
  contract_address,
  nft_id
) VALUES (
  :contract_address!,
  :nft_id!
);