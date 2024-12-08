import React from "react";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex items-center justify-between w-full p-3 px-5 shadow-md">
      <img src="/logo.svg" width={100} height={100} alt="Logo" />
      {isSignedIn ? (
        <div className="flex items-center space-x-4">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
