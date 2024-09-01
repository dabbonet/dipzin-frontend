import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill } from '@/components/Shared/pill';
import { extractInitials } from '@/utils/StringUtils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/Shared/avatar';
import { Icon } from '@/components/UI/icon';
import { TabsList, TabsTrigger } from '@/components/UI/tabs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Shared/button';
import { Dropdown } from '@/components/Shared/dropdown';

type TagProps = {
  name: string;
  onClick: () => void;
};

const Tag = ({ name, onClick }: TagProps) => (
  <Pill className="cursor-pointer" state="suggestion" onClick={onClick}>
    {name}
  </Pill>
);

type ColorSquareProps = {
  color: string;
  type: 'mobile' | 'web';
};

const ColorSquare = ({ color, type }: ColorSquareProps) => (
  <span
    className={cn(
      type === 'web' ? 'w-6 h-6' : 'w-4 h-4',
      'rounded-full border-2 border-white hover:border-aqua-400'
    )}
    style={{ backgroundColor: color }}
  />
);

type ScreenDetailsProps = {
  data: {
    app: {
      slug: string;
      icon: string;
      name: string;
      tag_line: string;
    };
    tags: Array<{ id: number; attributes: { name: string } }>;
    components: Array<{ id: number; attributes: { name: string } }>;
    colors: string;
  };
  type: 'wide' | 'default';
};

const ScreenDetails = ({ data, type }: ScreenDetailsProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  return (
    <motion.div
      className={cn(
        type === 'wide' ? 'w-[1300px]' : 'w-[850px]',
        'bg-[#1F2937CC]/80 backdrop-blur-md px-6 py-4 flex flex-col gap-4 rounded-2xl overflow-hidden'
      )}
      initial={{ opacity: 0, height: 'auto' }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={data.app.icon} alt={data.app.name} />
              <AvatarFallback>{extractInitials(data.app.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-medium leading-8 text-white font-outfit">
                {data.app.name}
              </h3>
              {type === 'wide' && (
              <p className="text-[#8F94A1] font-poppins">{data.app.tag_line}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            className="bg-gray-600 p-2 rounded-full"
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          >
            {isDetailsOpen ? <Icon.Collapse3 /> : <Icon.Expand3 />}
            <p className="sr-only">{isDetailsOpen ? 'collapse' : 'expand'}</p>
          </button>
        </div>

        <TabsList>
          <TabsTrigger value="section" className="py-2 px-2.5 text-white rounded-[10px]">
            Section
          </TabsTrigger>
          <TabsTrigger value="fullPage" className="py-2 px-2.5 text-white rounded-[10px]">
            Full Page
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-end gap-4 font-medium whitespace-nowrap font-poppins">
          <Button
            size="md"
            className={cn(
              type === 'wide' ? 'px-4 py-2' : 'p-2',
              'rounded-full text-base font-medium bg-gray-600'
            )}
            variant="darkGray"
            isIconOnly={type !== 'wide'}
          >
            <Icon.Copy2 className="size-6" />
            {type === 'wide' && 'Copy'}
          </Button>
          <Button
            size="md"
            className={cn(
              type === 'wide' ? 'px-4 py-2' : 'p-2',
              'rounded-full text-base font-medium bg-gray-600'
            )}
            variant="darkGray"
            isIconOnly={type !== 'wide'}
          >
            <Icon.Download className="size-6" />
            {type === 'wide' && 'Download'}
          </Button>
          <Dropdown
            trigger={(
              <Button
                size="md"
                className="rounded-full p-2 bg-gray-600"
                variant="darkGray"
                isIconOnly
              >
                <Icon.EllipsisHorizontal className="size-6 text-white" />
              </Button>
          )}
            content="content"
            placement="end"
          />
          <Button
            size="md"
            className="rounded-full p-2 bg-gray-600"
            variant="darkGray"
            isIconOnly
          >
            <Icon.Close className="size-6" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            className="flex flex-wrap gap-y-6 gap-x-16"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {data.tags.length > 0 && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Tags</p>
                <div className="flex gap-2 flex-wrap">
                  {data.tags.map((tag) => (
                    <Tag key={tag.id} name={tag.attributes.name} onClick={() => {}} />
                  ))}
                </div>
              </div>
            )}
            {data.components.length > 0 && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Components</p>
                <div className="flex gap-2 flex-wrap">
                  {data.components.map((component) => (
                    <Tag
                      key={component.id}
                      name={component.attributes.name}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </div>
            )}
            {data.colors && (
              <div>
                <p className="text-slate-500 text-sm mb-2">Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {data.colors.split(',').map((color) => (
                    <ColorSquare key={color} color={color} type="web" />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ScreenDetails;
