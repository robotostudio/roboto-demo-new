'use client';
import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { GetBlogIndexDataQuery } from './blog-page-api';
import { SanityImage } from '~/components/global/sanity-image';
import Link from 'next/link';

export type BlogIndexPageProps = PageComponentProps<GetBlogIndexDataQuery>;

export const BlogIndexPage: FC<BlogIndexPageProps> = ({ data }) => {
  const { blogs, seo } = data ?? {};
  return (
    <main>
      <BlogGrid blogs={blogs ?? []} />
    </main>
  );
};

export type BlogGridProps = Pick<GetBlogIndexDataQuery, 'blogs'>;

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

export type BlogCardProps = { blog: GetBlogIndexDataQuery['blogs'][number] };

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  console.log('🚀 ~ blog:', blog);
  const { title, image, slug, description } = blog ?? {};
  return (
    <div className="flex items-center justify-center gap-4">
      <Link href={slug}>
        {image && (
          <div className="relative flex items-center">
            <SanityImage
              image={image}
              className="aspect-video"
              options={{
                loading: 'lazy',
                alt: title,
              }}
            />
          </div>
        )}
        <h2 className="mt-3 text-center">{title}</h2>
        <p className="text-backgroundGray mx-auto mt-1 line-clamp-2 max-w-xs overflow-hidden text-center text-xs">
          {description}
        </p>
      </Link>
    </div>
  );
};
