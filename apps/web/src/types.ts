import { Locale } from './config';
import { Blog, NavDropdownColumn, NavLink } from './schema';

export type PreviewProps<T> = {
  initialData: T;
  query: string;
  preview?: boolean;
  queryParams: Record<string, any>;
};

export type PageParams<T = Record<string, string>> = {
  params: T & { locale: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type PartialResponse<T> = Prettify<Partial<T>>;

export type PageComponentProps<T> = {
  data: PartialResponse<T>;
  preview?: boolean;
};

export type ProcessedUrl = {
  openInNewTab: boolean;
  href: string;
};

export type SanityButton = {
  _key: string;
  buttonText: string;
  icon?: { svg?: string };
  variant: 'default' | 'outline';
  url: ProcessedUrl;
};

export type SanityButtons = Array<SanityButton>;

export type NavbarLink =
  | (Omit<NavLink, 'url'> & {
      _key: string;
      url: ProcessedUrl;
    })
  | (Omit<NavDropdownColumn, 'columns'> & {
      _key: string;
      columns: Array<
        Omit<SanityButton, 'buttonText'> & {
          description?: string;
          title: string;
        }
      >;
    });

export type NavbarLinks = Array<NavbarLink>;

export type SanityImage = NonNullable<Blog['image']>;


export type SitemapProjection = {
  _updatedAt: string;
  slug: string;
};