# frozen_string_literal: true

json.extract! @article, :id, :title, :body, :slug, :id
json.category @article.category, :id, :name
