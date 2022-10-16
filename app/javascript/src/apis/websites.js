import axios from "axios";

const fetch = () => axios.get("/websites");

const update = (id, payload) => axios.put(`/websites/${id}`, payload);

const login = payload => axios.post("/websites", payload);

const websitesApi = {
  fetch,
  update,
  login,
};

export default websitesApi;
