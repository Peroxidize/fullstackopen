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
  console.log(config);
  const response = await axios.post(baseUrl, blog, config);
  console.log(response.data);
  return response.data;
};

export default { getAll, create, setToken };
