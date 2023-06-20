/// <reference types="cypress" />
import SpecgearPage from "../../PageObject/SpecgearPage";
import login from "../../fixtures/loginSpecgear.json";

const specgear = new SpecgearPage();

beforeEach("Setup", () => {
    cy.visit('/');
    cy.url().should("contain", "specgear");
    cy.url().should("contain", "https://specgear.com.pl/");
  });
  describe("Test check server response", () => {
  it("TC_1 Check status code 200", () => {
    cy.request("https://specgear.com.pl/").its("status").should("eq", 200);
  });
});
  describe("Test of Cookie pop-up specgear", () => {
    it("TC_2 Confirm pop-up", () => {
      specgear.getConfirmPopUp().should("be.visible");
      specgear.getConfirmPopUp().click();
      specgear.getConfirmPopUp().should("not.be.visible");
    });
  
    it("TC_3 Decline pop-up", () => {
      specgear.getDeclinePopUp().should("be.visible");
      specgear.getDeclinePopUp().click();
      specgear.getDeclinePopUp().should("not.exist");
    });
  
    it("TC_4 View more information", () => {
      specgear.getMoreInfo().should("be.visible").click();
        cy.contains("Polityka prywatności").should("be.visible");
      });
  });
  describe("Test links", () => {
    beforeEach("Confirm PopUp and scroll bottom", () => {
      cy.ConfirmPopUp();
      cy.scrollTo("bottom");
      });
    it("TC_5 Check facebook link", () => {
      cy.get('.facebook > ._blank').invoke('attr', 'href').then((href) => {
        cy.visit(href);
        cy.url().should('contain', 'facebook.com');
      });
        });
    it("TC_6 Check instagram link", () => {
      cy.get('.instagram > ._blank').invoke('attr', 'href').then((href) => {
        cy.visit(href);
        cy.url().should('contain', 'instagram.com');
      });
  });
});
describe("Search products", () => {
  beforeEach("Setup", () => {
    cy.wait(1000);
    cy.ConfirmPopUp();
    cy.fixture("searchSpecgear").as("text");
  });

  it("TC_7 Search in specgear with {enter} and sort items", function () {
    cy.get('#search_query_top').clear().type(this.text.search).type('{enter}');
    cy.url().should('contain', this.text.query);
    cy.get('.icon-th-list').click();
    cy.get('.icon-th-list').should('be.visible');
  });

  it("TC_8 Search in specgear with click and adding the product to the cart", function () {
    cy.get('#search_query_top').clear().type(this.text.search);
    cy.get('#searchbox > .btn').click();
    cy.url().should('contain', this.text.query);
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').should("be.visible");
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click();
    cy.get('.continue > span').should("be.visible");
    cy.wait(1000);
    cy.get('.continue > span').click();
  });

  it("TC_9 Removing the product from the cart", function () {
    cy.get('#search_query_top').clear().type(this.text.search);
    cy.get('#searchbox > .btn').click();
    cy.url().should('contain', this.text.query);
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').should("be.visible");
    cy.get(':nth-child(1) > .product-container > .right-block > .button-container > .ajax_add_to_cart_button > span').click();
    cy.get('.button-medium > span').click();
    cy.get('.icon-trash').click();
    cy.wait(1000);
    cy.get('.alert').should("be.visible");
  });
});
describe("Login to specgear", () => {
  it("TC_10 Login with wrong password", () => {
    cy.fixture("loginSpecgear.json").then((login) => {
      cy.ConfirmPopUp();
      cy.get('.account').click();
      cy.get('#login_form').should("be.visible");
      cy.get("#email").type(login.email);
      cy.get("#passwd").type(login.password);
      cy.get('#SubmitLogin > span').click();
      cy.get('.center_bg > :nth-child(2)').should("be.visible");
    });
  });
});