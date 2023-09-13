import Post from "@/components/Post";
import { getDatabase } from "@/lib/notion";

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function Home() {
  const posts = await getDatabase();
  console.log("file: page.tsx:5 ~ Home ~ posts:", posts);

  return (
    <div>
      <h1>Next.js blog powered by Notion API</h1>

      <p>
        This is an example of a Next.js blog with data fetched with Notions API.
        The data comes from{" "}
        <a href={`https://www.notion.so/${databaseId}`}>this table</a>. Get the
        source code on{" "}
        <a href="https://github.com/samuelkraft/notion-blog-nextjs">Github</a>{" "}
        or read{" "}
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
