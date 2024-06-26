'use client'
import LoginLink from "@/components/ui/LoginLink";
import SignUpLink from "@/components/ui/SignUpLink";
import { useEffect, useRef } from "react";



declare global {
  interface Window {
    RichTextEditor: any; 
  }
}

export default function Home() {
  const refDiv = useRef(null);

  let rte:any;
  let abc = ()=>{
    return rte.getHTMLCode()
  }

  useEffect(() => {
      rte = new window.RichTextEditor(refDiv.current);
      rte.setHTMLCode("Apple banana");
  }, [refDiv])

  const handleClick = ()=>{
    alert(abc())
    // console.log(rte.getHTMLCode())
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="w-full flex justify-center items-center">
        <LoginLink/>
        <SignUpLink/>
        
        <div ref={refDiv} className="max-w-[600px]">
          
        </div>
      </div>
      <button className="p-3 bg-cyan-300 " onClick={handleClick}>Get html text</button>
    </main>
  );
}
