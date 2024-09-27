'use client';
import LoginSignup from "@/components/auth/LoginSignup";
import { useRouter } from "next/navigation";
const Auth = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f1729] text-white p-4">
      <a onClick={()=> router.push('/')} className="text-4xl font-bold mb-8">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Open
        </span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
          Cloud
        </span>{" "}
        IDE
      </a>
      <div className="w-full max-w-md">
        <div className="shadow-xl rounded-lg overflow-hidden">
          <LoginSignup />
        </div>
      </div>
      <p className="mt-8 text-center text-gray-400 max-w-md">
        Experience the power of cloud-based development with isolated
        environments and collaborative features.
      </p>
    </div>
  );
};

export default Auth;
