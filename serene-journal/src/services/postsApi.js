import { EDITORIAL_POSTS } from "../data/editorialPosts.js";

const API_URL =
  import.meta.env.VITE_BLOG_API_URL || "https://dummyjson.com/posts?limit=12";

export async function getBlogPosts() {
  const response = await fetch(API_URL, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("The demo posts service returned " + response.status);
  }

  const payload = await response.json();
  const remotePosts = Array.isArray(payload.posts) ? payload.posts : [];

  if (!remotePosts.length) {
    throw new Error("The demo posts service returned no posts");
  }

  // DummyJSON supplies the mock record, article body and engagement metadata.
  // Editorial metadata keeps the demo focused on the lifestyle categories in the design.
  return EDITORIAL_POSTS.map((editorial, index) => {
    const remote = remotePosts[index % remotePosts.length];

    return {
      ...editorial,
      id: "demo-" + remote.id + "-" + editorial.id,
      apiTitle: remote.title,
      body: remote.body || editorial.body,
      userId: remote.userId,
      views: remote.views ?? 0,
      likes: remote.reactions?.likes ?? 0,
      source: "DummyJSON"
    };
  });
}

export function getFallbackPosts() {
  return EDITORIAL_POSTS;
}
