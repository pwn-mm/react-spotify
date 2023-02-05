import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import Loader from './Loader'

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import { useGetTopChartsQuery } from '../redux/services/shazamCore'

import 'swiper/css';
import 'swiper/css/free-mode';

const TopPlay = () => {

  // Top Chart Component
  const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
    <div className="w-full flex flex-row items-center hover:bg-[#4c4268] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        {/* {console.log(song)} */}
        {song?.artists ? (
          <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
        ) : (
          <img src={song?.hub?.image} alt={song?.title} className="w-20 h-20 rounded-lg" />
        )}
        {/* This div contains 2 links */}
        <div className="flex-1 flex flex-col justify-center mx-3">
          {song?.artists ? (
            <Link to={`/songs/${song?.key}`}>
              <p className="font-bold text-xl text-white">{song?.title}</p>
            </Link>
          ) : (
            <Link to={`/top-charts`}>
              <p className="font-bold text-xl text-white">{song?.title}</p>
            </Link>
          )}
          {song?.artists && song?.artists[0]?.adamid ? (
            <Link to={`/artists/${song?.artists[0]?.adamid}` ?? null}>
              <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
            </Link>
          ) : (
            <Link to={`/top-artists` ?? null}>
              <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
            </Link>
          )}
        </div>
      </div>
      {/* Play pause component */}
      {song?.artists ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      ) : <Loader small/>}
    </div>
  )

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  })

  //Get top songs | only take the first five songs
  const topPlays = data?.slice(0, 5);
  // console.log(topPlays);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = (song, i) => {
    //! Err: song is not defined => need to pass 'song' as an parameter
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        {/* Top songs */}
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              i={i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      {/* Top artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
      </div>
      {/* Swiper Component | Loop over top songs => get the top artists */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
      >
        {topPlays?.map((song, i) => (
          <SwiperSlide
            key={song?.key}
            style={{ width: '25%', height: 'auto' }}
            className="rounded-full shadow-lg animate-slideright"
          >
            {song?.artists && song?.artists[0]?.adamid ? (
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="song image" className="rounded-full w-full object-cover" />
              </Link>
            ) : (
              <Link to={`/top-charts`}>
                <img src={song?.hub?.image} alt="song image" className="rounded-full w-full object-cover" />
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default TopPlay;
