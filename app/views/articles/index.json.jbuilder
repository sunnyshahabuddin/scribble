json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :slug, :category_id, :status, :updated_at
  json.category article.category, :id, :name
  json.author article.user, :name
end

json.draftArticles @articles do |article|
  if article.status == 0
    json.extract! article, :id, :title, :body, :slug, :category_id, :status
    json.category article.category, :id, :name
    json.author article.user, :name
  end
end

json.publishedArticles @articles do |article|
  if article.status == 1
    json.extract! article, :id, :title, :body, :slug, :category_id, :status
    json.category article.category, :id, :name
    json.author article.user, :name
  end
end
