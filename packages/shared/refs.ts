/* eslint-disable unicorn/prevent-abbreviations */
import type { Ref, ComponentPublicInstance } from 'vue-demi';
import { unref } from 'vue-demi';

export type MaybeRef<T> = T | Ref<T>;
export type MaybeElementRef = MaybeRef<HTMLElement | ComponentPublicInstance | undefined | null>;

export function unrefElement(ref: MaybeElementRef): HTMLElement | undefined {
  const plain = unref(ref);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}