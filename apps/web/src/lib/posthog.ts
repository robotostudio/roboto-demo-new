import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { PostHog } from 'posthog-node';
import { generateId } from './gen-id';

export function PostHogClient() {
  const posthogClient = new PostHog(
    'phc_jYoOf1N9FnaQ5DibUdEyhRk1OQkSbOh060noFGBNWYp',
    {
      host: 'https://app.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    },
  );
  return posthogClient;
}

export const userDistinctId = () => {
  const cookie = cookies().get('user-id');
  if (cookie?.value) {
    return cookie.value;
  }
  return randomUUID();
};

export async function getFeatureFlag(key: string) {
  const posthogClient = PostHogClient();
  return await posthogClient.getFeatureFlag(key, userDistinctId());
}

export async function getBootstrapData() {
  let distinct_id = '';
  const phProjectAPIKey = 'phc_jYoOf1N9FnaQ5DibUdEyhRk1OQkSbOh060noFGBNWYp';
  // const phCookieName = `ph_${phProjectAPIKey}_posthog`;
  const cookieStore = cookies();
  // const phCookie = cookieStore.get(phCookieName);

  // if (phCookie) {
  //   const phCookieParsed = JSON.parse(phCookie.value);
  //   distinct_id = phCookieParsed.distinct_id;
  // }
  // if (!distinct_id) {
  //   distinct_id = generateId();
  // }

  const userId = cookieStore.get('user-id');
  if (userId?.value) {
    distinct_id = userId.value;
  }

  const client = new PostHog(phProjectAPIKey, {
    host: 'https://app.posthog.com',
  });
  const flags = await client.getAllFlags(distinct_id);
  const bootstrap = {
    distinctID: distinct_id,
    featureFlags: flags,
  };

  return bootstrap;
}