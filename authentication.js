"use strict";

const authentication = {
  type: "custom",
  test: {
    url: "https://{{bundle.authData.subdomain}}.{{process.env.ENV_HOST}}/api/v1/profile.json"
  },
  fields: [
    {
      key: "subdomain",
      type: "string",
      required: true,
      helpText: "Found in your browser's address bar after logging in."
    },
    {
      key: "apiKey",
      type: "string",
      required: true,
      helpText: "Found on your user settings page. Go to https://help.kapost.com/hc/en-us/articles/211800068-About-the-Kapost-API for more information."
    },
    {
      key: "ngrokUrl",
      type: "string",
      required: true,
      helpText: "Ngrok url for local webhook dev."
    }
  ]
};

const addApiKeyToHeader = (request, _zapier, bundle) => {
  if (bundle.authData.apiKey) {
    request.params = request.params || {};
    request.params.api_key = bundle.authData.apiKey;
  }
  return request;
};

module.exports = {
  authentication,
  addApiKeyToHeader
};
