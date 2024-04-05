// app/utils/gen-id.js
import { cache } from 'react';
import { uuidv7 } from 'uuidv7';

export const generateId = cache(() => {
  const id = uuidv7();
  return id;
});
