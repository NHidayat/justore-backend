import db from '../configs/database.js'

const transactionsField = {
  transaction_id: null,
  total_amount: null,
  receiver_phone: null,
  receiver_name: null,
  receiver_address: null
}
const transactionsItemsField = {
  transaction_id: null,
  sku: null,
  qty: null,
  amount: null
}
const transactionModel = {

  countAll: () => {
    return db.any('SELECT COUNT(1) AS TOTAL FROM transactions WHERE is_deleted = FALSE')
  },

  selectAll: (limit, offset) => {
    return db.any(
      `SELECT 
        T.*,
        ( SELECT SUM(QTY) FROM TRANSACTIONS_ITEMS TI WHERE TI.TRANSACTION_ID = T.TRANSACTION_ID ) AS QTY
      FROM ( SELECT * FROM TRANSACTIONS WHERE is_deleted = FALSE ORDER BY date_created DESC LIMIT $1 OFFSET $2) T`
      , [limit, offset])
  },

  selectByTrxId: (trxId) => {
    return db.any('SELECT * FROM transactions WHERE transaction_id = $<trxId>', { trxId })
  },

  selectItemsByTrxId: (trxId) => {
    return db.any(
      `SELECT 
      ti.*,
      (SELECT title FROM products p WHERE ti.sku = p.sku) AS title
      FROM transactions_items ti WHERE transaction_id = $<trxId>`,
      { trxId })
  },

  insertTx: (data = transactionsField, tx) => {
    return tx.any(`
      INSERT INTO transactions (
        transaction_id,
        total_amount,
        receiver_phone,
        receiver_name,
        receiver_address
      ) VALUES (
        $<transaction_id>,
        $<total_amount>,
        $<receiver_phone>,
        $<receiver_name>,
        $<receiver_address>
      )
      `,
    {
      transaction_id: data.transaction_id,
      total_amount: data.total_amount,
      receiver_phone: data.receiver_phone,
      receiver_name: data.receiver_name,
      receiver_address: data.receiver_address
    }
    )
  },

  insertItemsTx: (data = transactionsItemsField, tx) => {
    return tx.any(`
      INSERT INTO transactions_items (
        transaction_id,
        sku,
        qty,
        amount
      ) VALUES (
        $<transaction_id>,
        $<sku>,
        $<qty>,
        $<amount>
      )
    `,
    {
      transaction_id: data.transaction_id,
      sku: data.sku,
      qty: data.qty,
      amount: data.amount
    }
    )
  },

  softDelete: (trxId) => {
    return db.any('UPDATE transactions SET is_deleted = TRUE WHERE transaction_id = $<trxId>', { trxId })
  }
}

export default transactionModel
