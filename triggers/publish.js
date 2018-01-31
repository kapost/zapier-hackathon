const subscribeHook = (z, bundle) => {
  // bundle.targetUrl has the Hook URL this app should call when content is published.
  const data = {
    url: bundle.targetUrl,
    action: "publish"
  };

  const options = {
    url: `${bundle.authData.ngrokUrl}/api/webhooks/zapier`,
    method: "POST",
    body: JSON.stringify(data)
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
  // bundle.subscribeData contains the parsed response JSON from the subscribe
  // request made initially.
  const hookId = bundle.subscribeData.id;

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const options = {
    url: `http://57b20fb546b57d1100a3c405.mockapi.io/api/hooks/${hookId}`,
    method: "DELETE",
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(options)
    .then((response) => JSON.parse(response.content));
};

const getContent = (z, bundle) => {
  // bundle.cleanedRequest will include the parsed JSON object (if it's not a
  // test poll) and also a .querystring property with the URL"s query string.
  const content = {
    id: bundle.cleanedRequest.id,
    body: bundle.cleanedRequest.body,
    title: bundle.cleanedRequest.title
  };

  return [content];
};

const getFallbackContent = (z, bundle) => {
  // For the test poll, you should get some real data, to aid the setup process.
  const options = {
    url: `${bundle.authData.ngrokUrl}/api/v1/content/?columns[]=content&columns[]=title&columns[]=content_file`,
    params: {}
  };

  return z.request(options)
    .then((response) => response.json.response);
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: "publish",

  // You"ll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: "Content",
  display: {
    label: "Content Publish",
    description: "Triggered when content is published."
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we"ll pass them in as `bundle.inputData` later.
    inputFields: [
      { key: "test", type: "string" }
    ],

    type: "hook",

    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,

    perform: getContent,
    performList: getFallbackContent,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: "5487714e678c0a40c2000002",
      title: "Sample Content",
      body: "Sample Body"
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: "id", label: "ID"},
      {key: "title", label: "Title"},
      {key: "body", label: "Body"}
    ]
  }
};