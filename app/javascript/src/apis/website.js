import axios from "axios";

const show = () => axios.get("/website");

const update = payload => axios.put("/website", payload);

const login = payload => axios.post("/website", payload);

const websiteApi = {
  show,
  update,
  login,
};

export default websiteApi;
