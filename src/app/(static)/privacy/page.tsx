import Markdown from 'marked-react';

async function getData() {
    const url = process.env.NEXT_PUBLIC_URL
    // Fetch Privacy from url /api/static/privacy
    const res = await fetch(`${url}/api/static/privacy`, {
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
    const {data: {attributes: content}} = await getData();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const updatedAt = new Date(content.updatedAt).toLocaleDateString(undefined, options as any);
    return(
        <div className="max-w-[85%] mx-auto">
              <h1 className="text-4xl">{content.name}</h1>
              <p className="text-lg text-slate-500">{updatedAt}</p>
              <div 
                className="max-w-max text-slate-50
                prose-a:text-aqua-500 prose-strong:text-slate-50 prose-lg  prose-h6:text-slate-50
                prose-td:border prose-td:border-slate-50 prose-td:px-4 prose-td:text-center
                "
                
                >

              <Markdown>
                {content.contact}
              </Markdown>
              </div>
        </div>
    )
}
