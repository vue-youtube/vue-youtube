/* eslint-disable unicorn/prevent-abbreviations */
import type { MaybeRef, ComponentPublicInstance } from 'vue';
import { unref } from 'vue';

export type MaybeElementRef = MaybeRef<HTMLElement | ComponentPublicInstance | undefined | null>;

export function unrefElement(ref: MaybeElementRef): HTMLElement | undefined {
  const plain = unref(ref);
  return (plain as ComponentPublicInstance)?.$el ?? plain;
}
