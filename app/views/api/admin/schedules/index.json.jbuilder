 # frozen_string_literal: true

 json.schedules @schedules do |schedule|
   if schedule.publish_at.present? || schedule.unpublish_at.present?
     json.extract! schedule, :id, :publish_at, :unpublish_at, :article_id
     json.title Article.find(schedule.article_id).title
   end
 end
