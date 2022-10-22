export const formatFetchedDataToInitialFormValue = article => ({
  title: article.title,
  body: article.body,
  category: { label: article.category.name, value: article.category.id },
  status: article.status,
});

export const searchCategoryList = (categoryList, searchCategory) =>
  categoryList.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase().trim())
  );
export const searchArticleList = (articleList, searchArticle) =>
  articleList.filter(article =>
    article.title.toLowerCase().includes(searchArticle.toLowerCase().trim())
  );
export const buildCategoryWiseArticle = category =>
  category.articles.map(article => ({
    ...article,
    category: {
      id: category.id,
      name: category.name,
    },
    author: {
      name: category.author.name,
    },
  }));
