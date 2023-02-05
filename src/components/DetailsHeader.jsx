import { Link } from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.data[0]?.attributes;
  // console.log(artist);
  return (
    <div className='relative w-full flex flex-col'>
      <div className='w-full bg-gradient-to-t from-transparent to-black sm:h-48 h-28' />

      <div className='absolute inset-0 flex items-center'>
        {/* Get the picture of artist albumn */}
        <img
          alt="artist"
          src={artistId ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-lg shadow-black"
        />
        {/* Get the artist */}
        <div className="ml-5">
          <p className='font-bold sm:text-3xl text-xl text-white'>{artistId ? artist?.name : songData?.title}</p>

          {/* Show only if we are on song detail page */}
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className='text-base text-gray-400 mt-2'>{songData?.subtitle}</p>
            </Link>
          )}

          {/* Show genre */}
          <p className='text-base text-gray-400 mt-2'>
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>

          {/* Birth */}
          <p className='text-base text-gray-400 mt-2'>
            {artistId ? artist?.bornOrFormed : ''}
          </p>

          {/* Birth */}
          <p className='text-base text-gray-400 mt-2'>
            {artistId ? artist?.origin : ''}
          </p>
        </div>
      </div>

      <div className='w-full sm:h-44 h-24' />
    </div>
  )
};

export default DetailsHeader;
