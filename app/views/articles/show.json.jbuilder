json.extract! @article, :id, :title, :body, :slug
json.category @article.category, :id, :name
