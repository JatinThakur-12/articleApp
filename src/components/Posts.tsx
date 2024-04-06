import React from 'react'
import ArticleCard from './ArticleCard'

function Posts({data}:any) {
  
  return (
    <div className='flex flex-col gap-y-4 text-stone-200
    mt-5'>
      {
        data &&
        data.map((value:any)=>(
          <div key={value._id}>
            <ArticleCard postData={value}/>
          </div>
        ))
      }
    </div>

  )
}

export default Posts