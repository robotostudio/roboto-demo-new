'use client';
import { FC, useState } from 'react';
import { Form, FormFields, FormField as IFormField } from '~/schema';
import { Input } from '../global/input';
import { PortableRichTextNative } from '../global/richText';
import { FormSubmitButton } from '../global/buttons';
import { formBuilderResponseHandler } from '~/action/formspark';
import { useFormState } from 'react-dom';
import { CheckCircle } from 'lucide-react';

export const INITIAL = {
  message: '',
  hasError: false,
  isComplete: false,
};
export type Initial = typeof INITIAL;

type Wrapper = {
  field: NonNullable<Form['fields']>[number];
};

const FormFieldWrapper: FC<Wrapper> = ({ field }) => {
  const { _type } = field ?? {};
  if (_type === 'formField') {
    return <FormField field={field as IFormField} />;
  }
  return <FormFieldRow {...(field as FormFields)} />;
};

const FormFieldRow: FC<FormFields> = ({ fields }) => {
  return (
    <div className="flex w-full gap-4">
      {Array.isArray(fields) &&
        fields.map((field) => <FormField field={field} key={field?._key} />)}
    </div>
  );
};

const FormField: FC<{ field: IFormField }> = ({ field }) => {
  return <Input field={field} />;
};

export const FormBuilderBlock: FC<Form> = ({
  fields,
  title,
  formId,
  buttonText = 'Submit',
}) => {
  const _action = formBuilderResponseHandler.bind(null, formId ?? '');

  const [tcCheck, setTcCheck] = useState(false);

  const [state, action] = useFormState(_action, INITIAL);

  if (!state.hasError && state.isComplete)
    return (
      <div className="flex w-full max-w-7xl" id="form">
        <div className="my-10 flex w-full items-center justify-center gap-4 rounded-lg bg-gray-200 p-4 text-black ">
          <CheckCircle />
          Form Submitted
        </div>
      </div>
    );

  return (
    <div
      className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32"
      id="form"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
      </div>

      <form
        action={action}
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
      >
        {Array.isArray(fields) &&
          fields.map((field) => (
            <FormFieldWrapper field={field} key={field?._key} />
          ))}

        <div className="mt-4 flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="policy"
              name="policy"
              onChange={() => {
                setTcCheck(!tcCheck);
              }}
              type="checkbox"
              className="text-hotpink-500 focus:ring-hotpink-500 h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-1 inline-block text-red-600">*</span>
          </div>
          <label className="flex text-sm leading-6" htmlFor="policy">
            <div className="inline-block text-sm">
              <span className="block font-bold">
                I agree to receive other communications.
              </span>
              <span>
                You can unsubscribe from these communications at any time. For
                more information on how to unsubscribe, our privacy practices,
                and how we are committed to protecting and respecting your
                privacy
              </span>
            </div>
          </label>
        </div>
        <FormSubmitButton disabled={!tcCheck}>{buttonText}</FormSubmitButton>
      </form>
    </div>
  );
};
