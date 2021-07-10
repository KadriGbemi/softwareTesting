const fetch = require("node-fetch");

const getProjectsNoAsyncAwait = () => {
  fetch("http://localhost:3000/projects")
    .then((response) => response.json())
    .then((response_data) =>
      console.log("getProjectsNoAsyncAwait", response_data)
    )
    .catch();
};

// Async-await
async function getProjectsWithAsyncAwait() {
  const response = await fetch("http://localhost:3000/projects");

  const data = await response.json();
  
  console.log(data);
  return data
}
getProjectsWithAsyncAwait()
// const getProjectsWithAsyncAwait = async () => {
//     const response = await fetch("http://localhost:3000/projects");
//     return response.json()
//   };

//   getProjectsWithAsyncAwait()
module.exports = { getProjectsWithAsyncAwait, getProjectsNoAsyncAwait };
