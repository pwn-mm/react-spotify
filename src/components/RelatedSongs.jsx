import SongBar from './SongBar.jsx';
import Loader from './Loader.jsx';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  const musicData = data[4]?.data;
  console.log(musicData);
  return (
    <div className='flex flex-col'>
      <h1 className="font-bold text-3xl text-white">Related Songs...</h1>
      <div className='mt-6 w-full flex flex-col'>
        {musicData === undefined || musicData == 0 ? (
          <Loader title="Related songs are not available..." />
        ) : (
          musicData?.map((song, i) => (
            // console.log(song)
            <SongBar
              key={`${song.id}-${i}`}
              i={i}
              song={song}
            />
          ))
        )}

        {/* {data?.map((song, i) => (
        <SongBar
          key={`${song.key}-${artistId}-${i}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))} */}
      </div>
    </div>
  )
};


export default RelatedSongs;
