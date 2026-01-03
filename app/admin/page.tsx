import prisma from "@/lib/prisma"
import UserList from "./_components/userlist"


export default async function AdminPage() {
  const users = await prisma.users.findMany();

  

  const totalUsers = users.length;

  const session = await prisma.session.findMany();

  const activeSessions = session.length;

  const today = new Date();
today.setHours(0, 0, 0, 0); // start of today

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); // start of next day

const newUsersToday = await prisma.users.count({
  where: {
    createdAt: {
      gte: today,
      lt: tomorrow
    }
  }
})

  return (
    <div className="flex min-h-screen bg-background">
      
      <main className="flex-1 px-8 py-6 space-y-8">
     

     
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of system activity and users
          </p>
        </div>

        
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={totalUsers} />
          <StatCard title="Active Sessions" value={activeSessions} />
          <StatCard title="Failed Logins" value="—" />
          <StatCard title="New Today" value={newUsersToday} />
        </section>

        {/* MAIN CONTENT */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Users</h2>
          </div>

          <UserList users={users} />
        </section>

        {/* SECONDARY */}
        <section className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">
            Recent Activity
          </h2>

          <div className="border p-4 text-sm text-muted-foreground">
            No recent activity
          </div>
        </section>
      </main>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
