const formatFetchedDataToInitialFormValue = article => ({
  title: article.title,
  body: article.body,
  category: { label: article.category.name, value: article.category.id },
  status: article.status,
});

const searchCategoryList = (categoryList, searchCategory) =>
  categoryList.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase().trim())
  );

const buildCategoryWiseArticle = category =>
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
const filterArticle = (article, filters) => {
  Object.keys(filters).forEach(key => {
    if (filters[key] === 0 || filters[key] === 1) {
      article = article.filter(item => item[key] === filters[key]);
    } else if (
      filters[key] &&
      typeof filters[key] === "object" &&
      filters[key].length > 0
    ) {
      article = article.filter(item => filters[key].includes(item[key]));
    }
  });

  return article;
};

const searchArticleList = (articles, searchArticleTitle) =>
  articles.filter(article =>
    article.title
      .toLowerCase()
      .includes(searchArticleTitle.toLowerCase().trim())
  );

const combineSideMenuFilterAndSearchResult = (
  sideMenuFilterResult,
  searchResult
) =>
  sideMenuFilterResult.filter(filterArticle =>
    searchResult.some(searchArticle => filterArticle.id === searchArticle.id)
  );

const utilityFunctions = {
  formatFetchedDataToInitialFormValue,
  searchCategoryList,
  buildCategoryWiseArticle,
  filterArticle,
  searchArticleList,
  combineSideMenuFilterAndSearchResult,
};

export default utilityFunctions;
