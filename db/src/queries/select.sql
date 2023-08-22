/* 
  @name get_submission
*/
select 
*
from submissions
where 
submissions.wallet_address = :wallet_address
and submissions.submission_id = :submission_id;

/* 
  @name submission_data
*/
select 
  submissions.submission_id,
  submissions.symbols
from submissions
where
submissions.wallet_address = :wallet_address
order by (submission_id) desc;
