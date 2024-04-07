// "use client";
// import React, { useState, useEffect, useRef } from "react";

// function RichTextEditor({data}:any) {
//   const refDiv = useRef(null);

//   let rte: any;

//   useEffect(() => {
//     if (refDiv.current) {
//       rte = new window.RichTextEditor(refDiv.current);
//       rte.setHTMLCode(data);
//     }
//   }, [refDiv]);

//   const handleClick = () => {
//     alert(rte.getHTMLCode());
//     console.log(rte.getHTMLCode());
//   };
//   return (
//     <div>
//       <div ref={refDiv} className="max-w-[600px]" ></div>
//     </div>
//   );
// }

// export default RichTextEditor;
