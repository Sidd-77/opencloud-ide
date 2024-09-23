import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Cloud, Layers, Globe, CodeXml, Hexagon, Coffee, PanelTop } from "lucide-react";
import Navbar from "@/components/ui/landingpage/navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="container mx-auto py-6">
        <Navbar />
      </header>

      <main className="container mx-auto mt-16 px-4">
        <section className="text-center">
          <h2 className="text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Code
            </span>{" "}
            Anywhere,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Anytime
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the power of cloud-based development with isolated
            environments and collaborative features.
          </p>
          <Button
            size="lg"
            className="bg-blue-500 text-xl hover:bg-blue-600 text-white font-medium"
          >
            Get Started for Free
          </Button>
        </section>

        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Code className="mr-2" /> Online Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Advanced code editor with syntax highlighting, auto-completion,
              and real-time collaboration.
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Cloud className="mr-2" /> Isolated Environments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Secure, isolated execution environments for your projects with
              full control over dependencies.
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-400">
                <Layers className="mr-2" /> Multi-language Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              Support for a wide range of programming languages and frameworks
              to suit your needs.
            </CardContent>
          </Card>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-4xl font-extrabold mb-6">Supported Technologies</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose from a wide range of programming languages and frameworks to
            build your projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <Hexagon className="mr-2" /> NodeJs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                NodeJs is a popular runtime for building server-side applications.
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <CodeXml className="mr-2" /> ReactJs
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                ReactJs is a popular JavaScript library for building user interfaces.
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <PanelTop className="mr-2" /> Python
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Python is a versatile programming language that is easy to learn and use.
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <Coffee className="mr-2" /> Java
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Java is a popular programming language that is used to build enterprise applications.
              </CardContent>
            </Card>
          </div>
        </section>

      </main>



      <footer className="container mx-auto mt-24 py-6 text-center text-gray-400">
        <p>&copy; 2024 CloudCode. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
