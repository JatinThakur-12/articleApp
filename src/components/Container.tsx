'use client'
import React from "react";
interface ContainerProps {
    children: React.ReactNode;
    props?: any; // Adjust the type as needed
    maxWidth?: number | string; // Adjust the type as needed
  }
function Container({
  children,props,maxWidth
}: ContainerProps) {
  return (
    <>
      <div className="flex justify-center">
        <div className={`mx-10 sm:mx-16 ${props} ${maxWidth} w-full`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Container;
