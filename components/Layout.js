import Nav from "./Nav/Nav"
import s from './../styles/Layout.module.scss'
import Link from "next/link";

const Layout = ({children}) => {
    return (
        <div className={s.layout}>
            <header className={s.layout__header}>
                <div className="container">
                    <div className={s.layout__header__block}>
                        <Link href={'/'}><div className={s.layout__logo}>Next.js+Strapi</div></Link>
                        <Nav />
                    </div>
                </div>
            </header>
            <main className={s.layout__main}>
                <div className="container">
                    <div className={s.layout__main__wrapper}>
                        <div className={s.layout__main__block}>{children}</div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Layout;