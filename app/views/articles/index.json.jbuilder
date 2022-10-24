# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "articles/article", article: article
  json.author article.user, :name
end

json.draftArticles @articles do |article|
  if article.status == 0
    json.partial! "articles/article", article: article
    json.author article.user, :name
  end
end

json.publishedArticles @articles do |article|
  if article.status == 1
    json.partial! "articles/article", article: article
    json.author article.user, :name
  end
end
