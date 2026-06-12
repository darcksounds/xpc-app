import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // აუცილებლად import.meta.env და VITE_ თავში
  dataset: import.meta.env.VITE_SANITY_DATASET,     // და არა process.env
  useCdn: true, 
  apiVersion: '2026-06-12', 
})