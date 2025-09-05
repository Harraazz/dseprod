import React from 'react'
import Navbar from '@/components/Navbar'
import ProbFix from '@/components/Bocil'
import Image from 'next/image'
import {Banner} from '@/components/Banner'

function home() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <ProbFix/>
        <div className="grid grid-cols-12">
          <div className=" col-span-8 text-start">
            <div className="ms-50 mb-50 pr-3  flex flex-col align-middle justify-center ">
              <p className='font-bold mt-6 text-[20px]'>Perkenalkan</p>
              <h1 className='text-[40px] font-bold'>Dwi Sarana Edukasi</h1>
            <p className='text-[20px] mr-4'>Kami percaya setiap anak adalah bintang yang bersinar dengan caranya sendiri. Dengan pengalaman 15+ tahun mengelola program pendidikan berkualitas internasional, kami telah membantu ribuan siswa menemukan potensi terbaiknya.</p>
            </div>
          </div>
          <div className="col-span-4 ">
             <Image
                  className="object-contain"
                  width={295}
                  height={263}
                  src="/Nulis.png"
                  alt="Banner"      
                  />
          </div>
        </div>
    </div>
  )
}

export default home