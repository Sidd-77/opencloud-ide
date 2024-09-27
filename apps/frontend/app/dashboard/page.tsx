import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Clock, Code, Users } from 'lucide-react'

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
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        <div className="space-y-4">
          {['Project A', 'Project B', 'Project C'].map((project) => (
            <Card key={project} className="bg-[#1e293b] border-[#2e3b4e] text-white">
              <CardHeader>
                <CardTitle>{project}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Last updated: 2 days ago</p>
                <Button className="mt-4" variant="outline">
                  View Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}