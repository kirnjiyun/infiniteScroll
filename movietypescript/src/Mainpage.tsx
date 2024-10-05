import React, { useEffect, useState } from "react";

const Mainpage = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [pageParams, setPageParams] = useState([]); // 내가 호출한 페이지 저장할 용도

    const fetchTopRatedMovies = async (page: number) => {
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
            console.log("data", data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    useEffect(() => {
        fetchTopRatedMovies(page);
    }, []);
    return <div>Mainpage</div>;
};

export default Mainpage;
