import axios from "axios";

const fetch = () => axios.get("/api/public/articles");

const show = slug => axios.get(`/api/public/articles/${slug}`);

const articlesApi = {
  fetch,
  show,
};

export default articlesApi;
