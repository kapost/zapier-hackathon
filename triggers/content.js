const sample = require("../samples/sample_content");

const triggerContent = (z, bundle) => {
  const responsePromise = z.request({
    method: "GET",
    url: `https://${bundle.authData.subdomain}.${bundle.authData.host}/api/v1/content/`,
    params: {}
  });
  return responsePromise
    .then(response => {
      // z.console.log("response", JSON.parse(response).response)
      return response.json.response
    });
};

module.exports = {
  key: "content",
  noun: "Content",

  display: {
    label: "Get Content",
    description: "Triggers on new content."
  },

  operation: {
    inputFields: [],
    perform: triggerContent,

    sample: sample,

    outputFields: [
      {key: "id", label: "ID"},
      {key: "updated_at", label: "Updated At"},
      {key: "title", label: "Title"},
      {key: "assignee_id", label: "Assignee ID"},
      {key: "creator_id", label: "Creator ID"}
    ]
  }
};
