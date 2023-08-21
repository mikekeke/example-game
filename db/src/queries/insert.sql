/* 
  @name insert_submission
*/
INSERT INTO submissions (
  user_address,
  symbols,
  guess,
  is_success
) VALUES (
  :user_address!,
  :symbols!,
  :guess!,
  :is_success!
) 
ON CONFLICT (user_address)
DO UPDATE SET 
symbols = EXCLUDED.symbols,
guess = EXCLUDED.guess,
is_success = EXCLUDED.is_success 
;