const Income = require('../models/Income');

// @desc    Get all incomes for user
// @route   GET /api/v1/income
// @access  Private
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
        
        res.status(200).json({
            success: true,
            count: incomes.length,
            data: incomes
        });
    } catch (err) {
        console.error('Get incomes error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching incomes', 
            error: err.message 
        });
    }
};

// @desc    Get single income
// @route   GET /api/v1/income/:id
// @access  Private
exports.getIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ 
                success: false,
                message: 'Income not found' 
            });
        }

        // Make sure user owns the income
        if (income.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to access this income' 
            });
        }

        res.status(200).json({
            success: true,
            data: income
        });
    } catch (err) {
        console.error('Get income error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching income', 
            error: err.message 
        });
    }
};

// @desc    Create income
// @route   POST /api/v1/income
// @access  Private
exports.createIncome = async (req, res) => {
    try {
        const { title, amount, category, date, description } = req.body;

        // Validate input
        if (!title || !amount || !category) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide title, amount, and category' 
            });
        }

        const income = await Income.create({
            user: req.user.id,
            title,
            amount,
            category,
            date: date || Date.now(),
            description
        });

        res.status(201).json({
            success: true,
            message: 'Income created successfully',
            data: income
        });
    } catch (err) {
        console.error('Create income error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error creating income', 
            error: err.message 
        });
    }
};

// @desc    Update income
// @route   PUT /api/v1/income/:id
// @access  Private
exports.updateIncome = async (req, res) => {
    try {
        let income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ 
                success: false,
                message: 'Income not found' 
            });
        }

        // Make sure user owns the income
        if (income.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to update this income' 
            });
        }

        income = await Income.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Income updated successfully',
            data: income
        });
    } catch (err) {
        console.error('Update income error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error updating income', 
            error: err.message 
        });
    }
};

// @desc    Delete income
// @route   DELETE /api/v1/income/:id
// @access  Private
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ 
                success: false,
                message: 'Income not found' 
            });
        }

        // Make sure user owns the income
        if (income.user.toString() !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized to delete this income' 
            });
        }

        await income.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Income deleted successfully',
            data: {}
        });
    } catch (err) {
        console.error('Delete income error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error deleting income', 
            error: err.message 
        });
    }
};
