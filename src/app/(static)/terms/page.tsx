import Markdown from 'marked-react';

async function getData() {
    // Fetch Privacy from url /api/static/privacy
    const res = await fetch("https://rah.dipzin.com/api/term-of-service", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 1 }
    });
    const data = await res.json();
    
    return data as any;
    // Set Data in UI & render markdown preview.
}
export default async function PrivacyPage(){
    const data = await getData();
    if (!data.data || !data.data.attributes) return;
    const { data: { attributes: content } } = data;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const updatedAt = new Date(content.updatedAt).toLocaleDateString(undefined, options as any);
    return(
        <div className="max-w-[85%] mx-auto">
              <h1 className="text-4xl">{content.name}</h1>
              <p className="text-lg text-slate-500">{updatedAt}</p>
              <div className="max-w-max prose-a:text-aqua-500 prose-strong:text-slate-50 prose-xl text-slate-50 prose-h6:text-slate-50 prose-h3:mt-8 prose-h3:text-slate-50" >
              <Markdown>
                {content.content}
              </Markdown>
              </div>
        </div>
    )
}
