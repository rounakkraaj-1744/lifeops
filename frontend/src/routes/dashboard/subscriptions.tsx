import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/subscriptions')({
    component: Subscriptions,
})

function Subscriptions() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Subscriptions</h2>
            <p className="text-slate-500 dark:text-slate-400">Subscription management features coming soon.</p>
        </div>
    )
}
