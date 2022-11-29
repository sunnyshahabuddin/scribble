import axios from "axios";

const create = payload =>
  axios.post("/api/admin/schedules", {
    publish_at: payload.publishAt,
    unpublish_at: payload.unpublishAt,
    article_id: payload.articleId,
  });

const update = ({ id, payload }) =>
  axios.put(`/api/admin/schedules/${id}`, {
    publish_at: payload.publishAt,
    unpublish_at: payload.unpublishAt,
    article_id: payload.articleId,
  });

const scheduleApi = { create, update };

export default scheduleApi;
