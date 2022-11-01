# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category, :id, :name
  json.articles category.articles, :id, :title, :body, :slug, :category_id, :status
  json.author category.user, :name
  json.publishedArticles category.articles.where(status: 1).order("created_at"), :title, :slug, :body
end
