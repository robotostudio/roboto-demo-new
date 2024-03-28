import Link from 'next/link';
import { FC } from 'react';
import Balancer from 'react-wrap-balancer';
import { RichText } from '~/components/global/richText';
import { SanityImage } from '~/components/global/sanity-image';
import {
  GetBlogIndexDataQueryResult,
  GetBlogPageDataQueryResult,
} from '~/sanity.types';
import { PageComponentProps } from '~/types';

export type BlogIndexPageProps =
  PageComponentProps<GetBlogIndexDataQueryResult>;

export const BlogIndexPage: FC<BlogIndexPageProps> = ({ data }) => {
  const { blogs } = data ?? {};
  return (
    <main>
      <BlogGrid blogs={blogs ?? []} />
    </main>
  );
};

export type BlogGridProps = Pick<GetBlogIndexDataQueryResult, 'blogs'>;

export const BlogGrid: FC<BlogGridProps> = ({ blogs }) => {
  if (!Array.isArray(blogs)) return <></>;
  return (
    <div className="my-10 px-4 lg:px-10">
      <h1 className="mb-8 text-center text-3xl">Our Latest Blog</h1>
      <div className="my-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export type BlogCardProps = {
  blog: GetBlogIndexDataQueryResult['blogs'][number];
};

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const { title, image, slug, description } = blog ?? {};
  return (
    <div className="flex items-start justify-center gap-4 ">
      {slug && (
        <Link href={slug}>
          {image && (
            <div className="relative flex items-center">
              <SanityImage
                image={image}
                className="aspect-video"
                options={{
                  loading: 'lazy',
                  alt: title ?? slug,
                }}
              />
            </div>
          )}
          <h2 className="mt-3 text-center font-bold">{title}</h2>
          <p className="text-backgroundGray mx-auto mt-1 line-clamp-2 max-w-xs overflow-hidden text-center text-xs">
            {description}
          </p>
        </Link>
      )}
    </div>
  );
};

export type BlogSlugPageProps = PageComponentProps<GetBlogPageDataQueryResult>;

export const BlogSlugPage: FC<BlogSlugPageProps> = ({ data }) => {
  const { richText, title, image, description, _createdAt } = data ?? {};
  return (
    <main className="animate-fade-up-slow mb-32 mt-12 md:mb-56">
      <div className="container">
        <div className="mx-auto mb-12 flex max-w-[500px] flex-col text-center">
          {_createdAt && (
            <b className="mb-4 text-sm font-normal">
              {new Date(_createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </b>
          )}
          <h1 className="animate-fade-up-slow my-4 text-lg">
            <Balancer>{title}</Balancer>
          </h1>
          <p>{description}</p>
        </div>
        <div>
          <div className="relative mb-20 md:mb-[100px]">
            <SanityImage image={image} />
          </div>
          <RichText value={richText} />
        </div>
      </div>
    </main>
  );
};
