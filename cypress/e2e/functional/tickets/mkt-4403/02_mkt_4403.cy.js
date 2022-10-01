Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

/*
  Page Flow
  Landing Page (No CDP) $57 > 
  VSU Upsell $147 > 
  Custom Diet Plan reup Cross-Sell Page $97 > 
  Boost Program Cross-Sell $297
*/

describe('MKT-4403 Funnel Test', () => {

  let user

  const uuid = () => Cypress._.random(0, 1e5)
  const id = uuid()

  before(() => {
    cy.fixture('users').then((users) => {
      user = users
    })

  })

  it('02 Verify Funnel No CDP With All Upsells', () => {

    const file = 'cypress/e2e/data/mkt-4403/02_mkt_4403_orders.json'

    cy.writeFile(file, [])

    cy.clearCookies()

    cy.window().then((win) => {
      win.sessionStorage.clear()
    })

    Cypress.session.clearAllSavedSessions()

    cy.clearLocalStorage()

    // Landing Page
    cy.visit(Cypress.config().baseUrl + 'sp/fat-loss-extreme-women/fbk-cpc-int', {
      onBeforeLoad(win) {
        win.localStorage.clear()
      },
    })

    // Verify Landing Page
    cy.VerifyURL('/sp/fat-loss-extreme-women/fbk-cpc-int')

    // Skip Video
    cy.SkipVideo()

    // Click CTA Button
    cy.ClickButton('.btn')

    // Save User Info
    cy.SaveUserInfo(file, 'tests+' + id + '@vshred.com')

    // Save Order Details
    cy.SaveOrderDetails(user, file, 'Fat Loss Extreme for Her $57 Bundle', '1', '57.00', 'digital')

    // Name
    cy.EnterText('#name', user.firstName + ' ' + user.lastName)
    // Email
    cy.EnterText('#email', 'tests+' + id + '@vshred.com')
    // Phone
    cy.EnterText('#phone', user.phoneNumber)

    // Click Next Step Button
    cy.ClickButton(':nth-child(3) > .expand-area > .expand-inputs > .next-step')
    // cy.ClickButton('span[test-id="next-step-button-one]')

    // Enter Payment Details
    cy.EnterPaymentDetails()

    // Click Next Step Button
    cy.ClickButton('.expand-area-2 > .expand-inputs > .next-step')

    // Select Special Offer
    // cy.SelectSpecialOffer()

    // Save Order Details
    // cy.SaveOrderDetails(user, file, 'Custom Diet Plan', '1', '49.00', 'digital')

    // Verify Order Summary
    cy.VerifyOrderSummary(file)

    // Click Submit Order
    cy.ClickButton('#submit-order')

    // --------- VSU ($97|$147) UPSELL ---------

    // Verify Next URL
    cy.VerifyNextURL('sp/vshred-university/vsu-us-v4-boost')

    // Skip Video
    cy.SkipVideo()

    // Click VSU $97 Upsell
    // cy.ClickButton(':nth-child(1) > .packages15__content > .packages15__cta')

    // Click VSU $147 Upsell
    cy.ClickButton(':nth-child(2) > .packages15__content > .packages15__cta')

    // Or Decline this Offer
    // cy.ClickButton('.packages15__bottom > a')

    // Save Order Details
    cy.SaveOrderDetails(user, file, 'VSU ALL-ACCESS LIFETIME MEMBERSHIP', '1', '147.00', 'digital')

    // --------- Custom Diet Plan reup Cross-Sell Page ($47 | $97) ---------

    // Verify Next URL
    cy.VerifyNextURL('sp/custom-diet-plan/reup-cs')

    // Skip Video
    cy.SkipVideo()

    // Click $47 Upsell
    // cy.ClickButton('.v2 > :nth-child(1) > .packages32__body > .packages32__cta')

    // Click $97 Upsell
    cy.ClickButton('.v2 > :nth-child(2) > .packages32__body > .packages32__cta')

    // Or Decline this Offer
    // cy.ClickButton('.hardcode__decline > a')

    // Save Order Details
    cy.SaveOrderDetails(user, file, 'Silver Plus 4 Week Diet and Training - $97', '1', '97.00', 'digital')

    // --------- Boost Program Cross-Sell ---------

    // Verify Next URL
    cy.VerifyNextURL('sp/coaching/vshred-boost-cs-int')

    // Skip Video
    cy.SkipVideo()

    // Select this Offer
    cy.ClickButton('.packages40__col-btn')

    // Or Decline this Offer
    // cy.ClickButton('.packages40__decline')

    // Save Order Details    
    cy.SaveOrderDetails(user, file, 'V SHRED BOOST Coaching Experience international', '1', '297.00', 'physical')

    // Verify Order Confirmation page
    cy.VerifyOrderConfirmation(file)

    // Verify Purchases
    cy.VerifyPurchases(file)

    // Complete Profile
    cy.CompleteProfile()

    // Complete Questionnaire
    cy.CompleteQuestionnaire()

    // Verify Programs
    cy.VerifyPrograms(file)

    // Verify Orders in Admin
    cy.VerifyOrders(file)

    // Verify Order Details in Admin
    cy.VerifyOrderDetails(file)

    // Verify Subscriptions in Admin
    cy.VerifySubscriptions(file)

    // Verify Wecome Email
    cy.VerifyWelcomeEmail(file, 'WELCOME! Get started with your customized plan now')

    // Verify Custom Plan Email Confirmation
    // cy.VerifyCustomPlanEmail(file, 'Recurring Custom Plan Purchase - Customer Subscription Updated')

  })

})