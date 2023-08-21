/* 
  @name get_submission
*/
select 
submissions.user_address,
submissions.symbols,
submissions.guess,
submissions.is_success
from submissions
where submissions.user_address = :address;