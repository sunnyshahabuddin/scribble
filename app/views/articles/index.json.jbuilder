# json.array! @articles do |article|
#   json.extract! article, :id, :title, :body, :slug, :category_id, :status
#   json.category article.category, :id, :name
# end
json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :slug, :category_id, :status
  json.category article.category, :id, :name
end
json.draft @articles.where(status: 0).count
json.published @articles.where(status: 1).count
