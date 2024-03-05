import { blog } from './blog';
import { blogIndex } from './blogIndex';
import { faq } from './faq';
import { mainPage } from './mainPage';
import { page } from './page';

export const singletons = [blogIndex, mainPage];

export const documents = [page, blog, faq, ...singletons];
