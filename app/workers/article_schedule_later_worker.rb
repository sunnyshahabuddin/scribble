 # frozen_string_literal: true

 class ArticleScheduleLaterWorker
   include Sidekiq::Worker
   sidekiq_options queue: :default, retry: 10

   def perform
     articles = Article.select { |article|
 (article.publish_at.present? && article.publish_at <= Time.zone.now) ||
  (article.unpublish_at.present? && article.unpublish_at <= Time.zone.now) }

     articles.each do |article|
       article_schedule_later_service = Api::Admin::ArticleScheduleLaterService.new(article)
       article_schedule_later_service.process
     end
   end
 end
