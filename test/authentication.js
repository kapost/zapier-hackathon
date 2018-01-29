"use strict";
const should = require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("basic authentication", () => {
  zapier.tools.env.inject(); // load env from .environment

  it("should authenticate", (done) => {
    const bundle = {
      authData: {
        apiKey: process.env.TEST_API_KEY,
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
