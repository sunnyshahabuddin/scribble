import axios from "axios";

const fetch = payload =>
  axios.get(
    `/api/admin/articles/?search_filter=${payload.search_filter}&status_filter=${payload.status_filter}&category_filter=${payload.category_filter}`
  );
const create = payload => axios.post("/api/admin/articles", payload);

const show = id => axios.get(`/api/admin/articles/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/api/admin/articles/${id}`, payload);

const destroy = id => axios.delete(`/api/admin/articles/${id}`);

const listPublishedArticles = payload =>
  axios.get(
    `/api/admin/articles/list_published/?page_number=${payload.page_number}`
  );

const articleVersions = id => axios.get(`/api/admin/articles/${id}/versions`);

const articlesApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  articleVersions,
  listPublishedArticles,
};

export default articlesApi;
