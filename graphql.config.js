module.exports = {
  schemaPath: './schema.graphql',
  documents: ['./src/**/*.graphql'],
  extensions: {
    endpoints: {
      default: {
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CF_SPACE_ID}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CF_DELIVERY_ACCESS_TOKEN}`,
        },
      },
    },
  },
};
