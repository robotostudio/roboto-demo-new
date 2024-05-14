import { FC } from 'react';
import { AbTestPagebuilder } from '~/sanity.types';
import { ABTestPageBuilderBlock } from '../pagebuilder';

export type ABTestWrapperProps = AbTestPagebuilder & {
  bucket?: string;
};

export const ABTestWrapper: FC<ABTestWrapperProps> = ({
  variants,
  bucket = 'control',
}) => {
  if (!Array.isArray(variants)) return <></>;
  if (variants?.length !== 2) return <></>;
  const [control, variant] = variants;

  return (
    <section>
      <ABTestPageBuilderBlock
        pageBuilder={[bucket === 'control' ? control : variant]}
      />
    </section>
  );
};
