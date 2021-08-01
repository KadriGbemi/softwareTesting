const fetch = require("node-fetch");
const resetData = async () => {
  await fetch("http://localhost:3000/seed", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

resetData();

console.log(resetData())