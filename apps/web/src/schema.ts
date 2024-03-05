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
   * description — `text`
   *
   *
   */
  description?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };
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
   * description — `text`
   *
   *
   */
  description?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };
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
   * description — `text`
   *
   *
   */
  description?: string;

  /**
   * slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };
}

export type Documents = Page | Blog | Faq | BlogIndex | MainPage;
