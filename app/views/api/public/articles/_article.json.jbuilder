# frozen_string_literal: true

json.extract! article, :id, :title, :body, :slug, :category_id, :status, :updated_at
json.category article.category, :id, :name
