import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export async function onRequest(context) {
  const { env } = context;
  const notion = new Client({ auth: env.NOTION_TOKEN });
  const n2m   = new NotionToMarkdown({ notionClient: notion });
  // 1) Consulta la DB
  const resp = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID
  });
  // 2) Para cada página extrae título, slug, categoría, fecha y un excerpt
  const pages = await Promise.all(
    resp.results.map(async page => {
      const props = page.properties;
      const title    = props.Name.title[0].plain_text;
      const slug     = props.Slug.rich_text[0].plain_text;
      const category = props.Category.select?.name || 'Other';
      const date     = props.Date.date.start;
      // excerpt: primer párrafo
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdString = n2m.toMarkdownString(mdBlocks);
      const excerpt  = mdString.split('\n').find(l => l)?.slice(0, 120) || '';
      return { id: page.id, title, slug, category, date, excerpt };
    })
  );
  return new Response(JSON.stringify(pages), {
    headers: { 'Content-Type': 'application/json' }
  });
}
