import axios from "axios";

const fetch = payload =>
  axios.get(
    `/api/admin/articles/?search_filter=${payload.searchFilter}&status_filter=${payload.statusFilter}&category_filter=${payload.categoryFilter}&page_number=${payload.pageNumber}`
  );
const create = payload => axios.post("/api/admin/articles", payload);

const show = id => axios.get(`/api/admin/articles/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/api/admin/articles/${id}`, payload);

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const listPublishedArticles = payload =>
  axios.get(
    `/api/admin/articles/list_published/?page_number=${payload.pageNumber}`
  );

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
  listPublishedArticles,
};

export default articlesApi;
