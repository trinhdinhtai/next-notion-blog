import TextBlock from "@/components/TextBlock";
import Link from "next/link";

interface PostProp {
  post: any;
}

const Post = ({ post }: PostProp) => {
  const date = new Date(post.last_edited_time).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div>
      <h3 className="mb-2">
        <Link href={`/${post.id}`}>
          <TextBlock text={post.properties.Name.title} />
        </Link>

        <p className="mb-3">{date}</p>
        <Link href={`/${post.id}`}>Read post →</Link>
      </h3>
    </div>
  );
};

export default Post;
