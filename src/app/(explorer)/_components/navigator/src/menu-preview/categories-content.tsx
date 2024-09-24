import React from 'react';

interface Category {
  title: string;
  items: { name: string; count: number }[];
}

interface CategoriesContentProps {
  categories: Category[];
}

const CategoriesContent: React.FC<CategoriesContentProps> = ({ categories }) => (
  categories.map((category) => (
    <div className="flex flex-col gap-2 p-2" key={category.title}>
      <span className="text-base p-2 font-medium text-slate-400">{category.title}</span>
      <ul>
        {category.items.map((item) => (
          <li key={item.name} className="py-1 px-2 flex justify-between gap-2">
            <button type="button" className="w-full h-fit flex items-start text-[20px] text-slate-100 font-medium hover:text-slate-300 active:text-slate-400 transition-colors">
              {item.name}
            </button>
            <span className="text-slate-300 text-base">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  ))
);

export default CategoriesContent;
