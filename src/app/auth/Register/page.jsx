"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import  Link  from 'next/link';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert('Las contraseñas no coinciden');
        }
        
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await res.json();

            if (!res.ok) {
                // Mostrar alerta con el mensaje de error
                alert(result.message);
                return;
            }

            // Si todo va bien, manejar la respuesta exitosamente
            alert('Registro exitoso');
            router.push('/auth/Login');
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Ocurrió un error inesperado');
        }
    });

    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/4'>
                <h1 className='text-3xl font-bold mb-4 text-slate-200 text-center'>Registrar</h1>
                
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

                <label htmlFor="email" className='text-slate-200 block mb-2 font-bold text-lg'>
                    Correo Electrónico:
                </label>
                <input
                    type="email"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El correo es requerido'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-500 text-laten-700 w-full'
                    placeholder='email@example.com'
                />
                {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}

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

                <label htmlFor="confirmPassword" className='text-slate-200 block mb-2 font-bold text-lg'>
                    Confirmar contraseña:
                </label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: {
                            value: true,
                            message: 'La confirmación de contraseña es requerida'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-500 text-laten-700 w-full'
                    placeholder='********'
                />
                {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}

                <input
                    type="checkbox"
                    {...register('termsAndConditions', {
                        required: {
                            value: true,
                            message: 'Debes aceptar los términos y condiciones'
                        }
                    })}
                    className='mb-2 bg-slate-500 text-laten-700'
                />
                <label htmlFor="termsAndConditions" className='text-slate-200 ml-2 mb-2 font-bold text-sm'>
                    Acepto los términos y condiciones
                </label>
                {errors.termsAndConditions && <p className='text-red-500 text-xs'>{errors.termsAndConditions.message}</p>}

                <button type="submit" className='p-3 rounded block mt-2 bg-cyan-400 text-laten-700 w-full'>
                    Registrar
                </button>
                <p className='text-slate-200 mt-2 block'>
                    ¿Ya tienes una cuenta? <Link href='/auth/Login'>Iniciar Sesion</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;
