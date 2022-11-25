 # frozen_string_literal: true

 class ArticleScheduleLaterWorker
   include Sidekiq::Worker
   sidekiq_options queue: :default, retry: 10

   def perform(id, schedule_status)
     article_schedule_later_service = Api::Admin::ArticleScheduleLaterService.new(id, schedule_status)
     article_schedule_later_service.process
   end
 end
