export type PreviewProps<T> = {
  initialData: T;
  query: string;
  preview?: boolean;
  queryParams: Record<string, any>;
};

export type DynamicPage<T = { slug: string }> = {
  params: T;
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
