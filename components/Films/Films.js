import Link from 'next/link';
import s from './../../styles/Films/Films.module.scss';

const Films = ({films}) => {
    return (
            <ul className={s.films__ul}>
                {films &&
                    films.data.map((film) => {
                        return(
                            <li key={film.id} className={s.films__li}>
                                <Link href={`film/${film.attributes.slug}`} className={s.films__li__title}>{film.attributes.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
    );
}

export default Films;