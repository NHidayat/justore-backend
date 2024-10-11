import db from '../configs/database.js'

const productModel = {

  countAll: () => {
    return db.any('SELECT COUNT(1) AS TOTAL FROM products')
  },

  selectAll: (limit, offset) => {
    return db.any('SELECT * FROM products LIMIT $1 OFFSET $2', [limit, offset])
  },

  selectBySKU: (sku) => {
    return db.any('SELECT * FROM products WHERE sku = $1', [sku])
  },

  insert: (data = {
    id: null,
    title: null,
    sku: null,
    image: null,
    price: null,
    description: null,
    stock: null
  }) => {
    return db.any(
      `
      INSERT INTO products (
        id,
        title,
        sku,
        image,
        price,
        description,
        stock
      ) VALUES (
        $<id>,
        $<title>,
        $<sku>,
        $<image>,
        $<price>,
        $<description>,
        $<stock>
      ) ON CONFLICT (id) DO NOTHING;
      `,
      {
        id: data.id,
        title: data.title,
        sku: data.sku,
        image: data.image,
        price: data.price,
        description: data.description,
        stock: data.stock
      }
    )
  }

}

export default productModel
