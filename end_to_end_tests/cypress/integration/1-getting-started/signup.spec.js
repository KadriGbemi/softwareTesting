describe("Sign up Page", () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec("npm run db:reset");

    // reset and seed the database prior to every test
    // cy.exec('npm run db:reset && npm run db:seed')
  });
  it("Login to App and redirect to blog page", function () {
    // destructuring assignment of the this.currentUser object

    cy.visit("/views/signup");

    cy.get("input[name=firstName]").type("Jameees");

    cy.get("input[name=lastName]").type("Bruno");

    cy.get("input[name=email]").type("test@gmail.com");

    // // {enter} causes the form to submit
    cy.get("input[name=password]").type(`${"password"}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should("include", "/views/blogs");

    //our auth cookie should be present
    // cy.getCookie("your-session-cookie").should("exist");

    // UI should reflect this user being logged in
    cy.contains("I Built A Successful Blog In One Year");
  });
});
