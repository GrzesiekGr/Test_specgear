class SpecgearPage {
    confirmPopUp = '#x13pmcookiebar-acceptation';
    declinePopUp = '#x13pmcookiebar-rejection';
    moreInfo = 'strong > a';

    getConfirmPopUp() {
        return cy.get(this.confirmPopUp);
    }
    getDeclinePopUp() {
        return cy.get(this.declinePopUp);
    }
    getMoreInfo() {
        return cy.get(this.moreInfo);
    }
} export default SpecgearPage