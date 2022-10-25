# frozen_string_literal: true

json.categories @categories do |category|
  json.partial! "category", category: category
  json.publishedArticles category.articles.where(status: 1), :title, :slug, :body
end
