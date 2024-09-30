'use client';
import { Home, Code, Settings, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
export function Sidebar() {
  const router = useRouter();
  return (
    <div className="pb-12 w-64 bg-[#1e293b] border-r border-[#2e3b4e]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant={ 'ghost'} onClick={()=> router.push('/dashboard')} className="w-full justify-start text-gray-300 hover:bg-[#2e3b4e] hover:text-white">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" onClick={()=> router.push('/dashboard/projects')} className="w-full justify-start text-gray-300 hover:bg-[#2e3b4e] hover:text-white">
              <Code className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" onClick={()=> router.push('/dashboard/settings')} className="w-full justify-start text-gray-300 hover:bg-[#2e3b4e] hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2e3b4e] hover:text-white">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
    </div>
  )
}