import Link from "next/link";
import s from '../../styles/Nav/Nav.module.scss'

const Nav = () => {
    return (
        <nav className={s.nav}>
            <Link href={'/films'}><div className={s.nav__link}>Films</div></Link>
        </nav>
    )
}

export default Nav;