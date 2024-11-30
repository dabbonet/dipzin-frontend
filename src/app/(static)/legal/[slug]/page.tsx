import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { getData } from './_actions/getData';
import { Logo } from '@/components/UI/logo';
import UserMenu from '@/components/Account/user-menu/src/user-menu';

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  if (!data.data || !data.data.attributes) return;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const content = data.data.attributes;
  const updatedAt = new Date(content.updatedAt).toLocaleDateString(undefined, options as any);
  // eslint-disable-next-line consistent-return
  return (
    <>
      <nav className="w-full h-fit px-4 pt-5 md:px-8 md:pt-7 flex items-center justify-between gap-2">
        <a href="/" aria-label="Home">
          <Logo.Dipzin className="text-white" />
        </a>
        {/* <Button size="sm" className="w-28">
          Join Us
        </Button> */}
        <UserMenu />
      </nav>
      <div className="max-w-screen-xl p-5 mx-auto">
        <h1 className="text-4xl">{content.name}</h1>
        <p className="text-lg text-slate-500">{updatedAt}</p>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="max-w-max text-slate-50 prose-a:text-aqua-500 prose-strong:text-slate-50 prose-lg  prose-h6:text-slate-50 prose-td:border prose-td:border-slate-50 prose-td:px-4 prose-td:text-center">
          {/* typo in privacy policy "contact" not "content" */}
          {content.content || content.contact}
        </ReactMarkdown>
      </div>
    </>
  )
}
