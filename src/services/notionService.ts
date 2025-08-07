export type NoteMeta = {
    id: string;
    title: string;
    slug: string;
    category: string;
    date: string;
    excerpt: string;
};

export async function fetchNotes(): Promise<NoteMeta[]> {
    const res = await fetch('/api/notes');
    if (!res.ok) throw new Error('Error al cargar notas');
    return res.json();
}

export async function fetchNoteContent(id: string): Promise<string> {
    const res = await fetch(`/api/notes/${id}`);
    if (!res.ok) throw new Error('Error al cargar detalle');
    const { content } = await res.json();
    return content;
}
