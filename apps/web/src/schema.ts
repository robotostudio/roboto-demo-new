import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen';

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: 'page';

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   * Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 100 and 320 characters.
   */
  description?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * pageBuilder — `pageBuilder`
   *
   *
   */
  pageBuilder?: PageBuilder;

  /**
   * language — `string`
   *
   *
   */
  language?: string;

  /**
   * SEO meta title override — `string`
   *
   * This will override the meta title. If left blank it will inherit the page title.
   */
  seoTitle?: string;

  /**
   * SEO meta description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  seoDescription?: string;

  /**
   * SEO image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  seoImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Do not index this page — `boolean`
   *
   * If checked, this content won't be indexed by search engines.
   */
  seoNoIndex?: boolean;

  /**
   * Hide from lists — `boolean`
   *
   * If checked, this content won't appear in any list pages.
   */
  seoHideFromLists?: boolean;

  /**
   * Open graph title override — `string`
   *
   * This will override the open graph title. If left blank it will inherit the page title.
   */
  ogTitle?: string;

  /**
   * Open graph description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  ogDescription?: string;

  /**
   * Card title override — `string`
   *
   * This will override the card title. If left blank it will inherit the description from the page title.
   */
  cardTitle?: string;

  /**
   * Card description override — `text`
   *
   * This will override the card description. If left blank it will inherit the description from the page description.
   */
  cardDescription?: string;

  /**
   * Card image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  cardImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * blog
 *
 *
 */
export interface Blog extends SanityDocument {
  _type: 'blog';

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };
}

/**
 * faq
 *
 *
 */
export interface Faq extends SanityDocument {
  _type: 'faq';

  /**
   * question — `string`
   *
   *
   */
  question?: string;
}

/**
 * blogIndex
 *
 *
 */
export interface BlogIndex extends SanityDocument {
  _type: 'blogIndex';

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   * Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 100 and 320 characters.
   */
  description?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * language — `string`
   *
   *
   */
  language?: string;

  /**
   * SEO meta title override — `string`
   *
   * This will override the meta title. If left blank it will inherit the page title.
   */
  seoTitle?: string;

  /**
   * SEO meta description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  seoDescription?: string;

  /**
   * SEO image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  seoImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Do not index this page — `boolean`
   *
   * If checked, this content won't be indexed by search engines.
   */
  seoNoIndex?: boolean;

  /**
   * Hide from lists — `boolean`
   *
   * If checked, this content won't appear in any list pages.
   */
  seoHideFromLists?: boolean;

  /**
   * Open graph title override — `string`
   *
   * This will override the open graph title. If left blank it will inherit the page title.
   */
  ogTitle?: string;

  /**
   * Open graph description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  ogDescription?: string;

  /**
   * Card title override — `string`
   *
   * This will override the card title. If left blank it will inherit the description from the page title.
   */
  cardTitle?: string;

  /**
   * Card description override — `text`
   *
   * This will override the card description. If left blank it will inherit the description from the page description.
   */
  cardDescription?: string;

  /**
   * Card image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  cardImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * mainPage
 *
 *
 */
export interface MainPage extends SanityDocument {
  _type: 'mainPage';

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Description — `text`
   *
   * Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 100 and 320 characters.
   */
  description?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * language — `string`
   *
   *
   */
  language?: string;

  /**
   * SEO meta title override — `string`
   *
   * This will override the meta title. If left blank it will inherit the page title.
   */
  seoTitle?: string;

  /**
   * SEO meta description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  seoDescription?: string;

  /**
   * SEO image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  seoImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Do not index this page — `boolean`
   *
   * If checked, this content won't be indexed by search engines.
   */
  seoNoIndex?: boolean;

  /**
   * Hide from lists — `boolean`
   *
   * If checked, this content won't appear in any list pages.
   */
  seoHideFromLists?: boolean;

  /**
   * Open graph title override — `string`
   *
   * This will override the open graph title. If left blank it will inherit the page title.
   */
  ogTitle?: string;

  /**
   * Open graph description override — `text`
   *
   * This will override the meta description. If left blank it will inherit the description from the page description.
   */
  ogDescription?: string;

  /**
   * Card title override — `string`
   *
   * This will override the card title. If left blank it will inherit the description from the page title.
   */
  cardTitle?: string;

  /**
   * Card description override — `text`
   *
   * This will override the card description. If left blank it will inherit the description from the page description.
   */
  cardDescription?: string;

  /**
   * Card image override — `image`
   *
   * This will override the main image. If left blank it will inherit the image from the main image.
   */
  cardImage?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

export type PageBuilder = Array<SanityKeyed<Hero> | SanityKeyed<Cta>>;

export type Hero = {
  _type: 'hero';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * description — `string`
   *
   *
   */
  description?: string;
};

export type Cta = {
  _type: 'cta';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * subtitle — `string`
   *
   *
   */
  subtitle?: string;
};

export type Documents = Page | Blog | Faq | BlogIndex | MainPage;
