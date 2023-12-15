import type { APIRoute } from "astro"

import { useI18n } from "../../i18n/ui"
import { getEntry } from "astro:content"

import { unified } from "unified"
import remarkPdf from "remark-pdf/node"
import remarkParse from "remark-parse"
import remarkMdx from "remark-mdx"

import { generateStaticPaths } from "../../i18n/ui"

export const getStaticPaths = generateStaticPaths

const mdxToPDF = unified()
  .use(remarkParse)
  .use(remarkMdx)
  .use(remarkPdf, {
    pageMargins: [10, 10, 10, 10],
    pageSize: "A4",
    output: "buffer",
  })

export const GET: APIRoute = async ({ url }) => {
  const { lang } = useI18n(url)

  const entry = await getEntry("resume", `${lang}/resume`)

  const comp = await mdxToPDF.process(entry.body)
  const result = (await comp.result) as Buffer

  return new Response(result, {
    headers: {
      ContentType: "application/pdf",
    },
  })
}
