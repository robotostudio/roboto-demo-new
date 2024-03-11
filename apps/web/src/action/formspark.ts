'use server';

import axios from 'axios';
import { extractFormData } from '~/lib/helper';

export async function formBuilderResponseHandler<T>(
  formId: string,
  state: T,
  form: FormData,
) {
  if (!formId) {
    return {
      message: 'Form field missing',
      hasError: true,
      isComplete: false,
    };
  }

  const extractData = extractFormData(form);

  await axios.post(`https://submit-form.com/${formId}`, {
    ...extractData,
    type: 'formBuilderResponse',
  });

  return { message: 'done', hasError: false, isComplete: true };
}
