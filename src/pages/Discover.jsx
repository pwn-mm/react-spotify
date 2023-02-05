// Discover Page

/**
 * Need to know which song is currently active song and which songs are we playing
 * That's why 'useDispatch' and 'useSelector' hooks are imported.
 */
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants'
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';

// ? dispatch ->   dispatch an action to the store ->  genre
// ? selector ->   fetch modified state

const Discover = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if (isFetching) return <Loader title="Loading Songs..." />;
    if (error) return <Error />

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

    return (
        <div className="flex flex-col">
            {/* Discover title and select genre */}
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => {
                        dispatch(selectGenreListId(e.target.value))
                    }}
                    value={genreListId || 'Pop'}
                    className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
                >
                    {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>{genre.title}</option>
                    ))}
                </select>
            </div>
            {/* Wrapper for the songs  */}
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        data={data}
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}
export default Discover;
