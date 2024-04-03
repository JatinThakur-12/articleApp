'use client'
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    RichTextEditor: any; 
  }
}

export default function Home() {
  const refDiv = useRef(null);
  let rte:any;

  useEffect(() => {
    rte = new window.RichTextEditor(refDiv.current);
    rte.setHTMLCode("Apple banana");
  }, [])

  const handleClick = ()=>{
    alert(rte.getHTMLCode())
    console.log(rte.getHTMLCode())
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="w-full flex justify-center items-center">
        <div ref={refDiv} className="max-w-[600px]">
          
        </div>
      </div>
      <button className="p-3 bg-cyan-300 " onClick={handleClick}>Get html text</button>
    </main>
  );
}
