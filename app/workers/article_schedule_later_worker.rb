 # frozen_string_literal: true

 class ArticleScheduleLaterWorker
   include Sidekiq::Worker
   sidekiq_options queue: :default, retry: 10

   def perform
     schedules = Schedule.select { |schedule|
 (schedule.publish_at.present? && schedule.publish_at <= Time.zone.now) ||
  (schedule.unpublish_at.present? && schedule.unpublish_at <= Time.zone.now) }

     schedules.each do |schedule|
       article = Article.find(schedule.article_id)
       article_schedule_later_service = Api::Admin::ArticleScheduleLaterService.new(schedule, article)
       article_schedule_later_service.process
     end
   end
 end
