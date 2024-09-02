import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Spinner } from '@/components/UI/spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none shadow-button',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-aqua-400 to-aqua-600 text-primary-foreground ring-aqua-700 hover:to-aqua-800 active:ring-2 active:hover:to-aqua-600 disabled:from-gray-500 disabled:to-gray-600',
        secondary: 'bg-secondary text-secondary-foreground ring-aqua-900 hover:bg-aqua-900 active:ring-2 active:hover:bg-secondary disabled:bg-gray-800 disabled:text-gray-700',
        strocked: 'border border-aqua-400 bg-slate-950 text-white hover:bg-slate-900 active:bg-gradient-to-b active:from-[#020617] active:to-[#0F172A] active:hover:bg-slate-950 disabled:border-gray-700 disabled:bg-gray-800 disabled:text-gray-700',
        link: 'bg-transparent text-primary hover:text-aqua-600 active:text-aqua-800 disabled:text-gray-700 shadow-none',
        liteGray: 'disable:ring-0 bg-gray-100 text-gray-700 ring-gray-700 hover:bg-gray-400 hover:text-gray-800 active:ring-2 active:hover:bg-gray-100 disabled:bg-gray-500',
        darkGray: 'bg-gray-800 text-white ring-gray-600 hover:bg-gray-700 active:ring-2 active:hover:bg-gray-800 disabled:bg-gray-500 disabled:text-gray-600',
      },
      size: {
        sm: 'h-9 gap-1 rounded-xl px-3 py-2 text-sm',
        md: 'h-10 gap-2 rounded-xl px-3.5 py-2.5 text-sm',
        lg: 'h-11 gap-1.5 rounded-xl px-4 py-2.5 text-base',
        xl: 'h-12 gap-1.5 rounded-xl px-[1.375rem] py-2.5 text-base',
        '2xl': 'h-16 gap-2.5 rounded-xl px-[1.125rem] py-2.5 text-lg',
        '3xl': 'h-20 gap-2.5 rounded-xl px-[1.125rem] py-3 text-2xl',
      },
      isIconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { isIconOnly: true, size: 'sm', className: 'size-9 min-w-9' },
      { isIconOnly: true, size: 'md', className: 'size-10 min-w-10' },
      { isIconOnly: true, size: 'lg', className: 'size-11 min-w-11' },
      { isIconOnly: true, size: 'xl', className: 'size-12 min-w-12' },
      { isIconOnly: true, size: '2xl', className: 'size-[3.75rem] min-w-[3.75rem]' },
      { isIconOnly: true, size: '3xl', className: 'size-20 min-w-20' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isIconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className, variant, size, asChild = false, isIconOnly = false, loading = false, href, ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    if (href) { // Check if href prop exists
      return (
        <Link href={href} passHref>
          <Comp
            className={cn(buttonVariants({
              variant, size, isIconOnly, className
            }))}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {loading ? (
              <div className="flex size-8">
                <div className="relative size-8">
                  <div className="size-full rounded-full absolute border-[3px] border-solid border-transparent" />
                  <div className="size-full rounded-full animate-spin absolute border-[3px] border-solid border-transparent border-t-aqua-500" />
                </div>
              </div>
            ) : (
              props.children
            )}
          </Comp>
        </Link>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({
          variant, size, isIconOnly, className
        }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Spinner />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
export default Button;
