// 1. Import utilities from `astro:content`
import { z } from "astro/zod"
import { defineCollection } from "astro:content"
// 2. Define your collection(s)
const presentationCollection = defineCollection({
  type: "content",
})

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  presentation: presentationCollection,
}
