module.exports = {
  key: "create",
  noun: "Content",
  display: {
    label: "Create Content From HTML/Text",
    description: "Creates content in Kapost from HTML or text."
  },

  operation: {
    inputFields: [
      {key: "body", required: true, type: "string"},
      {key: "title", required: true, type: "text"},
    ],
    perform: (z, bundle) => {
      const base64Encoded = Buffer.from(`${bundle.authData.apiKey}:x`).toString("base64")
      const body = JSON.stringify({
        body: bundle.inputData.body,
        title: bundle.inputData.title,
        content_type_id: process.env.BLOG_POST_CONTENT_TYPE_ID
      });

      const promise = z.request(`https://${bundle.authData.subdomain}.${process.env.ENV_HOST}/api/v1/content`, {
        method: "POST",
        body: body,
        headers: {
          "content-type": "application/json",
          "Authorization": `Basic ${base64Encoded}`
        }
      });

      return promise.then((response) => {
        return response.json.response;
      });
    },

    sample: {
      "id": "1234567890",
      "slug": "content-slug",
      "title": "Content Title",
      "creator_id": "123",
      "assignee_id": "123",
      "campaign_ids": [],
      "preferred_title": "Content Title",
      "next_task": "Completed",
      "state": "production",
      "archived": false,
      "updated_at": "2018-01-31T17:53:58Z",
      "factory_url": "https://subdomain.kapost.com/posts/sample",
      "content_type": {},
      "progress_stage": "planned",
      "content": "body content",
      "tags": [],
      "custom_fields": [],
      "published_url": "http://subdomain.kapost.com/sample",
      "published_date": "2018-01-31T17:53:58Z",
      "library_tracking_url": null,
      "last_updated_by": {},
      "attachments": [],
      "media_url": null,
      "categories": [],
      "persona_ids": [],
      "stage_ids": [],
    },
  }
};