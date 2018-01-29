"use strict";
const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("content trigger", () => {
  zapier.tools.env.inject(); // load env from .environment

  it("should get content", (done) => {
    const bundle = {
      authData: {
        apiKey: process.env.TEST_API_KEY,
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
