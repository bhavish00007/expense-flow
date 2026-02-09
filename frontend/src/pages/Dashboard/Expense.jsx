import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { expenseAPI } from '../../utils/api';
import { formatCurrency, formatDate, formatDateForInput, getCategoryColor } from '../../utils/helpers';
import { Plus, Edit2, Trash2, X, Calendar } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../../utils/constants';

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: formatDateForInput(new Date()),
        description: ''
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await expenseAPI.getAll();
            if (response.data.success) {
                setExpenses(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            ...formData,
            amount: parseFloat(formData.amount)
        };

        try {
            if (editingExpense) {
                await expenseAPI.update(editingExpense._id, data);
            } else {
                await expenseAPI.create(data);
            }
            fetchExpenses();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving expense:', error);
            alert(error.response?.data?.message || 'Failed to save expense');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await expenseAPI.delete(id);
                fetchExpenses();
            } catch (error) {
                console.error('Error deleting expense:', error);
                alert('Failed to delete expense');
            }
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setFormData({
            title: expense.title,
            amount: expense.amount.toString(),
            category: expense.category,
            date: formatDateForInput(expense.date),
            description: expense.description || ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingExpense(null);
        setFormData({
            title: '',
            amount: '',
            category: 'Food',
            date: formatDateForInput(new Date()),
            description: ''
        });
    };

    const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
                        <p className="text-gray-600">Track your spending</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Expense
                    </button>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <h2 className="text-lg font-medium mb-2">Total Expenses</h2>
                    <p className="text-4xl font-bold">{formatCurrency(totalExpense)}</p>
                    <p className="text-red-100 mt-2">{expenses.length} transactions</p>
                </div>

                {/* Expense List */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : expenses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {expenses.map((expense) => (
                            <ExpenseCard
                                key={expense._id}
                                expense={expense}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 text-lg">No expenses recorded yet</p>
                        <p className="text-gray-400 mt-2">Click "Add Expense" to get started</p>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <Modal
                        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
                        onClose={handleCloseModal}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g., Grocery Shopping"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="input-field"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="input-field"
                                        required
                                    >
                                        {EXPENSE_CATEGORIES.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="input-field"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field"
                                    rows="3"
                                    placeholder="Add any notes..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary">
                                    {editingExpense ? 'Update Expense' : 'Add Expense'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </Modal>
                )}
            </div>
        </DashboardLayout>
    );
}

function ExpenseCard({ expense, onEdit, onDelete }) {
    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{expense.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(expense.category, 'expense')}`}>
                            {expense.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(expense.date)}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(expense.amount)}
                    </p>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => onEdit(expense)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(expense._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            {expense.description && (
                <p className="text-sm text-gray-600 border-t pt-3 mt-3">
                    {expense.description}
                </p>
            )}
        </div>
    );
}

function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-slide-in">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Expense;
