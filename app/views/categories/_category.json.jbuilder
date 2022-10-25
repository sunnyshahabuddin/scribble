json.extract! category, :id, :name
json.articles category.articles, :id, :title, :body, :slug, :category_id, :status
json.author category.user, :name
