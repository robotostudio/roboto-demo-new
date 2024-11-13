import { getFlag } from './helper';

export const FlagComponent = ({ lang }: { lang: string }) => {
  return <span>{getFlag(lang)}</span>;
};
