import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  if (!notionSecret || !notionDatabaseId) {
    res
      .status(500)
      .json({ error: "Missing notion secret or notion database id" });
    return;
  }

  const query = await notion.databases.query({
    database_id: notionDatabaseId,
  });

  const data = query.results;

  // res.status(200).json(data);
  res.status(200).json({ name: "John Doe" });
}
