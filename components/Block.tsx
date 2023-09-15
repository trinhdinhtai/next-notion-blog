import TextBlock from "@/components/TextBlock";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface BlockProps {
  block: any;
}

const Block = ({ block }: BlockProps) => {
  const { type, id } = block;
  const value = block[type];

  const renderNestedList = (block: any) => {
    const { type } = block;
    const value = block[type];
    if (!value) return null;

    const isNumberedList = value.children[0].type === "numbered_list_item";

    if (isNumberedList) {
      return (
        <ol>
          {value.children.map((block: any) => (
            <Block key={block} block={block} />
          ))}
        </ol>
      );
    }
    return (
      <ul>
        {value.children.map((block: any) => (
          <Block key={block} block={block} />
        ))}
      </ul>
    );
  };

  switch (type) {
    case "paragraph":
      return (
        <p>
          <TextBlock text={value.rich_text} />
        </p>
      );

    case "heading_1":
      return (
        <h1 className="text-3xl font-bold">
          <TextBlock text={value.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-2xl font-bold">
          <TextBlock text={value.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-xl font-bold">
          <TextBlock text={value.rich_text} />
        </h3>
      );

    case "bulleted_list": {
      return (
        <ul className="list-inside">
          {value.children.map((child: any) => (
            <Block key={child} block={child} />
          ))}
        </ul>
      );
    }
    case "numbered_list": {
      return (
        <ol className="list-decimal">
          {value.children.map((child: any) => (
            <Block key={child} block={child} />
          ))}
        </ol>
      );
    }

    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li key={block.id}>
          <TextBlock text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
      );

    case "to_do":
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <TextBlock text={value.rich_text} />
          </label>
        </div>
      );

    case "toggle":
      return (
        <details>
          <summary>
            <TextBlock text={value.rich_text} />
          </summary>
          {block.children?.map((child: any) => (
            <Fragment key={child.id}>
              <Block block={child} />
            </Fragment>
          ))}
        </details>
      );

    case "quote":
      return <blockquote key={id}>{value.rich_text[0].plain_text}</blockquote>;

    case "code":
      return (
        <pre className="bg-[#0a0a0a] p-3 rounded-md">
          <code className="" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );

    case "child_page":
      // TODO:
      return null;

    case "divider":
      return <hr key={id} />;

    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <div className="">
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );

    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure className="w-full aspect-[16/9] relative">
          <Image src={src} alt={caption} fill />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );

    case "table": {
      return (
        <table className="">
          <tbody>
            {block.children?.map((child: any, index: number) => {
              const RowElement =
                value.has_column_header && index == 0 ? "th" : "td";
              return (
                <tr key={child.id}>
                  {child.table_row?.cells?.map((cell: any, index: number) => {
                    return (
                      <RowElement key={`${cell.plain_text}-${index}`}>
                        <TextBlock text={cell} />
                      </RowElement>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
    case "column_list": {
      return (
        <div className="">
          {block.children.map((block: any) => (
            <Block key={block} block={block} />
          ))}
        </div>
      );
    }

    case "column": {
      return (
        <div>
          {block.children.map((child: any) => (
            <Block key={block} block={child} />
          ))}
        </div>
      );
    }

    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default Block;
