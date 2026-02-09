import { format, parseISO } from 'date-fns';

// Email validation
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(amount);
};

// Format date
export const formatDate = (date) => {
    if (!date) return '';
    try {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        return format(parsedDate, 'MMM dd, yyyy');
    } catch (error) {
        return '';
    }
};

// Format date for input
export const formatDateForInput = (date) => {
    if (!date) return '';
    try {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        return format(parsedDate, 'yyyy-MM-dd');
    } catch (error) {
        return '';
    }
};

// Get initials from name
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Get category color
export const getCategoryColor = (category, type = 'expense') => {
    const expenseColors = {
        Food: 'bg-orange-100 text-orange-700',
        Transportation: 'bg-blue-100 text-blue-700',
        Entertainment: 'bg-purple-100 text-purple-700',
        Shopping: 'bg-pink-100 text-pink-700',
        Healthcare: 'bg-red-100 text-red-700',
        Education: 'bg-indigo-100 text-indigo-700',
        Bills: 'bg-yellow-100 text-yellow-700',
        Other: 'bg-gray-100 text-gray-700',
    };

    const incomeColors = {
        Salary: 'bg-green-100 text-green-700',
        Freelance: 'bg-teal-100 text-teal-700',
        Business: 'bg-blue-100 text-blue-700',
        Investment: 'bg-purple-100 text-purple-700',
        Gift: 'bg-pink-100 text-pink-700',
        Other: 'bg-gray-100 text-gray-700',
    };

    const colors = type === 'income' ? incomeColors : expenseColors;
    return colors[category] || colors.Other;
};

// Get random avatar color
export const getAvatarColor = (name) => {
    const colors = [
        'bg-red-500',
        'bg-blue-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
};
