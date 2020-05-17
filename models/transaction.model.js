var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
  bookId: String,
  userId: String
});

var Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;