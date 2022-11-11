import React, { useState, useEffect } from "react";

import { PageLoader, Pagination } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/admin/articles";
import categoriesApi from "apis/admin/categories";

import ActionBlock from "./ActionBlock";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";
import { INITIAL_CHECKED_LIST } from "./Table/utils";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [checkedColumn, setCheckedColumn] = useState(INITIAL_CHECKED_LIST);
  const [searchArticleTitle, setSearchArticleTitle] = useState("");
  const [currentTablePageNumber, setCurrentTablePageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState({});
  const [articleFilters, setArticleFilters] = useState({
    status: "",
    category_id: [],
  });

  useEffect(() => {
    fetchArticlesCategories();
  }, [articleFilters, searchArticleTitle, currentTablePageNumber]);

  const fetchArticlesCategories = async () => {
    const payload = {
      searchFilter: searchArticleTitle,
      statusFilter: articleFilters.status,
      categoryFilter: articleFilters.category_id,
      pageNumber: currentTablePageNumber,
    };
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch(payload);
      const { data } = await articlesApi.totalCount();
      setTotalCount({
        all: data.all,
        published: data.published,
        draft: data.draft,
      });
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckedColumn = checkedIndex => {
    const checkedList = INITIAL_CHECKED_LIST;
    const checkedItem = checkedList[checkedIndex];
    checkedItem.checked = !checkedItem.checked;
    setCheckedColumn([...checkedList]);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <SideMenuBar
        articleFilters={articleFilters}
        categoryList={categoryList}
        refetch={fetchArticlesCategories}
        setArticleFilters={setArticleFilters}
        setArticles={setArticles}
        totalCount={totalCount}
      />
      <Container>
        <ActionBlock
          categoryList={categoryList}
          checkedColumn={checkedColumn}
          handleCheckedColumn={handleCheckedColumn}
          searchArticleTitle={searchArticleTitle}
          setSearchArticleTitle={setSearchArticleTitle}
        />
        <Table articles={articles} refetch={fetchArticlesCategories} />
        <div className="flex w-full justify-end">
          <Pagination
            className="mt-4"
            count={totalCount.all}
            navigate={pageNumber => setCurrentTablePageNumber(pageNumber)}
            pageNo={currentTablePageNumber}
            pageSize={10}
          />
        </div>
      </Container>
    </div>
  );
};
export default LandingPage;
