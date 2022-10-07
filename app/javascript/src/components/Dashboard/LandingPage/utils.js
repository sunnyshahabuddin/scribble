export const formatFetchedDataToInitialFormValue = article => ({
  title: article.title,
  body: article.body,
  category: article.category.id,
  status: article.status,
});

export const searchCategoryList = (categoryList, searchCategory) =>
  categoryList.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );
