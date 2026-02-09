const Expense = require('../models/Expense');

// @desc    Get all expenses for user
// @route   GET /api/v1/expense
// @access  Private
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (err) {
        console.error('Get expenses error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching expenses', 
            error: err.message 
        });
    }
};

// @desc    Get single expense
// @route   GET /api/v1/expense/:id
// @access  Private
exports.getExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ 
                success: false,
                message: 'Expense not found' 
            });
        }

        // Make sure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to access this expense' 
            });
        }

        res.status(200).json({
            success: true,
            data: expense
        });
    } catch (err) {
        console.error('Get expense error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching expense', 
            error: err.message 
        });
    }
};

// @desc    Create expense
// @route   POST /api/v1/expense
// @access  Private
exports.createExpense = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        // Validate input
        if (!title || !amount || !category) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide title, amount, and category' 
            });
        }

        const expense = await Expense.create({
            user: req.user.id,
            title,
            amount,
            category,
            date: date || Date.now(),
            description
        });

        res.status(201).json({
            success: true,
            message: 'Expense created successfully',
            data: expense
        });
    } catch (err) {
        console.error('Create expense error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error creating expense', 
            error: err.message 
        });
    }
};

// @desc    Update expense
// @route   PUT /api/v1/expense/:id
// @access  Private
exports.updateExpense = async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ 
                success: false,
                message: 'Expense not found' 
            });
        }

        // Make sure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to update this expense' 
            });
        }

        expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            data: expense
        });
    } catch (err) {
        console.error('Update expense error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error updating expense', 
            error: err.message 
        });
    }
};

// @desc    Delete expense
// @route   DELETE /api/v1/expense/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ 
                success: false,
                message: 'Expense not found' 
            });
        }

        // Make sure user owns the expense
        if (expense.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to delete this expense' 
            });
        }

        await expense.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully',
            data: {}
        });
    } catch (err) {
        console.error('Delete expense error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error deleting expense', 
            error: err.message 
        });
    }
};
