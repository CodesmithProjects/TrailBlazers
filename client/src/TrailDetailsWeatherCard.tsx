import React from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';


type Props = {
  trail: Trail
}

interface Trail {
  data: any[];
  name: string;
  length: number;
  difficulty: string,
  description: string,
  id: number;
  url: string;
  googleMapsURL: string;
  map: () => void;
  averageStars: number;
  numberOfReviews: number;
  city: string;
  lat: number;
  lon: number;
}



const  TrailDetailsWeatherCard = ({ trail }: Props,) => {
  // sourced from https://www.npmjs.com/package/react-open-weather
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: `${import.meta.env.OPEN_WEATHER_API_KEY}`,
    lat: `${trail.lat}`,
    lon: `${trail.lon}`,
    lang: 'en',
    unit: 'imperial', // values are (metric, standard, imperial)
  });

  const customStyles = {
    fontFamily: 'Roboto, sans-serif',
    gradientStart: 'rgba(255, 255, 255, 0.05)',
    gradientMid: 'rgba(255, 255, 255, 0.05)',
    gradientEnd: 'rgba(255, 255, 255, 0.05)',
    locationFontColor: '#FFF',
    todayTempFontColor: '#FFF',
    todayDateFontColor: '#B5DEF4',
    todayRangeFontColor: '#B5DEF4',
    todayDescFontColor: '#B5DEF4',
    todayInfoFontColor: '#B5DEF4',
    todayIconColor: '#B5DEF4',
    forecastBackgroundColor: 'rgba(255, 255, 255, 0.05)',
    forecastSeparatorColor: '#DDD',
    forecastDateColor: '#FFF',
    forecastDescColor: '#FFF',
    forecastRangeColor: '#FFF',
    forecastIconColor: '#B5DEF4',
  };

  return (
    <div>
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={trail.city}
        unitsLabels={{ temperature: 'F', windSpeed: 'Km/h' }}
        showForecast
      />
    </div>
  );
}

export default TrailDetailsWeatherCard;
