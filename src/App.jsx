import React, { useEffect, useState } from "react";
import { TextField, Slide, CircularProgress } from '@mui/material';
import "./App.css";

const API_KEY = "b90ed71a7ff81a1c87b0ef578140938e";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [cityName, setCityName] = useState("Roma");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        if (response.ok) {
          setError(false);
          const result = await response.json();
          setData(result);
        } else {
          throw new Error("Algo ocorreu errado!");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    <div className="bg_img">
      {!loading ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="city">{data.name}</h1>
          <div className="group">
            {data.weather && data.weather[0] && data.weather[0].icon && (
              <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather icon" />
            )}
            {data.weather && data.weather[0] && data.weather[0].main && (
              <h1>{data.weather[0].main}</h1>
            )}
          </div>

          <h1 className="temp">{data.main.temp.toFixed()} ° C</h1>
          <Slide direction="right" timeout={800} in={!loading}>
            <>
              <div className="box_container">
                <div className="box">
                  <p>Humidade</p>
                  <h1>{data.main.humidity.toFixed()}%</h1>
                </div>
              </div>

              <div className="box_container">
                <div className="box">
                  <p>Velocidade do Vento</p>
                  <h1>{data.wind.speed.toFixed()} km/h</h1>
                </div>
              </div>

              <div className="box_container">
                <div className="box">
                  <p>Sensação de</p>
                  <h1>{data.main.feels_like.toFixed()} ° C</h1>
                </div>
              </div>
            </>
          </Slide>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
