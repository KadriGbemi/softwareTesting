const myLoginForm = document.getElementById("myLoginForm");
const mySignUpForm = document.getElementById("mySignUpForm");

async function requestBackend(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  return response;
}
const handleSubmitRequest = async (data, url) => {
  try {
    const response = await requestBackend(url, data);
    if (response.ok) {
      location.replace(location.origin + "/views/blogs");
    }
  } catch (err) {
    console.log("Error", err);
  }
};

if (myLoginForm) {
  myLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    //     const formData = new FormData(myLoginForm)
    //     const email = formData.get('email')
    //     const password = formData.get('password')
    //   const requestData = {
    //     email,
    //     password,
    //   };
    const formData = new FormData(myLoginForm);
    const entriesData = Object.fromEntries(formData.entries());
    const requestData = {
      email: entriesData.email,
      password: entriesData.password,
    };
    handleSubmitRequest(requestData, `http://localhost:3000/users/login`);
  });
}
if (mySignUpForm) {
  mySignUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(mySignUpForm);
    const entriesData = Object.fromEntries(formData.entries());
    const requestData = {
      firstName: entriesData.firstName,
      lastName: entriesData.lastName,
      email: entriesData.email,
      password: entriesData.password,
    };
    handleSubmitRequest(requestData, `http://localhost:3000/users/`);
  });
}
