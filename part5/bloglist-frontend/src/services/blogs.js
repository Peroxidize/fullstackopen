import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  console.log(response.data);
  return response.data;
};

const increaseLikes = async id => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/likes/${id}`, {}, config);
  console.log(response.data);
  return response.data;
};

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response;
};

export default { getAll, create, setToken, increaseLikes, deleteBlog };
