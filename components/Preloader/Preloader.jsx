import s from './../../styles/Preloader/Preloader.module.scss'

const Preloader = () => {
    return (
        <div className={s.preloader}>
            <div className={s.preloader__circle}>
                Loading
            </div>
        </div>
    )
}

export default Preloader;