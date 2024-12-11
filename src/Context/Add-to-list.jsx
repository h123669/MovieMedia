import { createContext, useState } from "react";

export let WatchlistContext =createContext("")

export function WatchlistProvider({children}) {
    function addTOWatchlist(id) {
        const options = {
            method: 'POST',
            body :JSON.stringify({
                media_type: 'movie',
                media_id: id,
                watchlist:true
            })
            ,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
            }
        };
        
        return fetch('https://api.themoviedb.org/3/account/21588316/watchlist', options)
            .then(res => res.json())
            .then(res => res)
            .catch(err =>err);
        }
        


    function getWashList() {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
            }
        };
        
        return fetch('https://api.themoviedb.org/3/account/21588316/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc', options)
            .then(res => res.json())
            .then(res => res)
            .catch(err => err);
    }
    function DeleteWatchlist(id) {
        const options = {
            method: 'POST',
            body :JSON.stringify({
                media_type: 'movie',
                media_id: id,
                watchlist:false,
            })
            ,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDAzYjcxMTUyYTQ1OTFhMGM1NjlhZWVjZjQyZjQxNyIsIm5iZiI6MTcyOTcxNTU5NS4xMTMsInN1YiI6IjY3MTk1ZDhiZmVmZDFlMDUxMGZmZDQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wqTF-e_58X-NriHIheJfvR2Qqo2KMpNOTFioy9S_30'
            }
        };
        
        return fetch('https://api.themoviedb.org/3/account/21588316/watchlist', options)
            .then(res => res.json())
            .then(res => res)
            .catch(err =>err);
    }


    return(
        <WatchlistContext.Provider value={{addTOWatchlist,getWashList,DeleteWatchlist}}>
            {children}
        </WatchlistContext.Provider>
    )
}