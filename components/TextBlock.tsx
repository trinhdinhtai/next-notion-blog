interface TextBlockProps {
  text: any;
}

const TextBlock = ({ text }: TextBlockProps) => {
  if (!text) {
    return null;
  }

  return text.map((value: any) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={[
          bold ? "font-bold" : "",
          code ? "font-mono bg-gray-300 py-1 px-0.5 rounded-sm" : "",
          italic ? "italic" : "",
          strikethrough ? "line-through" : "",
          underline ? "underline" : "",
        ].join(" ")}
        style={color !== "default" ? { color } : {}}
        key={text.content}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

export default TextBlock;
