import axios from "axios";

const fetch = () => axios.get("/websites");

const update = (id, payload) => axios.put(`/websites/${id}`, payload);

const websitesApi = {
  fetch,
  update,
};

export default websitesApi;
