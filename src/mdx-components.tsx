import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-8 font-display text-4xl tracking-tight text-ink" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-8 font-display text-2xl tracking-tight text-ink" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-4 text-base leading-7 text-ink/90" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-copper underline decoration-copper/40 underline-offset-4"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 leading-7" {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
