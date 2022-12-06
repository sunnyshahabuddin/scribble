 # frozen_string_literal: true

 json.articles @category.articles do |article|
   json.extract! article, :id, :title, :body, :slug, :category_id, :status, :updated_at
   json.author article.user, :name
 end
