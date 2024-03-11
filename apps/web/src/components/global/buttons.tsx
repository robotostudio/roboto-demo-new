import Link from 'next/link';
import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '~/lib/utils';
import { SanityButtons } from '~/types';
import { Button, ButtonProps } from '../ui/button';

export type ButtonsProps = {
  buttons?: SanityButtons;
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
} & ButtonProps;

export const Buttons: FC<ButtonsProps> = ({
  buttons,
  wrapperProps,
  ...props
}) => {
  if (!Array.isArray(buttons)) return <></>;
  return (
    <div
      {...wrapperProps}
      className={cn('flex w-full items-center gap-4', wrapperProps?.className)}
    >
      {buttons.map((button) => (
        <Link
          href={button.url.href}
          key={button._key}
          target={button.url.openInNewTab ? '_blank' : '_self'}
        >
          <Button key={button._key} {...props} variant={button?.variant}>
            {button.buttonText}
          </Button>
        </Link>
      ))}
    </div>
  );
};
