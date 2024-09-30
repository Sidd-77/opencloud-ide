import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
const MyProjects = () => {
  return (
    <div className="mt-6 h-max">
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
  )
}

export default MyProjects