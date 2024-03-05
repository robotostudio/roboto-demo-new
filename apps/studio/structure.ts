import { File, HomeIcon, LucideIcon } from 'lucide-react';
import {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';
import { getTitleCase } from './utils/helper';
import { SchemaType, SingletonType } from './schemaTypes';

type Base<T = SchemaType> = {
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

// This function creates a single item in the list. It takes a StructureBuilder instance (S),
// a type, a title, and an icon as parameters. If the title or icon is not provided, it
// generates a default title or uses a default icon. It then returns a list item with the
// provided or generated title and icon, and a child document with a form view and the provided type.

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(
      S.document().views([S.view.form()]).schemaType(type).documentId(type),
    );
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
};

// This function creates a list item for an index. It takes a StructureBuilder instance (S),
// an index object, and a list object as parameters. It generates a title for the index and
// list if they are not provided, and uses a default icon if not provided. It then returns a
// list item with the generated or provided title and icon, and a child list with list items
// for the index and list.
const createIndexList = ({ S, index, list }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? File)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type),
            ),
          S.documentTypeListItem(list.type)
            .title(`${listTitle}s`)
            .icon(list.icon ?? File),
        ]),
    );
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .title(newTitle)
    .icon(icon ?? File);
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title('Content')
    .items([
      createSingleTon({ S, type: 'mainPage', icon: HomeIcon }),
      S.divider(),
      createList({ S, type: 'page' }),
      createList({ S, type: 'faq' }),
      createIndexList({
        S,
        index: { type: 'blogIndex' },
        list: { type: 'blog' },
      }),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, context) =>
  S.document().views([
    S.view.form(),
    // S.view.component(PreviewIFrame).options({ context }).title('Preview'),
  ]);
