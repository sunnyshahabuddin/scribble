 # frozen_string_literal: true

 class ArticleScheduleLaterWorker
   include Sidekiq::Worker
   sidekiq_options queue: :default, retry: 10

   def perform
     articles = Article.select { |article| article.schedule_at.present? && article.schedule_at <= Time.zone.now }

     articles.each do |article|
       puts article.schedule_at
       article_schedule_later_service = Api::Admin::ArticleScheduleLaterService.new(article.id, article.schedule_status)
       article_schedule_later_service.process
     end
   end
 end
