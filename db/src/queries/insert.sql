/* 
  @name insert_submission
*/
INSERT INTO submissions (
  user_address,
  symbols,
  guess
) VALUES (
  :user_address!,
  :symbols!,
  :guess!
);