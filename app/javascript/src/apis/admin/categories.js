import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");

const create = payload => axios.post("/api/admin/categories", payload);

const update = (id, payload) =>
  axios.put(`/api/admin/categories/${id}`, payload);

const destroy = payload =>
  axios.delete(
    `/api/admin/categories/${payload.category_id}?new_category_id=${payload.new_category_id}`
  );

const position_update = payload =>
  axios.put(`/api/admin/categories/position_update`, payload);

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
  position_update,
};

export default categoriesApi;
