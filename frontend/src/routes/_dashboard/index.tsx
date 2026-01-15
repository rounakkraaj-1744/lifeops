import { createFileRoute } from '@tanstack/react-router'
import { useUser } from '../../stores'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import {
    Plus,
    Repeat,
    Users,
    WalletCards,
    Receipt
} from 'lucide-react'

export const Route = createFileRoute('/_dashboard/')({
    component: DashboardHome,
})

function DashboardHome() {
    const user = useUser()
    const firstName = user?.name?.split(' ')[0] || 'there'

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <section className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Welcome back, {firstName}
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Here's what's happening with your life operations today.
                </p>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Quick Actions
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Add Expense', icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'hover:border-emerald-200 dark:hover:border-emerald-900' },
                        { label: 'Add Subscription', icon: Repeat, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'hover:border-violet-200 dark:hover:border-violet-900' },
                        { label: 'Create Group', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'hover:border-blue-200 dark:hover:border-blue-900' },
                    ].map((action) => (
                        <button
                            key={action.label}
                            className={`group flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 hover:shadow-md ${action.border}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-lg ${action.bg} flex items-center justify-center ${action.color}`}>
                                    <action.icon className="h-5 w-5" />
                                </div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">{action.label}</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus className="h-4 w-4 text-slate-400" />
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Empty States / Placeholders */}
            <section className="grid md:grid-cols-2 gap-8">
                {/* Recent Expenses Placeholder */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Expenses</h2>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">View all</Button>
                    </div>

                    <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50 shadow-none">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <WalletCards className="h-6 w-6 text-slate-400" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-slate-900 dark:text-white">No expenses yet</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto">
                                    Track your spending to get insights into your finances.
                                </p>
                            </div>
                            <Button size="sm" variant="outline" className="mt-2">
                                Record first expense
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Subscriptions Placeholder */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Active Subscriptions</h2>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">View all</Button>
                    </div>

                    <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/50 shadow-none">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                <Repeat className="h-6 w-6 text-slate-400" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-medium text-slate-900 dark:text-white">No active subscriptions</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto">
                                    Never miss a renewal date again by adding your subscriptions.
                                </p>
                            </div>
                            <Button size="sm" variant="outline" className="mt-2">
                                Add subscription
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
