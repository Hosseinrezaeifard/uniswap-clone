import SanityClient from "@sanity/client";

export const client = SanityClient({
  projectId: process.env.sanityProjectId,
  dataset: "production",
  apiVersion: "v1",
  token: process.env.sanityToken,
  useCdn: true,
});
