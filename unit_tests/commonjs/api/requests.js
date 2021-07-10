const fetch = require("node-fetch");

const getProjectsNoAsync = (callback) => {
  fetch("http://localhost:3000/projects")
    .then((response) => response.json())
    .then((response_data) => callback(response_data))
    .catch((err) => console.log(err));
};

const getProjectsWithAsync = async () => {
  const response = await fetch("http://localhost:3000/projects");
  return response.json();
};

module.exports = { getProjectsWithAsync, getProjectsNoAsync };
