import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    alert(`get all failed with error: ${error}`);
  }
};

const create = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson);
    return response.data;
  } catch (error) {
    alert(`create failed with error: ${error}`);
  }
};

const update = async (id, newPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newPerson);
    return response.data;
  } catch (error) {
    alert(`update failed with error: ${error}`);
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    alert(`remove failed with error: ${error}`);
  }
};

export default { getAll, create, update, remove };
