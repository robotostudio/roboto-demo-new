import { cookies } from 'next/headers';
import { FC } from 'react';
import { VariantSwitcher } from './footer-bucket-client';

export const UserVersion: FC = () => {
  const bucket = cookies().get('user-bucket')?.value ?? 'control';

  return (
    <div className="flex flex-col items-center gap-4 text-xs text-slate-200">
      <div>
        You&apos;re now viewing{' '}
        {bucket === 'control' ? 'Version A' : 'Version B'} of this page.
      </div>
      <div className="flex gap-4">
        <VariantSwitcher />
      </div>
    </div>
  );
};
