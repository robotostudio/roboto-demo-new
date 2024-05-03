'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { switchBucket } from '~/action/bucket';
import { Button } from '~/components/ui/button';

export const VariantSwitcher: FC = () => {
  const router = useRouter();

  return (
    <Button
      variant={'link'}
      className="text-slate-200"
      onClick={async () => {
        await switchBucket();
        router.refresh();
      }}
    >
      Switch Version
    </Button>
  );
};
