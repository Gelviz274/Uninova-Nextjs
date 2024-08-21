import Link from 'next/link'

function Navbar() {
    return (
        <nav className='flex justify-between items-center py-1 bg-cyan-400'>
            <h1 className='text-3xl font-bold text-black p-4'>Uninova-Nextjs</h1>
            <ul className='flex gap-4 text-black font-bold p-6 '>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/auth/Register'>Register</Link>
                </li>
                <li>
                    <Link href='/auth/Login'>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar