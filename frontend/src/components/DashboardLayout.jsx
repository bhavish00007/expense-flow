import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    TrendingUp, 
    TrendingDown, 
    LogOut, 
    User,
    Menu,
    X
} from 'lucide-react';
import { getInitials, getAvatarColor } from '../utils/helpers';

function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Income', href: '/income', icon: TrendingUp },
        { name: 'Expenses', href: '/expense', icon: TrendingDown },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`lg:hidden fixed inset-0 z-50 ${sidebarOpen ? '' : 'pointer-events-none'}`}>
                <div 
                    className={`fixed inset-0 bg-gray-600 transition-opacity ${sidebarOpen ? 'opacity-75' : 'opacity-0'}`}
                    onClick={() => setSidebarOpen(false)}
                />
                <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold">ExpenseFlow</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <Sidebar navigation={navigation} isActive={isActive} user={user} handleLogout={handleLogout} />
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r overflow-y-auto">
                    <div className="flex items-center gap-2 h-16 px-4 border-b">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">ExpenseFlow</span>
                    </div>
                    <Sidebar navigation={navigation} isActive={isActive} user={user} handleLogout={handleLogout} />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-40 flex h-16 bg-white border-b lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="px-4 text-gray-500 focus:outline-none"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex-1 flex items-center justify-between px-4">
                        <span className="text-lg font-semibold">ExpenseFlow</span>
                        <UserAvatar user={user} />
                    </div>
                </div>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function Sidebar({ navigation, isActive, user, handleLogout }) {
    return (
        <div className="flex-1 flex flex-col justify-between p-4">
            <nav className="space-y-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                                isActive(item.href)
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t pt-4">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                    <UserAvatar user={user} />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}

function UserAvatar({ user }) {
    const initials = getInitials(user.fullName);
    const bgColor = getAvatarColor(user.fullName);

    return user.profileImageUrl ? (
        <img
            src={user.profileImageUrl}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover"
        />
    ) : (
        <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center text-white font-semibold`}>
            {initials}
        </div>
    );
}

export default DashboardLayout;
