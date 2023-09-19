import Post from "@/components/Post";
import { getDatabase } from "@/lib/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

export const revalidate = 0;

export default async function Home() {
  const posts = await getDatabase();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Next.js blog powered by Notion API</h1>

      <p>
        This is an example of a Next.js blog with data fetched with Notions API.
        The data comes from{" "}
        <a href={`https://www.notion.so/${databaseId}`}>this table</a>. Get the
        source code on{" "}
        <a href="https://github.com/trinhdinhtai/next-notion-blog">Github</a> or
        read{" "}
        <a href="https://samuelkraft.com/blog/building-a-notion-blog-with-public-api">
          my blogpost
        </a>{" "}
        on building your own.
      </p>

      <h2 className="my-5 border-b border-gray-700 uppercase leading-relaxed">
        All Posts
      </h2>

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
