import Link from "next/link";
import s from '../../styles/Nav/Nav.module.scss'
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/api";
import { setToken, unsetToken } from "@/lib/auth";
import { useUser } from "@/lib/authContext";

const Nav = () => {
    const {user, loading} = useUser();
    const [data, setData] = useState({
        identifier: '',
        password: ''
    })
    

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responseData = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: data.identifier,
                    password: data.password
                })
            }
        )
        setToken(responseData);
    }
    const logout = () => {
        unsetToken();
    }
    return (
        <nav className={s.nav}>
            <ul>
                <li><Link href={'/films'} className={s.nav__link}>Films</Link></li>
                {!loading && (user ? (
                    <li><Link href={'/profile'} className={s.nav__link}>Profile</Link></li>
                ) : (''))}
                {!loading && (user ? (
                    <li onClick={() => logout()} className={s.nav__link}>Logout</li>
                ) : (''))}
                {!loading && !user ? (
                    <>
                        <li>
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text"
                                    name="identifier"
                                    onChange={handleChange}
                                    required
                                    value={data.identifier}
                                />
                                <input 
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    value={data.pas}
                                />
                                <button type="submit">Login</button>
                            </form>
                        </li>
                        <li><Link href={'/register'} className={s.nav__link}>Register</Link></li>
                    </>
                ) : ('')}
            </ul>
            
        </nav>
    )
}

export default Nav;