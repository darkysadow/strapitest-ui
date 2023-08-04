import Films from "@/components/Films/Films";
import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api"
import s from './../styles/Films/Films.module.scss'

const FilmsList = ({ films }) => {
    return (
        <Layout>
            <div className={s.films}>
                <Films films={films} />
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const filmsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/films`
    );
    return {
        props: {
            films: filmsResponse
        }
    }
}

export default FilmsList;