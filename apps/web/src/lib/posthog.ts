import { PostHog } from 'posthog-node';

type PersistedProperty = Parameters<
  typeof posthogClient.setPersistedProperty
>[0];

export const posthogClient = new PostHog(
  'phc_jYoOf1N9FnaQ5DibUdEyhRk1OQkSbOh060noFGBNWYp',
  {
    host: 'https://app.posthog.com',
  },
);

export const distinctId = 'distinct_id' as PersistedProperty;

export const distinctIdValue = posthogClient.getPersistedProperty(distinctId);
