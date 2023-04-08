"use client";
import React from "react";
import { useDaisyToast } from "~/hooks/UseDaisyToast";

function Page() {
  const { ToastComponent, toggleToast } = useDaisyToast({
    title: "siema",
    message: "siema siema o tej porze",
    positionX: "end",
    positionY: "top",
    type: "error",
    withIcon: "defaultForType",
    withCloseButton: true,
    extraButton: {
      buttonText: "TEST",
      colorScheme: "success",
      onClickCallback: () => console.log("TEST"),
      size: "sm",
    },
  });
  return (
    <>
      <button onClick={toggleToast}>test toasta</button>
      <ToastComponent />
    </>
  );
}

export default Page;
