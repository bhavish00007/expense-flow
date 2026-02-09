import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { incomeAPI } from '../../utils/api';
import { formatCurrency, formatDate, formatDateForInput, getCategoryColor } from '../../utils/helpers';
import { Plus, Edit2, Trash2, X, Calendar } from 'lucide-react';
import { INCOME_CATEGORIES } from '../../utils/constants';

function Income() {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingIncome, setEditingIncome] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Salary',
        date: formatDateForInput(new Date()),
        description: ''
    });

    useEffect(() => {
        fetchIncomes();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await incomeAPI.getAll();
            if (response.data.success) {
                setIncomes(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching incomes:', error);
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
            if (editingIncome) {
                await incomeAPI.update(editingIncome._id, data);
            } else {
                await incomeAPI.create(data);
            }
            fetchIncomes();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving income:', error);
            alert(error.response?.data?.message || 'Failed to save income');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this income?')) {
            try {
                await incomeAPI.delete(id);
                fetchIncomes();
            } catch (error) {
                console.error('Error deleting income:', error);
                alert('Failed to delete income');
            }
        }
    };

    const handleEdit = (income) => {
        setEditingIncome(income);
        setFormData({
            title: income.title,
            amount: income.amount.toString(),
            category: income.category,
            date: formatDateForInput(income.date),
            description: income.description || ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingIncome(null);
        setFormData({
            title: '',
            amount: '',
            category: 'Salary',
            date: formatDateForInput(new Date()),
            description: ''
        });
    };

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Income</h1>
                        <p className="text-gray-600">Manage your income sources</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Income
                    </button>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <h2 className="text-lg font-medium mb-2">Total Income</h2>
                    <p className="text-4xl font-bold">{formatCurrency(totalIncome)}</p>
                    <p className="text-green-100 mt-2">{incomes.length} transactions</p>
                </div>

                {/* Income List */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : incomes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {incomes.map((income) => (
                            <IncomeCard
                                key={income._id}
                                income={income}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-12">
                        <p className="text-gray-500 text-lg">No income recorded yet</p>
                        <p className="text-gray-400 mt-2">Click "Add Income" to get started</p>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <Modal
                        title={editingIncome ? 'Edit Income' : 'Add Income'}
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
                                    placeholder="e.g., Monthly Salary"
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
                                        {INCOME_CATEGORIES.map((category) => (
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
                                    {editingIncome ? 'Update Income' : 'Add Income'}
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

function IncomeCard({ income, onEdit, onDelete }) {
    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{income.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(income.category, 'income')}`}>
                            {income.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(income.date)}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(income.amount)}
                    </p>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => onEdit(income)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(income._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            {income.description && (
                <p className="text-sm text-gray-600 border-t pt-3 mt-3">
                    {income.description}
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

export default Income;
