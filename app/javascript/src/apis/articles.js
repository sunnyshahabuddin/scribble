import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const show = id => axios.get(`/articles/${id}`);

const showWithSlug = slug => axios.get(`/articles/${slug}/show_with_slug`);

const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const destroy = id => axios.delete(`/articles/${id}`);

const batchUpdate = payload => axios.put("/articles/batch_update", payload);

const listPublishedArticles = () => axios.get("/articles/list_published");

const articleVersions = id => axios.get(`/articles/${id}/versions`);

const articlesApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  batchUpdate,
  showWithSlug,
  articleVersions,
  listPublishedArticles,
};

export default articlesApi;
