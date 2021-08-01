describe("Login page", () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec("npm run db:reset");

    cy.request("POST", "http://localhost:3000/users/", {
      firstName: "James",
      lastName: "Bruno",
      email: "james@gmail.com",
      password: "testing12",
    })
      .its("body")
      .as("currentUser");
  });

  it("Login to App and redirect to blog page", function () {
    const { email, password } = this.currentUser;

    cy.visit("/");

    cy.get("input[name=email]").type(email);

    // // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${password}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should("include", "/views/blogs");

    // UI should reflect this user being logged in
    cy.contains("I Built A Successful Blog In One Year");
  });
});