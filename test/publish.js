require("should");

const zapier = require("zapier-platform-core");

const App = require("../index");
const appTester = zapier.createAppTester(App);

describe("publish trigger", () => {
   zapier.tools.env.inject(); // load env from .environment

  describe("content publish trigger", () => {
    it("should load content from fake hook", (done) => {
      const bundle = {
        authData: {
          apiKey: process.env.TEST_API_KEY,
          ngrokUrl: process.env.NGROK_URL
        },
        inputData: {},
        cleanedRequest: {
          id: 1,
          title: "title 1",
          body: "body 1"
        }
      };

      appTester(App.triggers.publish.operation.perform, bundle)
        .then(results => {
          results.length.should.eql(1);

          const content = results[0];
          content.title.should.eql("title 1");
          content.body.should.eql("body 1");

          done();
        })
        .catch(done);
    });

    it("should load content from list", (done) => {
      const bundle = {
        authData: {
          apiKey: process.env.TEST_API_KEY,
          ngrokUrl: process.env.NGROK_URL
        },
        inputData: {}
      };

      appTester(App.triggers.publish.operation.performList, bundle)
        .then(results => {
          results.length.should.be.greaterThan(1);

          const firstContent = results[0];
          firstContent.title.should.be.an.instanceOf(String);
          firstContent.content.should.be.an.instanceOf(String);

          done();
        })
        .catch(done);
    });
  });

});