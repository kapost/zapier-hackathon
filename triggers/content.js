const sample = require("../samples/sample_content");

const triggerContent = (z, bundle) => {
  const responsePromise = z.request({
    method: "GET",
    url: `https://${bundle.authData.subdomain}.${process.env.ENV_HOST}/api/v1/content/?columns[]=title&columns[]=full_content_type&columns[]=collection_uids&columns[]=synced_to_gallery_date&columns[]=gallery_can_share&columns[]=gallery_can_download&columns[]=gallery_share_settings&columns[]=media_url&columns[]=published_url&columns[]=published_date&columns[]=library_tracking_url&columns[]=custom_field_values&columns[]=content_file&columns[]=categories&columns[]=campaigns&columns[]=stages&columns[]=personas`,
    params: {
      "gallery": true,
      "sort_field": "updated_at",
      "sort_dir": -1
    }
  });
  return responsePromise
    .then(response => {
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
