import { useEffect } from "react";

export const Offscreen = () => {
  useEffect(() => {
    setInterval(() => {
      console.log("DSFDSDDFS");
    }, 1000);
  });

  return <div>offscreen</div>;
};
