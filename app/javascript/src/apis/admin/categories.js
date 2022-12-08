import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");

const create = payload => axios.post("/api/admin/categories", payload);

const update = (id, payload) =>
  axios.put(`/api/admin/categories/${id}`, payload);

const destroy = payload =>
  axios.delete(`/api/admin/categories/${payload.categoryId}`, {
    params: {
      new_category_id: payload.newCategoryId,
    },
  });

const positionUpdate = payload =>
  axios.put(`/api/admin/categories/${payload.id}/position_update`, payload);

const show = id => axios.get(`/api/admin/categories/${id}`);

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
  show,
  positionUpdate,
};

export default categoriesApi;
