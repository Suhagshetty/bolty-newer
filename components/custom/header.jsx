import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/ornit.png"} alt="logo" width={140} height={80} />
      <div className="flex gap-5">
        <Button>Sign-in</Button>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

export default Header;
