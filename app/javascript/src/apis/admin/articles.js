import axios from "axios";

const fetch = payload =>
  axios.get("/api/admin/articles", {
    params: {
      search_filter: payload.searchFilter,
      status_filter: payload.statusFilter,
      category_filter: payload.categoryFilter,
      page_number: payload.pageNumber,
    },
  });

const create = payload => axios.post("/api/admin/articles", payload);

const show = id => axios.get(`/api/admin/articles/${id}`);

const positionUpdate = payload =>
  axios.put(`/api/admin/articles/${payload.id}/position_update`, payload);

const moveArticles = payload =>
  axios.put(`/api/admin/articles/move_articles`, {
    article_ids: payload.articleIds,
    category_id: payload.categoryId,
  });

const update = ({ id, payload }) =>
  axios.put(`/api/admin/articles/${id}`, {
    article: {
      title: payload.title,
      body: payload.body,
      status: payload.status,
      category_id: payload.categoryId,
      restored_at: payload.restoredAt,
    },
  });

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const listPublishedArticles = payload =>
  axios.get("/api/admin/articles/list_published", {
    params: {
      page_number: payload.pageNumber,
    },
  });

const articleVersions = id => axios.get(`/api/admin/articles/${id}/versions`);

const totalCount = () => axios.get("/api/admin/articles/total_count");

const articlesApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  totalCount,
  articleVersions,
  positionUpdate,
  listPublishedArticles,
  moveArticles,
};

export default articlesApi;
