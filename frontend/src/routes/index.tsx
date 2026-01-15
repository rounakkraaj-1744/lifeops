import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import { useIsAuthenticated, useUser } from '../stores'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.08]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/25 ring-1 ring-white/20">
            <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">LifeOps</span>
        </div>
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/auth/success">
              <Button variant="ghost" className="text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth/login">
                <Button variant="ghost" className="text-sm font-medium hover:bg-accent hover:text-accent-foreground">Sign in</Button>
              </Link>
              <Link to="/auth/signup">
                <Button className="text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-border/50 text-sm text-foreground/80 mb-8 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Now in Beta
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 drop-shadow-sm">
          Organize your life,{' '}
          <span className="text-primary">
            effortlessly
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          LifeOps is your personal command center. Track habits, manage tasks, and achieve your goals with a beautiful, minimal interface designed for focus.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to={isAuthenticated ? "/auth/success" : "/auth/signup"}>
            <Button size="lg" className="h-12 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              {isAuthenticated ? `Continue as ${user?.name || 'User'}` : 'Start for free'}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch demo
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 w-full">
          {[
            { icon: '📋', title: 'Task Management', desc: 'Organize tasks with ease' },
            { icon: '🎯', title: 'Goal Tracking', desc: 'Set and achieve your goals' },
            { icon: '📊', title: 'Analytics', desc: 'Insights into your progress' },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-muted-foreground border-t border-border/40 max-w-7xl mx-auto mt-auto">
        <p>© 2026 LifeOps. Built with ❤️</p>
      </footer>
    </div>
  )
}
