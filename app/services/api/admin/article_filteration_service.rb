 # frozen_string_literal: true

 class Api::Admin::ArticleFilterationService
   attr_reader :current_user, :search_filter, :status_filter, :category_filter

   def initialize(current_user, search_filter, status_filter, category_filter)
     @current_user = current_user
     @search_filter = search_filter
     @status_filter = status_filter
     @category_filter = category_filter
   end

   def process
     articles = current_user.articles
     articles = filter_by_status if status_filter.present?
     articles = filter_by_category if category_filter.present?
     articles = filter_by_search if search_filter.present?

     articles
   end

   private

     def filter_by_search
       current_user.articles.where("title iLIKE ?", "%#{search_filter}%")
     end

     def filter_by_status
       current_user.articles.where(status: status_filter)
     end

     def filter_by_category
       current_user.articles.where(category_id: category_filter.split(",").map(&:to_i))
     end
 end
