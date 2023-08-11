import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api";
import { useFetchUser } from "@/lib/authContext";
import { useState } from "react";
import s from './../styles/Register/Register.module.scss'
import { setToken } from "@/lib/auth";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader/Preloader";

const Register = () => {
    const router = useRouter();
    const { user, loading } = useFetchUser();
    if (user && !loading) {
        router.push('/')
    }
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        email: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: registerData.username,
                password: registerData.password,
                email: registerData.email
            }),
            method: 'POST'
        })
        if (!response.error) {
            setToken(response);
            router.push('/')
        } else {
            alert(response.error.message)
        }


    }

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }
    return (
        <Layout user={user} loading={loading}>
            <form className={s.register} onSubmit={handleSubmit}>
                <div className={s.register__block}>
                    <span>Username</span>
                    <input type="text" name="username" value={registerData.username} onChange={handleChange} />
                    <span>Password</span>
                    <input type="password" name="password" value={registerData.password} onChange={handleChange} />
                    <span>E-mail</span>
                    <input type="email" name="email" value={registerData.email} onChange={handleChange} />
                    <button type="submit">Register</button>
                </div>
            </form>
        </Layout>
    )
}

export default Register;