import axios from "axios";

const show = () => axios.get("/organization");

const update = payload => axios.put("/organization", payload);

const login = payload => axios.post("/organization", payload);

const organizationApi = {
  show,
  update,
  login,
};

export default organizationApi;
