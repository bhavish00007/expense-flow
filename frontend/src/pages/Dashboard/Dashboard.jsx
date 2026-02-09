import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { dashboardAPI } from '../../utils/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { 
    TrendingUp, 
    TrendingDown, 
    Wallet, 
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { CHART_COLORS } from '../../utils/constants';

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await dashboardAPI.getStats();
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    const { summary, recentTransactions, categoryBreakdown, monthlyData } = stats || {};

    const expenseData = Object.entries(categoryBreakdown?.expenses || {}).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Overview of your financial activity</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Balance"
                        value={formatCurrency(summary?.balance || 0)}
                        icon={Wallet}
                        color="blue"
                        trend={summary?.balance >= 0 ? 'up' : 'down'}
                    />
                    <StatCard
                        title="Total Income"
                        value={formatCurrency(summary?.totalIncome || 0)}
                        icon={TrendingUp}
                        color="green"
                        count={`${summary?.incomeCount || 0} transactions`}
                    />
                    <StatCard
                        title="Total Expenses"
                        value={formatCurrency(summary?.totalExpense || 0)}
                        icon={TrendingDown}
                        color="red"
                        count={`${summary?.expenseCount || 0} transactions`}
                    />
                    <StatCard
                        title="Savings Rate"
                        value={summary?.totalIncome > 0 ? 
                            `${Math.round(((summary?.totalIncome - summary?.totalExpense) / summary?.totalIncome) * 100)}%` : 
                            '0%'
                        }
                        icon={DollarSign}
                        color="purple"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Monthly Trend Chart */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Monthly Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                                <Legend />
                                <Bar dataKey="income" fill="#10b981" name="Income" />
                                <Bar dataKey="expense" fill="#ef4444" name="Expense" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Expense Breakdown Chart */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Expense Categories</h2>
                        {expenseData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry) => entry.name}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {expenseData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(value)} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                No expense data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Income */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Recent Income</h2>
                        <div className="space-y-3">
                            {recentTransactions?.incomes?.length > 0 ? (
                                recentTransactions.incomes.map((income) => (
                                    <TransactionItem
                                        key={income._id}
                                        title={income.title}
                                        amount={income.amount}
                                        category={income.category}
                                        date={income.date}
                                        type="income"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No recent income</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
                        <div className="space-y-3">
                            {recentTransactions?.expenses?.length > 0 ? (
                                recentTransactions.expenses.map((expense) => (
                                    <TransactionItem
                                        key={expense._id}
                                        title={expense.title}
                                        amount={expense.amount}
                                        category={expense.category}
                                        date={expense.date}
                                        type="expense"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-8">No recent expenses</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ title, value, icon: Icon, color, trend, count }) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        red: 'from-red-500 to-red-600',
        purple: 'from-purple-500 to-purple-600',
    };

    return (
        <div className="stat-card">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {count && <p className="text-xs text-gray-500 mt-1">{count}</p>}
                </div>
                <div className={`bg-gradient-to-br ${colorClasses[color]} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            {trend && (
                <div className="mt-2 flex items-center gap-1">
                    {trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend === 'up' ? 'Positive' : 'Negative'}
                    </span>
                </div>
            )}
        </div>
    );
}

function TransactionItem({ title, amount, category, date, type }) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
                <h4 className="font-medium text-gray-900">{title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`${type === 'income' ? 'category-badge bg-green-100 text-green-700' : 'category-badge'} text-xs`}>
                        {category}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(date)}</span>
                </div>
            </div>
            <div className={`font-bold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
            </div>
        </div>
    );
}

export default Dashboard;
