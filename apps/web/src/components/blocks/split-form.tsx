import { FC } from 'react';
import { Form, SplitForm } from '~/schema';
import { SanityImage } from '../global/sanity-image';
import { FormBuilderBlock } from './form-builder';

export type SplitFormBlockProps = Omit<SplitForm, 'form'> & { form: Form };

export const SplitFormBlock: FC<SplitFormBlockProps> = ({ form, image, title }) => {
  return (
    <section className="flex items-center justify-center">
      <div className="grid max-w-6xl grid-cols-2 place-items-center">
        <div>
          <SanityImage image={image} className="aspect-video" />
        </div>
        <div className="flex items-center justify-center">
          <FormBuilderBlock {...form} title={title} />
        </div>
      </div>
    </section>
  );
};