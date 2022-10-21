import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import { useGetTopChartsQuery } from '../redux/services/shazamCore'

import 'swiper/css';
import 'swiper/css/free-mode';

const TopPlay = () => {

  // Top Chart Component
  const TopChartCard = ({ song, i }) => (
    <div className="w-full flex flex-row items-center hover:bg-[#4c4268] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {song.title}
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

  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
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
            <p className="text-gray-300 text-base cursor-pointer">See more ...</p>
          </Link>
        </div>
        {/* Top songs */}
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard key={song.key} i={i} song={song} />
          ))}
        </div>
      </div>
      {/* Top artists */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more ...</p>
          </Link>
        </div>
      </div>
      {/* Swiper Component */}
    </div>
  )
}
export default TopPlay;
