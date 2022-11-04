 # frozen_string_literal: true

 json.article_versions @article_versions do |article|
   if article.object && Category.where(id: article.object["category_id"]).present?
     json.category Category.find(article.object["category_id"]).name
   end
   json.extract! article, :id, :object
 end
