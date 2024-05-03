'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function removeBucket() {
  cookies().delete('user-bucket');
  const path = cookies().get('path')?.value ?? '/';

  redirect(path);
  return;
}

export async function switchBucket() {
  const userBucket = cookies().get('user-bucket');
  if (userBucket?.value === 'control') {
    cookies().set('user-bucket', 'variant');
  } else {
    cookies().set('user-bucket', 'control');
  }
}
