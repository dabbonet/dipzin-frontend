import ReactMarkdown from 'react-markdown';

export default async function Page({ params }: { params: { slug: string } }) {
  async function getData() {
    const res = await fetch(`https://rah.dipzin.com/api/${params.slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 1 }
    });
    const data = await res.json();

    return data;
  }
  const data = await getData();
  if (!data.data || !data.data.attributes) return;
  const { data: { attributes: content } } = data;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const updatedAt = new Date(content.updatedAt).toLocaleDateString(undefined, options as any);
  // eslint-disable-next-line consistent-return
  return (
    <div className="max-w-[85%] mx-auto">
      <h1 className="text-4xl">{content.name}</h1>
      <p className="text-lg text-slate-500">{updatedAt}</p>
      <div className="max-w-max text-slate-50 prose-a:text-aqua-500 prose-strong:text-slate-50 prose-lg  prose-h6:text-slate-50 prose-td:border prose-td:border-slate-50 prose-td:px-4 prose-td:text-center">
        <ReactMarkdown>
          {content.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
