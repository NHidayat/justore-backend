import db from '../configs/database.js'

const productField = {
  title: null,
  sku: null,
  image: null,
  price: null,
  description: null,
  stock: null
}

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

  insert: (data = productField) => {
    return db.any(
      `
      INSERT INTO products (
        title,
        sku,
        image,
        price,
        description,
        stock
      ) VALUES (
        $<title>,
        $<sku>,
        $<image>,
        $<price>,
        $<description>,
        $<stock>
      ) ON CONFLICT (sku) DO NOTHING;
      `,
      {
        title: data.title,
        sku: data.sku,
        image: data.image,
        price: data.price,
        description: data.description,
        stock: data.stock
      }
    )
  },

  update: (data = productField, sku) => {
    return db.any(
      `
      UPDATE products 
      SET
        title = $<title>,
        image = $<image>,
        price = $<price>,
        description = $<description>,
        stock = $<stock>
      WHERE sku = $<sku>
      `,
      {
        title: data.title,
        image: data.image,
        price: data.price,
        description: data.description,
        stock: data.stock,
        sku
      }
    )
  },

  delete: (sku) => {
    return db.any('DELETE FROM products WHERE sku = $<sku>', { sku })
  }

}

export default productModel
