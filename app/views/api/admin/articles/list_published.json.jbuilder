# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "api/admin/articles/article", article: article
  json.author article.user, :name
  json.visits article.visits.sum(:visits)
  json.date_wise_visits article.visits.group("DATE(created_at)").sum(:visits)
end
