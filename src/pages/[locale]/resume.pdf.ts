import type { APIRoute } from "astro"

import { getEntry } from "astro:content"
import { useI18n } from "../../i18n/ui"

import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkPdf from "remark-pdf/node"
import { unified } from "unified"

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
