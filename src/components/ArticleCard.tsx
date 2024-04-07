'use client'
import React from "react";
import Link from "next/link";

function ArticleCard({ postData }: any) {
  const desc = postData?.desc;

  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const currentYear = new Date().getFullYear();

    if (year === currentYear) {
      return `${month} ${day}`;
    } else {
      return `${month} ${day}, ${year}`;
    }
  };
  return (
    <>
      {/* <div className="flex gap-x-2 justify-evenly align-middle ">
        <div>{postData.title}</div>
        <div>{postData.author.name}</div>
        <div></div>
        <div></div>
      </div> */}
      {/* <div className="flex mx-4 text-white">{postData.title}</div> */}
      <div className="flex w-full md:w-3/4 h-38 justify-between align-middle bg-white/10 p-3 rounded-md">
        <div className="flex-col w-full my-2 mr-4">
          <div className="flex items-center gap-2 text-base font-semibold">
            {/* <img
              src="https://phantom-marca.unidadeditorial.es/9279e8039b9040209f07a16f0201dd63/resize/828/f/jpg/assets/multimedia/imagenes/2023/01/12/16735402991293.jpg"
              className="h-6 w-6 rounded-full object-cover"
              alt="Rdj"
            /> */}

            <div className="capitalize">
              <h1 aria-label="author">{postData?.author?.name}</h1>
            </div>
          </div>
          <div className="py-2 flex flex-col gap-y-1">
            <Link href={`/post/${postData?.slug}`}>
              <h2 className="flex font-extrabold leading-5 tracking-tight text-white">
                {postData.title}
              </h2>
            </Link>
            <div className="hidden sm:block ">
              {" "}
              {desc.substring(0, 20) + "..."}{" "}
            </div>
          </div>
          <div className="flex  align-baseline justify-between">
            <div className="flex items-center text-xs whitespace-nowrap font-normal tracking-tighter text-white">
              <div>{formatDate(postData?.createdAt)}</div>
              <div className="px-1">
                <span className="relative top-[-0.2rem]">.</span>
              </div>
              {/* <div>{calcMinRead(content)} min read</div> */}
              <div className="px-1 hidden sm:block">
                <span className="relative top-[-0.2rem]">.</span>
              </div>
              <Link href={`/home?category=${postData.category}`}>
                <div className="px-2 py-1 rounded-full text-black bg-slate-100 hidden sm:block">
                  {postData.category}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className=" sm:w-52">
          <div className=" overflow-hidden  w-36 h-full sm:w-52">
            <img
              className="w-36 h-28 sm:h-36 sm:w-52 object-cover"
              src={`${postData.image}`}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
