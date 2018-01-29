"use strict";
const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("basic authentication", () => {
  // Put your test TEST_USERNAME and TEST_PASSWORD in a .environment file.
  // The inject method will load them and make them available to use in your
  // tests.
  zapier.tools.env.inject();

  it("should authenticate", (done) => {
    const bundle = {
      authData: {
        apiKey: process.env.TEST_API_KEY,
        host: process.env.TEST_HOST,
        subdomain: process.env.TEST_SUBDOMAIN
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        response.response.user.authentication_token.should.eql(process.env.TEST_API_KEY);
        done();
      })
      .catch(done);
  });

});
