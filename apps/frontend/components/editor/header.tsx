import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Search,
  MoreVertical,
  FileCode2,
  Home,
  Lock,
  Power,
} from "lucide-react";
import { StopIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-gray-900 ">
      <div className="flex items-center space-x-4">
    
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:bg-gray-600 hover:text-gray-900"
        >
          <Home size={20} />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
          <span className="text-sm font-medium text-gray-200">
            Project-name-goes-here
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-black"
        >
          Limited
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Play size={16} className="mr-2" />
          Run
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Power size={16} className="mr-2" />
          Stop
        </Button>
        <Input
          type="text"
          placeholder="Search"
          className="w-64 bg-gray-800 border-gray-700 text-gray-200"
        />
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:bg-gray-600 hover:text-gray-900"
        >
          <Search size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:bg-gray-600 hover:text-gray-900"
        >
          <Lock size={20} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:bg-gray-600 hover:text-gray-900"
            >
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
