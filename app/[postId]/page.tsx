import Block from "@/components/Block";
import TextBlock from "@/components/TextBlock";
import { getBlocks, getPage } from "@/lib/notion";
import Link from "next/link";
import { Fragment } from "react";

interface PostIdPageProps {
  params: {
    postId: string;
  };
}

const PostIdPage = async ({ params }: PostIdPageProps) => {
  const page = await getPage(params.postId);
  const blocks = await getBlocks(params.postId);

  return (
    <article className="py-4 max-w-3xl mx-auto whitespace-pre-line leading-6">
      <h1 className="text-3xl font-bold my-4">
        {/* @ts-ignore */}
        <TextBlock text={page?.properties?.Name.title} />
      </h1>

      <section className="space-y-4">
        {blocks.map((block: any) => (
          <Fragment key={block.id}>
            <Block block={block} />
          </Fragment>
        ))}
        <Link href="/" className="inline-block mb-4">
          ← Go home
        </Link>
      </section>
    </article>
  );
};

export default PostIdPage;
