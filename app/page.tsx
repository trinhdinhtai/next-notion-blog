import { getDatabase } from "@/lib/notion";

export default async function Home() {
  const posts = await getDatabase();

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.id}</h1>
            {/* @ts-ignore */}
            {post?.properties?.Name.title[0].plain_text}
          </div>
        );
      })}
    </div>
  );
}
