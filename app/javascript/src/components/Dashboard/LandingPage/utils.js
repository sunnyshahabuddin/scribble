export const formatFetchedDataToInitialFormValue = article => ({
  title: article.title,
  body: article.body,
  category: article.category.id,
  status: article.status,
});
