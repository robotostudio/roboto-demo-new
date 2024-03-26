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
   * Description — `text`
   *
   * Page descriptions shouldn't be too long or too short. Long page descriptions will only be partially shown in search results and short descriptions are unlikely to to be helpful to users. We recommend page descriptions are between 130 and 160 characters for best SEO practice
   */
  description?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string };

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * richText — `richText`
   *
   *
   */
  richText?: RichText;

  /**
   * language — `string`
   *
   *
   */
  language?: string;

  /**
   * pageBuilder — `pageBuilder`
   *
   *
   */
  pageBuilder?: PageBuilder;

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
 * form
 *
 *
 */
export interface Form extends SanityDocument {
  _type: 'form';

  /**
   * label — `string`
   *
   *
   */
  label?: string;

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * FormSpark Form Id — `string`
   *
   *
   */
  formId?: string;

  /**
   * language — `string`
   *
   *
   */
  language?: string;

  /**
   * fields — `array`
   *
   *
   */
  fields?: Array<SanityKeyed<FormField>>;

  /**
   * buttonText — `string`
   *
   *
   */
  buttonText?: string;
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
 * Navbar
 *
 *
 */
export interface Navbar extends SanityDocument {
  _type: 'navbar';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * links — `array`
   *
   *
   */
  links?: Array<SanityKeyed<NavLink> | SanityKeyed<NavDropdownColumn>>;

  /**
   * Call to Action — `array`
   *
   *
   */
  buttons?: Array<SanityKeyed<Button>>;
}

/**
 * logo
 *
 *
 */
export interface Logo extends SanityDocument {
  _type: 'logo';

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

/**
 * Navbar
 *
 *
 */
export interface Footer extends SanityDocument {
  _type: 'footer';

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * links — `array`
   *
   *
   */
  links?: Array<SanityKeyed<NavLink>>;
}

export type PageBuilder = Array<
  | SanityKeyed<Hero>
  | SanityKeyed<Cta>
  | SanityKeyed<SplitForm>
  | SanityKeyed<ImageCarousel>
  | SanityKeyed<DynamicIntro>
>;

export type NavLink = {
  _type: 'navLink';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * url — `customUrl`
   *
   *
   */
  url?: CustomUrl;
};

export type CustomUrl = {
  _type: 'customUrl';
  /**
   * type — `string`
   *
   *
   */
  type?: 'internal' | 'external';

  /**
   * Open in new tab — `boolean`
   *
   * If checked, the link will open in a new tab.
   */
  openInNewTab?: boolean;

  /**
   * URL — `string`
   *
   *
   */
  external?: string;

  /**
   * href — `string`
   *
   *
   */
  href?: string;

  /**
   * internal — `reference`
   *
   *
   */
  internal?: SanityReference<Page | BlogIndex | Blog | MainPage>;
};

export type Button = {
  _type: 'button';
  /**
   * variant — `string`
   *
   *
   */
  variant?: 'default' | 'secondary' | 'outline' | 'link';

  /**
   * Icon — `iconPicker`
   *
   *
   */
  icon?: IconPicker;

  /**
   * Button Text — `string`
   *
   *
   */
  buttonText?: string;

  /**
   * Url — `customUrl`
   *
   *
   */
  url?: CustomUrl;
};

export type NavLinkColumn = {
  _type: 'navLinkColumn';
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Icon — `iconPicker`
   *
   *
   */
  icon?: IconPicker;

  /**
   * Descriptions — `string`
   *
   *
   */
  description?: string;

  /**
   * url — `customUrl`
   *
   *
   */
  url?: CustomUrl;
};

export type NavDropdownColumn = {
  _type: 'navDropdownColumn';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * columns — `array`
   *
   *
   */
  columns?: Array<SanityKeyed<NavLinkColumn>>;
};

export type RichText = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image';
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Caption Text — `string`
       *
       *
       */
      caption?: string;

      /**
       * Alt Text — `string`
       *
       *
       */
      alt?: string;
    }>
>;

export type FormField = {
  _type: 'formField';
  /**
   * Required — `boolean`
   *
   *
   */
  required?: boolean;

  /**
   * Field Name — `string`
   *
   *
   */
  fieldName?: string;

  /**
   * Placeholder — `string`
   *
   *
   */
  placeholder?: string;

  /**
   * fieldId — `string`
   *
   *
   */
  fieldId?: string;

  /**
   * Input Type — `string`
   *
   *
   */
  inputType?: 'text' | 'email' | 'phone' | 'textArea' | 'file' | 'checkbox';

  /**
   * checkboxFields — `object`
   *
   *
   */
  checkboxFields?: {
    _type: 'checkboxFields';
    /**
     * checkboxTitle — `string`
     *
     *
     */
    checkboxTitle?: string;

    /**
     * items — `array`
     *
     *
     */
    items?: Array<
      SanityKeyed<{
        /**
         * Required — `boolean`
         *
         *
         */
        required?: boolean;

        /**
         * label — `string`
         *
         *
         */
        label?: string;

        /**
         * description — `string`
         *
         *
         */
        description?: string;

        /**
         * value — `string`
         *
         *
         */
        value?: string;
      }>
    >;
  };
};

export type FormFields = {
  _type: 'formFields';
  /**
   * fields — `array`
   *
   * This is a way of bundling multiple form fields together
   */
  fields?: Array<SanityKeyed<FormField>>;
};

export type Hero = {
  _type: 'hero';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Is It a <h1>? — `boolean`
   *
   *
   */
  isTitleH1?: boolean;

  /**
   * richText — `richText`
   *
   *
   */
  richText?: RichText;

  /**
   * buttons — `array`
   *
   *
   */
  buttons?: Array<SanityKeyed<Button>>;
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
   * richText — `richText`
   *
   *
   */
  richText?: RichText;

  /**
   * buttons — `array`
   *
   *
   */
  buttons?: Array<SanityKeyed<Button>>;
};

export type SplitForm = {
  _type: 'splitForm';
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

  /**
   * form — `reference`
   *
   *
   */
  form?: SanityReference<Form>;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
};

export type ImageCarousel = {
  _type: 'imageCarousel';
  /**
   * eyebrow — `string`
   *
   *
   */
  eyebrow?: string;

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * richText — `richText`
   *
   *
   */
  richText?: RichText;

  /**
   * buttons — `array`
   *
   *
   */
  buttons?: Array<SanityKeyed<Button>>;

  /**
   * carousel — `array`
   *
   *
   */
  carousel?: Array<SanityKeyed<CarouselField>>;
};

export type DynamicIntro = {
  _type: 'dynamicIntro';
  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * richText — `richText`
   *
   *
   */
  richText?: RichText;

  /**
   * buttons — `array`
   *
   *
   */
  buttons?: Array<SanityKeyed<Button>>;
};

export type CarouselField = {
  _type: 'carouselField';
  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: 'image';
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * caption — `string`
   *
   *
   */
  caption?: string;
};

export type Documents =
  | Page
  | Blog
  | Form
  | BlogIndex
  | MainPage
  | Navbar
  | Logo
  | Footer;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type IconPicker = any;
