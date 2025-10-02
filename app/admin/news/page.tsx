
import NewsTable  from "./Table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const News = () => {
  return (
    <div className='font-regular'>
      <div className='p-5 bg-white'>
        <h1 className='text-lg font-semibold text-gray-500'>Berita</h1>
      </div>
      <div className='p-8 h-35 items-center'>
        <div className="flex h-full bg-white rounded-xl gap-4">
          <div className="w-3 rounded-l-xl bg-red-600"></div>
          <div className='my-auto'>
            <h2 className="text-2xl font-bold">Berita</h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[66vh] overflow-y-hidden px-8 mb-8">
        <div className="h-full w-full p-5 bg-white rounded-xl gap-4">
          <NewsTable />
        </div>
      </div>
    </div>
  )
}

export default News