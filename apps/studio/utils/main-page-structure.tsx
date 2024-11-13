import { getFlag, getTitleCase } from './helper';
import { File, type LucideIcon } from 'lucide-react';
import type { SchemaType, SingletonType } from '../schemaTypes';
import { API_VERSION } from './constant';
import type {
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';
import { FlagComponent } from './flag';

type Base<T = SchemaType> = {
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

const previewTypes = ['page', 'blog', 'mainPage'];

type MainPageTranslations = {
  language: string;
  _id: string;
  title: string;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

type CreateList = {
  S: StructureBuilder;
} & Base;

export const createMainPageIndexListWithTranslations = async ({
  S,
  type,
  title,
  icon,
  context,
}: CreateSingleTon & { context: StructureResolverContext }) => {
  const { getClient } = context;

  const client = getClient({
    apiVersion: API_VERSION,
  });

  const mainPageTranslations = await client.fetch<
    MainPageTranslations[]
  >(`*[_type == "mainPage"  && !(_id in path("drafts.**")) ]{
      language,
      _id,
      title
    }`);
  const list = mainPageTranslations.map((item) => {
    return S.listItem()
      .title(item.title)
      .icon(() => <FlagComponent lang={item.language} />)
      .id(item._id)
      .child(S.document().schemaType(type).documentId(item._id));
  });

  const newTitle = title ?? getTitleCase(type);

  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(
      S.list()
        .title(newTitle)
        .items([...list]),
    );
};

export const createListWithTranslations = async ({
  S,
  type,
  icon,
  title,
  context,
}: CreateList & { context: StructureResolverContext }) => {
  const { getClient } = context;
  const client = getClient({ apiVersion: API_VERSION });

  const languages = await client.fetch<string[]>(
    'array::unique(*[_type == $type].language)',
    { type },
    {},
  );
  const newTitle = title ?? getTitleCase(type);
  console.log('🚀 ~ languages:', languages);

  const list = languages.map((lang) => {
    const listTitle = `${lang} Pages`;
    return S.listItem()
      .title(listTitle)
      .icon(() => <>{getFlag(lang)}</>)
      .id(lang)
      .child(
        S.documentList()
          .title(newTitle)
          .id(lang)
          .schemaType(type)
          .filter(`_type == "${type}" && language == "${lang}"`),
      );
  });

  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(
      S.list()
        .title(newTitle)
        .items([
          ...list,
          S.divider(),
          S.listItem()
            .title('All Pages')
            .child(
              S.documentList()
                .title(newTitle)
                .schemaType(type)
                .filter(`_type == "${type}"`),
            ),
        ]),
    );
};
