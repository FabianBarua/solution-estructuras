import { db, Products, Categories } from 'astro:db'

const getCategories = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/categories')
  const data = await res.json()
  const categoriesJson = data.slice(0, 5).map((category, index) => {
    return {
      id: category.id,
      name: category.name
    }
  }
  )
  return categoriesJson
}

// get 10 products for each category
const products = async ({ categories }) => {
  const products = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${category.id}&offset=0&limit=10`)
      const data = await res.json()

      const fixImageUrl = (url) => {
        // algunas url estan mal, ejemplo src="["https://i.imgur.com/w3Y8NwQ.jpeg"]"

        if (url && url.includes('["')) {
          const fixedUrl = url.replace('["', '').replace('"]', '')
          return fixedUrl
        }

        return url
      }

      const productsJson = data.map((product) => {
        return {
          id: product.id,
          name: product.title,
          shortName: product.title.split(' ')[0],
          price: product.price,
          description: product.description,
          imageUrl: fixImageUrl(product.images[0]) || null,
          imageUrl2: fixImageUrl(product.images[1]) || null,
          imageUrl3: fixImageUrl(product.images[2]) || null,
          imageAlt: fixImageUrl(product.images[0]) || null,
          categoryId: category.id,
          showAtHome: false
        }
      }
      )
      return productsJson
    }
    )
  )

  const productsArray = products.flat()

  return productsArray
}

export default async function () {
  const categories = await getCategories()
  const productsArray = await products({ categories })

  await db.insert(Categories).values(
    categories
  )

  await db.insert(Products).values(
    productsArray
  )
}
