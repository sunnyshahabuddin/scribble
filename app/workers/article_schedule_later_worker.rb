 # frozen_string_literal: true

 class ArticleScheduleLaterWorker
   include Sidekiq::Worker
   sidekiq_options queue: :default, retry: 10

   def perform
     publish_later_schedules = Schedule.select { |schedule|
        (schedule.publish_at.present? && schedule.publish_at <= Time.zone.now) }

     unpublish_later_schedules = Schedule.select { |schedule|
        (schedule.unpublish_at.present? && schedule.unpublish_at <= Time.zone.now) }

     publish_later_schedules.each do |schedule|
         article_schedule_later_service = Api::Admin::ArticlePublishLaterService.new(article(schedule))
         article_schedule_later_service.process
       end

     unpublish_later_schedules.each do |schedule|
       article_schedule_later_service = Api::Admin::ArticleUnpublishLaterService.new(article(schedule))
       article_schedule_later_service.process
     end
  end

   private

     def article(schedule)
       Article.find(schedule.article_id)
     end
 end
