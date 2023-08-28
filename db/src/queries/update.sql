/* 
  @name update_achievements
*/
UPDATE achievements 
SET record = :record!
WHERE nft_id = :nft_id!;