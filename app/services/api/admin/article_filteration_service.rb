 # frozen_string_literal: true

 class Api::Admin::ArticleFilterationService
   attr_reader :articles, :search_filter, :status_filter, :category_filter

   def initialize(articles, search_filter, status_filter, category_filter)
     @articles = articles
     @search_filter = search_filter
     @status_filter = status_filter
     @category_filter = category_filter
   end

   def process
     @articles = @articles.all
     @articles = filter_by_status if status_filter.present?
     @articles = filter_by_search if search_filter.present?
     @articles = filter_by_category if category_filter.present?

     articles
   end

   private

     def filter_by_search
       articles.select do |article|
          article.title.downcase.include?(search_filter.downcase)
        end
     end

     def filter_by_status
       articles.where(status: status_filter)
     end

     def filter_by_category
       articles.select do |article|
        category_filter.include?(article.category_id.to_s)
      end
     end
 end
