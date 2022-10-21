import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const show = id => axios.get(`/articles/${id}`);

const update = ({ id, payload }) => axios.put(`/articles/${id}`, payload);

const destroy = id => axios.delete(`/articles/${id}`);

const batchUpdate = payload => axios.put("/articles/batch_update", payload);

const articlesApi = { fetch, create, show, update, destroy, batchUpdate };

export default articlesApi;
