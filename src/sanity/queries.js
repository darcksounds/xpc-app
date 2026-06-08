import { client } from './client'

export async function getProducts() {
  return client.fetch(`
    *[_type == "product"] {
      _id, name, brand, price, inStock,
      category->{name, slug},
      specs,
      "images": images[].asset->url
    }
  `)
}

export async function getProductsByCategory(slug) {
  return client.fetch(`
    *[_type == "product" && category->slug.current == $slug] {
      _id, name, brand, price, inStock,
      specs,
      "images": images[].asset->url
    }
  `, { slug })
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      _id, name,
      "slug": slug.current
    }
  `)
}
export async function getProductById(id) {
  return client.fetch(`
    *[_type == "product" && _id == $id][0] {
      _id, name, brand, price, inStock,
      category->{name, slug},
      specs,
      "images": images[].asset->url
    }
  `, { id })
}