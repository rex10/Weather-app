import React from "react";
import './forcast.scss'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Forcast({ data }) {
  const dayInAWeek = new Date().getDay();
 const forcastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title">Daily Forcast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((items, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    className="icon-small"
                    alt="weather"
                    src={`icons/${items.weather[0].icon}.png`}
                  />
                  <label className="day">{forcastDays[idx]}</label>
                  <label className="description">{items.weather[0].description}</label>
                  <label className="min-max">{Math.round(items.main.temp_max)}°C /{Math.round(items.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
              <div className="daily-details-grid-item">
                <label>Pressure:</label>
                <label>{items.main.pressure}</label>
              </div>
              <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{items.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <label>{items.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed:</label>
                  <label>{items.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level:</label>
                  <label>{items.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like:</label>
                  <label>{items.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default Forcast;
