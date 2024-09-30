import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Clock, Code, Users } from 'lucide-react'
import NewProject from "@/components/dashboard/newproject"
import MyProjects from "./projects/page"

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1e293b] border-[#2e3b4e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Projects
            </CardTitle>
            <Code className="h-4 w-4 text-[#22d3ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-400">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#2e3b4e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Users
            </CardTitle>
            <Users className="h-4 w-4 text-[#22d3ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-gray-400">
              +201 from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#2e3b4e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Hours Coded
            </CardTitle>
            <Clock className="h-4 w-4 text-[#22d3ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,432</div>
            <p className="text-xs text-gray-400">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-[#2e3b4e] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Projects
            </CardTitle>
            <BarChart className="h-4 w-4 text-[#22d3ee]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-400">
              +1 from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <NewProject />
      <MyProjects />
    </>
  )
}