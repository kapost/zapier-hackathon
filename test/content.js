"use strict";
const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

//These are automated tests for the Issue create and Issue Trigger.
//They will run every time the `zapier test` command is executed.
describe("content trigger", () => {
  zapier.tools.env.inject();

  // Make sure there"s an open issue to fetch here!
  it("should get content", (done) => {
    const bundle = {
      authData: {
        apiKey: process.env.TEST_API_KEY,
        host: process.env.TEST_HOST,
        subdomain: process.env.TEST_SUBDOMAIN
      },
      inputData: {}
    };
    appTester(App.triggers.content.operation.perform, bundle)
      .then((content) => {
        content.should.be.an.instanceOf(Array);
        done();
      })
      .catch(done);
  });

  // it("should create an issue", (done) => {
  //   const bundle = {
  //     authData: {
  //       username: process.env.TEST_USERNAME,
  //       password: process.env.TEST_PASSWORD
  //     },
  //     inputData: {
  //       repo: process.env.TEST_REPO,
  //       title: "Test Issue",
  //       body: "This is a test issue created from an automated test for the Zapier GitHub Example App"
  //     }
  //   };
  //   appTester(App.creates.issue.operation.perform, bundle)
  //     .then((content) => {

  //       done();
  //     })
  //     .catch(done);
  // });
});
