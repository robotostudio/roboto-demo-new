import { useMemo } from 'react';
import { SanityDocument, useValidationStatus } from 'sanity';
import { DefaultDocumentNodeContext } from 'sanity/structure';
import { resolvePreviewUrl } from '../resolve-preview-url';

export type PreviewIframeOptions = {
  ctx: Omit<DefaultDocumentNodeContext, 'documentId'> & { documentId: string };
  document: Partial<SanityDocument>;
};

export const usePreviewIframe = ({ ctx, document }: PreviewIframeOptions) => {
  const { schemaType, documentId } = ctx;

  const validation = useValidationStatus(documentId, schemaType);
  console.log('🚀 ~ usePreviewIframe ~ validation:', validation, document);

  const status = useMemo(() => {
    if (validation.isValidating) {
      return {
        loading: false,
        hasErrors: false,
      };
    } else {
      return {
        loading: false,
        hasErrors: validation.validation.some(
          (error) => error.level === 'error',
        ),
        errors: validation.validation
          .filter((error) => error.level === 'error')
          .map((error) => `${error.path.join('.')}: ${error.message}`),
      };
    }
  }, [validation.isValidating]);

  const previewUrl = useMemo(() => {
    if (!document) return '';
    return resolvePreviewUrl(document as SanityDocument);
  }, []);

  return {
    ...status,
    previewUrl,
  };
};
