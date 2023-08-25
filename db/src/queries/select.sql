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


/* 
  @name get_achievements_by_owned
  @param nft_ids -> (...)
*/
select * from achievements
where nft_id in :nft_ids
order by nft_id;

/*
 @name wins_count
*/
select count(*)
from submissions
where
wallet_address = :wallet_address
and is_success is TRUE;