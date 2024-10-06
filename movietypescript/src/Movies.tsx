import React from "react";
import styled, { keyframes } from "styled-components";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

interface MoviesProps {
    movies: Movie[];
    loading: boolean;
}

const Movies: React.FC<MoviesProps> = ({ movies, loading }) => {
    return (
        <MovieContainer>
            {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonMovieItem key={index}>
                          <SkeletonImage />
                          <SkeletonTitle />
                      </SkeletonMovieItem>
                  ))
                : movies.map((movie) => (
                      <MovieItem key={movie.id}>
                          <MovieImage
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt={movie.title}
                          />
                          <MovieTitle>{movie.title}</MovieTitle>
                      </MovieItem>
                  ))}
        </MovieContainer>
    );
};

export default Movies;

// Styled Components
const MovieContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px;
`;

const MovieItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const MovieImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 10px;
`;

const MovieTitle = styled.h3`
    font-size: 1.1rem;
    text-align: center;
    color: #333;
`;

// Skeleton Loading Styles
const skeletonAnimation = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const SkeletonMovieItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    background-color: #e0e0e0;
    padding: 15px;
    border-radius: 10px;
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

const SkeletonTitle = styled.div`
    width: 70%;
    height: 20px;
    border-radius: 5px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;
