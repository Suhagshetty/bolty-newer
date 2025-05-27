"use client";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight } from "lucide-react";
import React, { useContext, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "@/components/custom/SignInDialog"; // Update the path as necessary

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);

  // Function to close the dialog
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const onGenerate = (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    setMessages({
      role: "user",
      content: input,
    });
  };

  return (
    <div className="flex flex-col items-center mt-36 gap-2 xl:mt-52 gap-2">
      <h2 className="font-bold text-3xl text-center text-white">
        {Lookup.HERO_HEADING}
      </h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-600 p-2 h-11 w-11 rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3 mt-8">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-500 hover:text-white cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={closeDialog} />
    </div>
  );
}

export default Hero;
