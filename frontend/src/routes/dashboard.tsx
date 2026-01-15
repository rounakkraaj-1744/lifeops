import { createFileRoute, Outlet, Link, useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore, useUser } from '../stores'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'

import {
    LayoutDashboard,
    CreditCard,
    Repeat,
    Users,
    Settings,
    LogOut,
    Menu,
    Plus
} from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard')({
    beforeLoad: () => {
        // We can't easily access the store here in beforeLoad without importing the store instance directly
        // But the store hooks work in component. For route protection, we might rely on the 
        // root's auth check or check localStorage here if critical. 
        // For now, let's handle redirect in component or rely on client-side check.
        // Ideally: verify session existence.
    },
    component: DashboardLayout,
})

function DashboardLayout() {
    const user = useUser()
    const { signOut } = useAuthStore()
    const location = useLocation()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Redirect if not logged in
    if (!user) {
        // In a real app, this should be better handled by the router context or a higher level guard
        // preventing the component render flicker. 
        // For this demo shell, we'll assume auth is handled or redirect.
        // window.location.href = '/auth/login' // Brute force redirect if needed
    }

    const handleSignOut = async () => {
        await signOut()
        toast.success("Signed out successfully")
        window.location.href = '/auth/login'
    }

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Expenses', icon: CreditCard, href: '/dashboard/expenses' },
        { label: 'Subscriptions', icon: Repeat, href: '/dashboard/subscriptions' },
        { label: 'Groups', icon: Users, href: '/dashboard/groups' },
        { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ]

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">LifeOps</span>
                </div>

                <Button className="w-full justify-start gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/10 mb-6" size="lg">
                    <Plus className="h-4 w-4" />
                    New Entry
                </Button>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        // Simple active check
                        // Note: The hrefs are placeholders for now, effectively only overview works
                        const isActive = location.pathname === item.href || (item.href === '/dashboard' && location.pathname === '/');

                        return (
                            <Link
                                key={item.label}
                                to={item.href === '/dashboard' ? '/' : item.href} // Remap for the shell demo if needed
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/50 dark:border-slate-700'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <item.icon className={`h-4 w-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800">
                        {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                    size="sm"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex min-h-screen bg-slate-50/30 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
                <SidebarContent />
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">LifeOps</span>
                </div>
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2">
                            <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen transition-all duration-200">
                <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
