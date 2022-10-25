json.articles @articles do |article|
  json.partial! "articles/article", article: article
  json.author article.user, :name
end
