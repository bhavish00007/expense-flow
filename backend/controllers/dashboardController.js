const Income = require('../models/Income');
const Expense = require('../models/Expense');

// @desc    Get dashboard statistics
// @route   GET /api/v1/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get all incomes and expenses
        const incomes = await Income.find({ user: userId });
        const expenses = await Expense.find({ user: userId });

        // Calculate totals
        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const balance = totalIncome - totalExpense;

        // Get recent transactions (last 5 of each)
        const recentIncomes = await Income.find({ user: userId }).sort({ date: -1 }).limit(5);
        const recentExpenses = await Expense.find({ user: userId }).sort({ date: -1 }).limit(5);

        // Category breakdown for expenses
        const expensesByCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        // Category breakdown for incomes
        const incomesByCategory = incomes.reduce((acc, income) => {
            acc[income.category] = (acc[income.category] || 0) + income.amount;
            return acc;
        }, {});

        // Monthly data for charts (last 6 months)
        const monthlyData = getMonthlyData(incomes, expenses);

        res.status(200).json({
            success: true,
            data: {
                summary: {
                    totalIncome,
                    totalExpense,
                    balance,
                    incomeCount: incomes.length,
                    expenseCount: expenses.length
                },
                recentTransactions: {
                    incomes: recentIncomes,
                    expenses: recentExpenses
                },
                categoryBreakdown: {
                    expenses: expensesByCategory,
                    incomes: incomesByCategory
                },
                monthlyData
            }
        });
    } catch (err) {
        console.error('Get dashboard stats error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching dashboard statistics', 
            error: err.message 
        });
    }
};

// Helper function to get monthly data
function getMonthlyData(incomes, expenses) {
    const monthlyData = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthIncomes = incomes.filter(income => {
            const incomeDate = new Date(income.date);
            return incomeDate >= monthStart && incomeDate <= monthEnd;
        });
        
        const monthExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= monthStart && expenseDate <= monthEnd;
        });
        
        const totalIncome = monthIncomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        monthlyData.push({
            month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
            income: totalIncome,
            expense: totalExpense,
            balance: totalIncome - totalExpense
        });
    }
    
    return monthlyData;
}
