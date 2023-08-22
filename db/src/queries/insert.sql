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