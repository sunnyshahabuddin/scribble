export const findDefaultPath = (categoryList, setDefaultPath) => {
  const defaultCategory = categoryList.find(
    category => category.publishedArticles.length !== 0
  );
  setDefaultPath(defaultCategory.publishedArticles[0].slug);
};

export const findActiveArticleIndex = (categoryList, setActiveArticleIndex) => {
  let isSlugPresent = false;
  categoryList.forEach((category, index) =>
    category.publishedArticles.filter(article => {
      const pathName = window.location.pathname.split("/");
      const slugMatched = article.slug === pathName[pathName.length - 1];
      if (slugMatched) {
        isSlugPresent = true;
        setActiveArticleIndex(index);
      }
    })
  );
  if (!isSlugPresent && window.location.pathname !== "/public") {
    setActiveArticleIndex(-1);
  }
};
