import { Link, useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  // console.log(track);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={(track.artists ? () => navigate(`/artists/${track?.artists[0].adamid}`) : (() => navigate(`/top-artists`)))}
    >
      {track?.artists ? (
        <img alt="song_img" src={track?.images?.coverart} />
      ) : (
        <img alt="song_img" src={track?.hub?.image} />
      )}
      {/* <img alt="song_img" src={track?.images?.coverart} className="w-full h-56 rounded-lg" /> */}
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track ? (
          track?.subtitle
        ) : (
          <Link to={`/top-charts`}>{track?.subtitle}</Link>
        )}
      </p>
    </div>
  );
};

export default ArtistCard;