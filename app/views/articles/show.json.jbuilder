# frozen_string_literal: true

json.extract! @article, :id, :title, :body, :slug, :status
json.category @article.category, :id, :name
