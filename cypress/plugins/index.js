/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

 const path = require("path");
 const gmail = require("gmail-tester");

 // eslint-disable-next-line no-unused-vars
 module.exports = (on, config) => {
   // `on` is used to hook into various events Cypress emits
   // `config` is the resolved Cypress config
   on("task", {
     "gmail:check": async (args) => {
       const { from, to, subject } = args;
       const email = await gmail.check_inbox(
         path.resolve(__dirname, "credentials.json"),
         path.resolve(__dirname, "gmail_token.json"),
         {
           subject: subject,
           from: from,
           to: to,
           wait_time_sec: 20,
           max_wait_time_sec: 50,
         }
       );
       return email;
     },
   });
 };