"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

function Homepage() {
  return (
    <section className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <div>
        <h1 className='text-8xl text-slate-200 block'>Homepage</h1>
        <button className='p-3 rounded block mt-4 bg-red-600 text-white' onClick={() => signOut()}>
          Cerrar Sesion
          </button>
      </div>
    </section>
  )
}

export default Homepage