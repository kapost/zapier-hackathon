require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe.only("creates", () => {

  describe("create content", () => {
    it("should create from HTML", (done) => {
      const bundle = {
        authData: {
          apiKey: process.env.TEST_API_KEY,
          subdomain: process.env.TEST_SUBDOMAIN
        },
        inputData: {
          body: "<p>test</p>",
          title: "Test",
        }
      };

      appTester(App.creates.create.operation.perform, bundle)
        .then((result) => {
          result.should.have.property("title");
          done();
        })
        .catch(done);
    });
  });
});