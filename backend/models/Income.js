const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true
        },
        amount: {
            type: Number,
            required: [true, 'Please provide an amount'],
            min: [0, 'Amount cannot be negative']
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other']
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date'],
            default: Date.now
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        }
    },
    {
        timestamps: true
    }
);

// Index for faster queries
IncomeSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Income', IncomeSchema);
