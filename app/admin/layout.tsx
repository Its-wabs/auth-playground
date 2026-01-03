// app/admin/layout.tsx
import { AppSidebar } from "../components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "./_components/siteheader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset >
        <main className="w-full  mx-auto">
          <SiteHeader />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}