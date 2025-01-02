// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
// 2. Define your collection(s)
const resumeCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/resume" }),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  resume: resumeCollection,
}
