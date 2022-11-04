# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :id, :title, :body, :slug, :category_id, :status, :updated_at, :visits
  json.category article.category, :id, :name
  json.author article.user, :name
end
