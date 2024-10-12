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
    return db.any('SELECT COUNT(1) AS TOTAL FROM transactions')
  },

  selectAll: (limit, offset) => {
    return db.any('SELECT * FROM transactions LIMIT $1 OFFSET $2', [limit, offset])
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
  }
}

export default transactionModel
