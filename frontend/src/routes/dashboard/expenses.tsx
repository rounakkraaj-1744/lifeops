import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/expenses')({
    component: Expenses,
})

function Expenses() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Expenses</h2>
            <p className="text-slate-500 dark:text-slate-400">Expense tracking features coming soon.</p>
        </div>
    )
}
