import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogCard({ blog }) {
  const { title, description, category, image, _id } = blog
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-primary/25 transform hover:scale-[1.02] transition duration-300 cursor-pointer bg-white'
    >
      {/* Blog image */}
      <img
        src={image}
        alt={`${title} cover`}
        className='aspect-video w-full object-cover'
      />

      {/* Category badge */}
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs sm:text-sm'>
        {category}
      </span>

      {/* Blog content */}
      <div className='p-5'>
        <h3 className='mb-2 text-base sm:text-lg font-medium text-gray-900 line-clamp-2'>
          {title}
        </h3>
        <p className='text-xs sm:text-sm text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{"__html": description.slice(0, 120)}}>
        
        </p>
      </div>
    </div>
  )
}

export default BlogCard
