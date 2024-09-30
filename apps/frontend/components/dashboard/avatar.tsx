import { Button } from "../ui/button";
import { User } from "lucide-react";

const Avatar = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="text-white hover:bg-[#1e293b] hover:text-blue-500"
    >
      <User className="h-5 w-5" />
      <span className="sr-only">Profile</span>
    </Button>
  );
};

export default Avatar;
