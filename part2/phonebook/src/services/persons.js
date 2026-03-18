import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = person => {
  return axios.post(baseUrl, person);
};

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = person => {
  return axios.put(`${baseUrl}/${person.id}`, person);
};

export default { getAll, create, deletePerson, updatePerson };
