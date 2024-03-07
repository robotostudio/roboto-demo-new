'use client';
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextProps,
  PortableTextReactComponents,
} from '@portabletext/react';
import Link from 'next/link';
import { FC } from 'react';
import { ProcessedUrl } from '~/types';

export const CustomLinkResolver: FC<
  PortableTextMarkComponentProps<{
    _type: 'customLink';
    customLink?: ProcessedUrl;
  }>
> = ({ children, value }) => {
  const { href, openInNewTab } = value?.customLink ?? {};
  if (!href) return <span>Link Broken</span>;
  return (
    <span>
      <Link
        href={href}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : ''}
      >
        {children}
      </Link>
    </span>
  );
};

const nativeComponents: PortableTextReactComponents = {
  unknownList: () => <></>,
  unknownListItem: () => <></>,
  unknownMark: () => <></>,
  unknownType: () => <></>,
  unknownBlockStyle: () => <></>,
  hardBreak: () => <br />,
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    inline: ({ children }) => <span>{children}</span>,
  },
  types: {
    // image: NextImageResolver,
  },
  marks: {
    customLink: CustomLinkResolver,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

type PortableRichTextProps = {
  value?: PortableTextProps['value'];
};

export const RichText: FC<PortableRichTextProps> = ({ value }) => {
  if (!Array.isArray(value)) return <></>;
  return (
    <div className="prose-lg prose-slate prose-invert prose-headings:scroll-m-24 prose-headings:font-bold prose-headings:text-opacity-90 prose-p:text-opacity-80 prose-a:underline prose-a:decoration-dotted  prose-ol:list-decimal prose-ol:text-opacity-80 prose-ul:list-disc prose-ul:text-opacity-80">
      <PortableText
        onMissingComponent={(_args, { type }) => {
          console.log('missing components', type);
        }}
        components={nativeComponents}
        value={value}
      />
    </div>
  );
};
