import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "lucide-react";
import { Button } from "../ui/button";

const stack = [
  {
    name: "React",
    color: "bg-[#24a4c7]",
    description: "A JavaScript library for building user interfaces quickly",
    template: "react",
  },
  {
    name: "Tailwind CSS",
    color: "bg-[#06b6d4]",
    description: "A utility-first CSS framework for rapid UI development",
    template: "tailwindcss"
  },
  {
    name: "Node.js",
    color: "bg-[#3c873a]",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
    template: "node"
  },
  {
    name: "Express",
    color: "bg-[#000]",
    description: "Fast, unopinionated, minimalist web framework for Node.js",
    template: "express"
  },
];

const NewProject = () => {
  return (
    <div className=" mt-6">
      <h2 className="text-2xl font-bold mb-4">New Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stack.map((item, index) => (
          <Card
            key={index}
            className="bg-[#1e293b] border-[#2e3b4e] text-white"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-gray-300">
                {item.name}
              </CardTitle>
              <Code className="h-4 w-4 text-[#22d3ee]" />
            </CardHeader>
            <CardContent className=" text-sm">
              <p>{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button className={" font-semibold hover:text-white hover:bg-gradient-to-r from-blue-500 to-purple-800 " + item.color}>Create Project</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewProject;
