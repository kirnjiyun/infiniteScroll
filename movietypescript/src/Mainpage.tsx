import React, { useEffect, useRef, useState } from "react";
import Movies from "./Movies";

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const Mainpage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [pageParams, setPageParams] = useState<number[]>([]); // 호출한 페이지 저장할 용도

    // useRef 타입 명시 (HTMLHeadingElement | null)
    const observerRef = useRef<HTMLHeadingElement | null>(null);

    const fetchTopRatedMovies = async (page: number) => {
        if (pageParams.includes(page)) return; // 중복호출 방지
        setLoading(true);
        console.log(process.env.REACT_APP_API_KEY);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }

            const data = await response.json();
            setMovies((previousMovies) => [...previousMovies, ...data.results]);
            setPageParams((prev) => [...prev, page]); // 히스토리 관리용
            setHasNextPage(data.page < data.total_pages);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopRatedMovies(page);
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
                console.log("화면에 보인다~~");
                if (hasNextPage && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasNextPage, loading]);

    return (
        <div>
            <Movies movies={movies} loading={loading} />
            <h1 ref={observerRef}>loadmore</h1>
        </div>
    );
};

export default Mainpage;
