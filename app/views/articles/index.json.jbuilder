json.array! @articles do |article|
  json.extract! article, :id, :title, :body, :slug, :category_id, :status
  json.category article.category, :id, :name
end
