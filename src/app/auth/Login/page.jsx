"use client"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import  {signIn}  from 'next-auth/react'

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null)

  // FUNCION SIGNIN
  const onSubmit = handleSubmit(async (data) => {

    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    console.log(res)
    if(res.error){
      setError(res.error)
    }else{
      router.push('/')
    }
  });



  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>
      {
        error && <p className='bg-red-500 text-lg text-white p-2 mb-4 rounded'>{error}</p>
      }
        <h1 className='text-3xl font-bold mb-4 text-slate-200 text-center'>Login</h1>
        <label htmlFor="username" className='text-slate-200 block mb-2 font-bold text-lg'>
          Usuario:
        </label>
        <input
          type="text"
          {...register('username', {
            required: {
              value: true,
              message: 'El usuario es requerido'
            }
          })}
          className='p-3 rounded block mb-2 bg-slate-500 text-laten-700 w-full'
          placeholder='Usuario123'
        />
        {errors.username && <p className='text-red-500 text-xs'>{errors.username.message}</p>}


        <label htmlFor="password" className='text-slate-200 block mb-2 font-bold text-lg'>
          Contraseña:
        </label>
        <input
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            }
          })}
          className='p-3 rounded block mb-2 bg-slate-500 text-laten-700 w-full'
          placeholder='********'
        />
        {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}

        <button type="submit" className='p-3 rounded block mt-4 bg-cyan-400 text-laten-700 w-full'>
          Iniciar Sesion
        </button>
        <p className='text-slate-200 mt-2 block'>
          ¿Aun no tienes una cuenta? <Link href='/auth/Register '>Registrate</Link>
        </p>
      </form>


    </div>
  )
}

export default LoginPage