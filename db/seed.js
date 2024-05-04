import { db, Products, Categories } from 'astro:db'

const getCategories = async () => {
  const res = await fetch('https://dummyjson.com/products/categories')
  const data = await res.json()
  const categoriesJson = data.slice(0, 5).map((category, index) => {
    return {
      id: index,
      name: category
    }
  }
  )
  return categoriesJson
}

const products = async ({ categories }) => {
  const products = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(`https://dummyjson.com/products/category/${category.name}`)
      const { products: productsRes } = await res.json()

      const fixImageUrl = (url) => {
        // algunas url estan mal, ejemplo src="["https://i.imgur.com/w3Y8NwQ.jpeg"]"

        if (url && url.includes('["')) {
          const fixedUrl = url.replace('["', '').replace('"]', '')
          return fixedUrl
        }

        return url
      }

      const productsJson = productsRes.map((product) => {
        return {
          id: product.id,
          name: product.title,
          shortName: product.title.split(' ')[0],
          price: product.price,
          description: product.description,
          imageUrl: fixImageUrl(product.thumbnail) || null,
          imageUrl2: fixImageUrl(product.images[0]) || null,
          imageUrl3: fixImageUrl(product.images[1]) || null,
          imageAlt: fixImageUrl(product.images[2]) || null,
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
  // make  5 random products show at home true

  const randomProductsIndex = []

  while (randomProductsIndex.length < 5) {
    const randomIndex = Math.floor(Math.random() * productsArray.length)
    if (!randomProductsIndex.includes(randomIndex)) {
      randomProductsIndex.push(randomIndex)
    }
  }

  console.log('randomProductsIndex', randomProductsIndex)

  randomProductsIndex.forEach((index) => {
    productsArray[index].showAtHome = true
  })

  await db.insert(Categories).values(
    categories
  )

  await db.insert(Products).values(
    productsArray
  )
}
