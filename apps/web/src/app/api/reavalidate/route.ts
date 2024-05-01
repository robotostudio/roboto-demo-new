// ./src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { Locale, getSanityTags } from '~/config';

type WebhookPayload = {
  _type: string;
  slug?: {
    current?: string;
  };
  language?: Locale;
};

export async function POST(req: NextRequest) {
  try {
      console.log(
        '🚀 ~ POST ~ body:',
        req.headers.get('sanity-webhook-signature'),
        process.env.SANITY_REVALIDATE_SECRET,
      );
      const { isValidSignature, body } = await parseBody<WebhookPayload>(
        req,
        process.env.SANITY_REVALIDATE_SECRET,
      );


    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type || !body?.slug?.current) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const tags = getSanityTags(body._type, body?.language);
    console.log('🚀 ~ POST ~ tags:', tags);

    revalidateTag(body._type);
    const staleRoute = `/${body.slug.current}`;
    revalidatePath(staleRoute);
    const message = `Updated route: ${staleRoute}`;
    return NextResponse.json({ body, message });
  } catch (err: any) {
    console.error(err);
    return new Response(err?.message, { status: 500 });
  }
}
