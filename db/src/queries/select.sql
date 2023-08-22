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
  @name get_submission_ids
*/
select submissions.submission_id
from submissions
where
submissions.wallet_address = :wallet_address
order by (submission_id) desc;
