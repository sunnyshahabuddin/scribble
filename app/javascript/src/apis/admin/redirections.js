import axios from "axios";

const fetch = () => axios.get("/api/admin/redirections");

const create = payload => axios.post("/api/admin/redirections", payload);

const update = (id, payload) =>
  axios.put(`/api/admin/redirections/${id}`, payload);

const destroy = id => axios.delete(`/api/admin/redirections/${id}`);

const redirectionsApi = { fetch, create, update, destroy };

export default redirectionsApi;
