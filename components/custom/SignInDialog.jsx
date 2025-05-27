import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserDetailContext } from "@/context/UserDetailContext";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext); // Correct destructuring
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const tokens = await axios.post("http://localhost:3001/auth/google", {
          code: codeResponse.code,
        });
        const userInfo = tokens.data; // Assuming the response contains user info
        setUserDetail(userInfo);
        closeDialog(false);
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    onError: (errorResponse) =>
      console.error("Google Login Error:", errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-bold text-2xl text-white text-center">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-center"> {Lookup.SIGNIN_SUBHEADING} </p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400"
                onClick={googleLogin}
              >
                Sign In with Google
              </Button>
              <p>Contact me for Source Code via </p>
              <Button>suhagshetty07@gmail.com</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
