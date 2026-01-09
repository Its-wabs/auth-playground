import prisma from "@/lib/prisma"
import UserList from "./_components/userlist"

export default async function AdminPage() {

  
  const users = await prisma.localUsers.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  const totalUsers = users.length;

  const session = await prisma.session.findMany();
  const activeSessions = session.length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const newUsersToday = await prisma.localUsers.count({
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow
      }
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of system activity and user management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Users" 
            value={totalUsers}
            description="All registered users"
          />
          <StatCard 
            title="Active Sessions" 
            value={activeSessions}
            description="Current active sessions"
          />
          <StatCard 
            title="Failed Logins" 
            value="0"
            description="Last 24 hours"
          />
          <StatCard 
            title="New Today" 
            value={newUsersToday}
            description="Registered today"
          />
        </div>

        {/* User Management Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">User Management</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage user accounts and permissions
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {totalUsers} user{totalUsers !== 1 ? 's' : ''}
            </div>
          </div>

          <div className="rounded-lg border bg-card overflow-hidden">
            <UserList users={users} />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Latest system events and actions
            </p>
          </div>
          
          <div className="rounded-lg border p-6 text-center">
            <div className="text-muted-foreground space-y-2">
              <p>No recent activity to display</p>
              <p className="text-xs">Activity logs will appear here</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  description 
}: { 
  title: string; 
  value: number | string; 
  description?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}