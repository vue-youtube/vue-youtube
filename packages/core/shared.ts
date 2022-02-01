import type { Ref } from 'vue-demi';

export type MaybeRef<T> = T | Ref<T>;
export type MaybeElementRef = MaybeRef<HTMLElement | null>;

export const hostNoCookie = 'https://www.youtube-nocookie.com';
export const hostCookie = 'https://www.youtube.com';

export const nullCallback = () => { return; };