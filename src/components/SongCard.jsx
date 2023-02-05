import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const SongCard = ({ song, data, activeSong, isPlaying, i }) => {
  console.log(song);

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }


  return (
    <div className='flex flex-col w-[250px] p-4 bg-red bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      {/* song card */}
      <div className='relative w-full h-56 group'>
        {/* check if the song currently showing is the song currently playing */}
        <div
          className={
            `absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex
          ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`
          }>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        {song.artists ? (
          <img alt="song_img" src={song.images?.coverart} />
        ) : (
          <img alt="song_img" src={song?.hub?.image} />
        )}
      </div>

      {/* song title and subtitle */}
      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={song.artists ? (`/songs/${song?.key}`) : (`/around-you`)}>{song.title}</Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  )
};

export default SongCard;
