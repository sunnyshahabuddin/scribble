import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const show = slug => axios.get(`/articles/${slug}`);

const update = ({ slug, payload }) => axios.put(`/articles/${slug}`, payload);

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = { fetch, create, show, update, destroy };

export default articlesApi;
