import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");

const create = payload => axios.post("/api/admin/categories", payload);

const update = (id, payload) =>
  axios.put(`/api/admin/categories/${id}`, payload);

const destroy = payload =>
  axios.delete(
    `/api/admin/categories/${payload.categoryId}?new_category_id=${payload.newCategoryId}`
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
