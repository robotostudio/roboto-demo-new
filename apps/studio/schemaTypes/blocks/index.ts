import { cta } from './cta';
import { dynamicIntro } from './dynamicIntro';
import { hero } from './hero';
import { carouselField, imageCarousel } from './image-carousel';
import { splitForm } from './split-form';
import { splitHero } from './splitHero';
// import {} from "sanity-plugin-roboto-ab-test"

export const pagebuilderBlocks = [
  hero,
  cta,
  splitForm,
  imageCarousel,
  dynamicIntro,
  splitHero,
];

export const blocks = [...pagebuilderBlocks, carouselField];
