import { useState } from "react";
import {
  WEATHER_API,
  WEATHER_API_KEY,
  WEATHER_FORCAST_APPI,
} from "./components/api";
import CurrentWeather from "./components/current_weather/current_weather";
import Forcast from "./components/forcast/forcast";
import Search from "./components/search/search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcast, setForcast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData?.value?.split(" ");
    
    const currentWeatherFetch = fetch(
      `${WEATHER_API}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )

    const forcastFetch = fetch(
      `${WEATHER_FORCAST_APPI}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.label, ...forcastResponse });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcast && <Forcast data={forcast} /> }
    </div>
  );
}

export default App;
