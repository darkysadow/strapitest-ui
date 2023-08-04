import { fetcher } from "@/lib/api";
import Layout from "@/components/Layout";
import s from './../../styles/film/film.module.scss';   

const Film = ({film}) => {
    return (
        <Layout>
            <div className={s.film}>
                <h1>{film && film.attributes.title}</h1>
                <div className={s.film__description}>
                    <h2>Plot:</h2>
                    {film.attributes.plot}
                </div>
                <div className={s.film__released__director}>
                    <div className={s.film__released}>
                        <h2>Date of Release:</h2>
                        {film.attributes.released}
                    </div>
                    <div className={s.film__director}>
                        <h2>Director:</h2>
                        {film.attributes.director}
                    </div>
                </div>
                <div className={s.film__publishedAt}>
                    {film.attributes.publishedAt.split('T')[0]}
                    {" " + "/" + " " }
                    {film.attributes.publishedAt.split('T')[1].split(':')[0]}
                    :
                    {film.attributes.publishedAt.split('T')[1].split(':')[1]}
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {slug} = params;
    const filmResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}`);
    return {
        props: {
            film: filmResponse.data
        }
    }
}

export default Film;