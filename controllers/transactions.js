const Transaction = require('../models/Transaction')

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        console.log(error)
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add transaction
// @route POST /api/v1/transactions
// @access Public
const addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;
        console.log(req.body)
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.log(messages)
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            console.log(err)
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions
// @access Public
const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndRemove(req.params.id);
        // console.log(transaction)
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}