import axios from "axios";

const show = () => axios.get("/api/admin/organization");

const update = payload =>
  axios.put("/api/admin/organization", { organization: payload });

const login = payload => axios.post("/api/admin/organization", payload);

const organizationApi = {
  show,
  update,
  login,
};

export default organizationApi;
