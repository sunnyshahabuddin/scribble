# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "api/admin/articles/article", article: article
  json.author article.user, :name
  json.visits article.visits_count
  json.date_wise_visits article.visits.group("DATE(created_at)").size
end
