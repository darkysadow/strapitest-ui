import { fetcher } from "@/lib/api";
import Layout from "@/components/Layout";
import s from './../../styles/film/film.module.scss';
import { useFetchUser } from "@/lib/authContext";
import { getTokenFromLocalCookie, getTokenFromServerCookie, getUserFromLocalCookie } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { markdownToHTML } from "@/lib/markdownToHTML";

const Film = ({ jwt, film, plot, error }) => {
    const { user, loading } = useFetchUser()
    const router = useRouter()
    const [review, setReview] = useState('');

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (review.trim().length > 0) {
            try {
                await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    },
                    body: JSON.stringify({
                        data: {
                            review: review,
                            reviewer: await getUserFromLocalCookie(),
                            film: film.id
                        }
                    })
                })
                router.reload()
            } catch (error) {
                console.error('Request error', error);
            }
        }

    }
    if (error) {
        return (
            <Layout>
                <div style={{textAlign: 'center', width: '100%'}}>{error}</div>
            </Layout>
        )
    }
    return (
        <Layout user={user} loading={loading}>
            <>
                {film && (
                    <div className={s.film}>
                        <h1>{film && film.attributes.title}</h1>
                        <div className={s.film__description}>
                            <h2>Plot:</h2>
                            <div 
                                className={s.film__description__plot} 
                                dangerouslySetInnerHTML={{ __html: plot }}
                            ></div>
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
                            {" " + "/" + " "}
                            {film.attributes.publishedAt.split('T')[1].split(':')[0]}
                            :
                            {film.attributes.publishedAt.split('T')[1].split(':')[1]}
                        </div>
                    </div>)}
                {user && (
                    <div className={s.reviews}>
                        <div className={s.reviews__h2}>
                            <h2>Reviews</h2>
                        </div>
                        <form className={s.reviews__form} onSubmit={handleSubmit}>
                            <textarea type="text" placeholder="Type your review here" value={review} onChange={handleChange} />
                            <button type="submit">Send</button>
                        </form>
                        <ul className={s.reviews__block}>
                            {film.attributes.reviews.data && film.attributes.reviews.data.sort((a, b) => Number(b.id) - Number(a.id)).map((review) => (
                                <li key={review.id} className={s.reviews__review}>
                                    <div className={s.reviews__review__quote}>
                                        <span>{review.attributes.reviewer}</span> {review.attributes.review}
                                    </div>
                                    <div className={s.reviews__review__time}>
                                        {review.attributes.publishedAt.split('T')[0]}
                                        {<br />}
                                        {review.attributes.publishedAt.split('T')[1].split(':')[0]}
                                        :
                                        {review.attributes.publishedAt.split('T')[1].split(':')[1]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>)}
            </>
        </Layout>
    )
}

export async function getServerSideProps({ req, params }) {
    const { slug } = params;
    const jwt = typeof window !== 'undefined'
        ? getTokenFromLocalCookie
        : getTokenFromServerCookie(req);
    const filmResponse = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}?populate=*`,
        jwt ? {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
            : ''
    );
    if (filmResponse.data) {
        const markdownPlot = filmResponse.data.attributes.plot
        const plot = await markdownToHTML(markdownPlot);
        return {
            props: {
                film: filmResponse.data,
                plot,
                jwt: jwt ? jwt : '',
            },
        };
    } else {
        return {
            props: {
                error: filmResponse.error.message,
            },
        };
    }
}

export default Film;