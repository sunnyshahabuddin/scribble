import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const update = (id, payload) => axios.put(`/categories/${id}`, payload);

const destroy = payload =>
  axios.delete(
    `/categories/${payload.category_id}?new_category_id=${payload.new_category_id}`
  );

const position_update = payload =>
  axios.put(`/categories/position_update`, payload);

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
  position_update,
};

export default categoriesApi;
