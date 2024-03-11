import { blog } from './blog';
import { blogIndex } from './blogIndex';
import { faq } from './faq';
import { form } from './form';
import { logo } from './logo';
import { mainPage } from './mainPage';
import { navbar } from './navbar';
import { page } from './page';

export const singletons = [blogIndex, mainPage, navbar, logo];

export const documents = [page, blog, faq, form, ...singletons];

export const internationalizedDocuments = [
  page,
  blog,
  faq,
  mainPage,
  form,
  blogIndex,
].map(({ name }) => name);


