 # frozen_string_literal: true

 json.articles @category.articles.order("position ASC") do |article|
   json.extract! article, :id, :title, :body, :slug, :category_id, :status, :updated_at
   json.author article.user, :name
 end
