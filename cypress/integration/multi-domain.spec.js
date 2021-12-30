describe("Rerunning tests and hooks with multiple domains", () => {
  it(
    "Part 1 of multi domain test",
    { baseUrl: "https://widget.klickly-dev.com" },
    function () {
      cy.clock();
      cy.visit("/?updated=true");
      cy.get("[class$=_title]")
        .first()
        .invoke("text")
        .then(cy.log)
        .then((title) => {
          cy.task('save', title)
        });
    }
  );

  it(
    "Part 2 of multi domain test",
    { baseUrl: "https://dev-may18-store.myshopify.com" },
    function () {
      cy.visit("/");
      cy.task("load").then((title) => {
        cy.get('button[class*=__search-toggle]').click()
        cy.get('input[placeholder=Search]').type(title + '{enter}')
        cy.location('pathname').should('equal', '/search')
      });
    }
  );
});
