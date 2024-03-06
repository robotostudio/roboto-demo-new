import { blog } from './blog';
import { blogIndex } from './blogIndex';
import { faq } from './faq';
import { mainPage } from './mainPage';
import { navbar } from './navbar';
import { page } from './page';

export const singletons = [blogIndex, mainPage, navbar];

export const documents = [page, blog, faq, ...singletons];

export const internationalizedDocuments = [
  page,
  blog,
  faq,
  mainPage,
  blogIndex,
].map(({ name }) => name);


