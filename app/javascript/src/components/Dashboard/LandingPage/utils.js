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

const utilityFunctions = {
  formatFetchedDataToInitialFormValue,
  searchCategoryList,
};

export default utilityFunctions;
