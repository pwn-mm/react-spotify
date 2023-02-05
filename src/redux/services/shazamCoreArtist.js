// Fetch Shazam Music Api from Rapid API
//import utilify functions from redux toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreArtistApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v2',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY)
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
    })
});

export const {
    useGetArtistDetailsQuery,
} = shazamCoreArtistApi;