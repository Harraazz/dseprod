"use client"

import CreateForm from './CreateForm'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div className="font-regular">
      <div className='fixed z-30 top-0 w-full p-5 bg-white'>
        <h1 className='text-lg h-7 font-semibold text-gray-500'></h1>
      </div>
      <div className='flex relative h-15 mt-22 mx-8 bg-white rounded-lg'>
        <Button
        variant="ghost"
        className='absolute top-1/2 translate-x-4 -translate-y-1/2 w-7 h-7'
        onClick={() => router.push("/admin/location/daerah")}
        >
          <ChevronLeft
          className='w-7 h-7'
          size={25}
          color='black'/>
        </Button>
        <h1 className='absolute font-bold top-1/2 translate-x-12 -translate-y-1/2 text-lg text-black '>Lokasi Daerah</h1>
      </div>
      <div className="overflow-y-hidden px-8 mb-8 mt-5">
        <div className="h-full w-full gap-4">
          <CreateForm />
        </div>
      </div>
    </div>
  )
}

export default Page