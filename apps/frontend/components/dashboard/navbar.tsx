"use client"
import { Bell, Search, User, LogOut } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Avatar from './avatar'


export function Navbar() {
  return (
    <nav className="border-b border-[#1e293b]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">
            <span className="">Open</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Cloud</span> IDE
          </span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 sm:w-[300px] bg-[#1e293b] border-[#3b4252] text-white placeholder-gray-400"
            />
          </form>
          <Button size="icon" variant="ghost" className="text-white hover:bg-[#1e293b] hover:text-yellow-500">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar />
          <Button size="icon" variant="ghost" onClick={()=>signOut()} className="text-white hover:bg-[#1e293b] hover:text-red-500">
            <LogOut className="h-5 w-5" />
            <span className="sr-only" >Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}