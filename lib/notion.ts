import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
});

export const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId!,
  });
  return response.results;
};
