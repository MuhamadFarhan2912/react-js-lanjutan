
import API from "../_api";

export const getAuthors = async () => {
  const { data } = await API.get("/authors");
  return data.data;
};

export const createAuthor = async (payload) => {
  const { data } = await API.post("/authors", payload);
  return data;
};

export const showAuthor = async (id) => {
  const { data } = await API.get(`/authors/${id}`);
  return data.data;
};

export const updateAuthor = async (id, payload) => {
  const { data } = await API.put(`/authors/${id}`, payload);
  return data;
};

export const deleteAuthor = async (id) => {
  const { data } = await API.delete(`/authors/${id}`);
  return data;
};
