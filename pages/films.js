import Films from "@/components/Films/Films";
import Layout from "@/components/Layout";
import { fetcher } from "@/lib/api"
import s from './../styles/Films/Films.module.scss'
import { useState } from "react";
import useSWR from 'swr';

const FilmsList = ({ films }) => {
    const [pageIndex, setPageIndex] = useState(1);
    const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${pageIndex}&pagination[pageSize]=1`,
        fetcher, {fallbackData: films});
    return (
        <Layout>
            <div className={s.films}>
                {error && <>Loading error</>}
                {data && <Films films={data} />}
                <div className={s.films__buttons}>
                    <button
                        className={`${pageIndex === 1 ? `${s.films__buttons__button} ${s.films__buttons__button_disabled}` : `${s.films__buttons__button} ${s.films__buttons__button_active}`}`}
                        disabled={pageIndex === 1}
                        onClick={() => setPageIndex(pageIndex - 1)}
                    >
                        Prev
                    </button>
                    <span className={s.films__buttons__span}>
                        {`${pageIndex} of ${data && data.meta.pagination.pageCount}`}
                    </span>
                    <button
                        className={`${pageIndex === (data && data.meta.pagination.pageCount) ? `${s.films__buttons__button} ${s.films__buttons__button_disabled}` : `${s.films__buttons__button} ${s.films__buttons__button_active}`}`}
                        disabled={pageIndex === (data && data.meta.pagination.pageCount)}
                        onClick={() => setPageIndex(pageIndex + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const filmsResponse = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=1`
    );
    return {
        props: {
            films: filmsResponse
        }
    }
}

export default FilmsList;