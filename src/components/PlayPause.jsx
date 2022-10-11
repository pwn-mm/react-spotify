import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';


const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (
  // If we are playing the song and if the active song is equal to the currently playing song, show pause, if not, show play.
  isPlaying && activeSong?.title === song.title ?
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} /> :
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
);

export default PlayPause;
