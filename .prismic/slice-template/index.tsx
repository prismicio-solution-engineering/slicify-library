import type { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

export type {{componentName}}Props = SliceComponentProps<Content.{{pascalId}}Slice>

export default function {{componentName}}({ slice }: {{componentName}}Props) {
  return (
    <section>
      <PrismicRichText
        field={slice.primary.title}
        fallback={`Placeholder component for "${slice.slice_type}" Slices (variation: "${slice.variation}")`}
      />
    </section>
  )
}
