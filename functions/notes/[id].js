import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export async function onRequest(context) {
  const { env, params } = context;
  const notion = new Client({ auth: env.NOTION_TOKEN });
  const n2m    = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(params.id);
  const content  = n2m.toMarkdownString(mdBlocks);
  return new Response(JSON.stringify({ content }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
