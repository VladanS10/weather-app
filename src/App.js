import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({});
  const [data5, setData5] = useState([]);
  const [fiveDays, setFiveDays] = useState(1)
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d34215484337d226374b727d251f1608` 
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=d34215484337d226374b727d251f1608`

  const smallCard = (day,index) =>{
    console.log(day);
    return(
      <div className='daily' key={index}>
          {getDayName(day.dt)}
        <p>
          {day.dt_txt.slice(0, 10)}
          
        </p>
          {day.main.temp_max}&#176;C
      </div>
    )
  } 

  const getDayName = (timeStamp) =>{
    var xx = new Date();
    xx.setTime(timeStamp*1000);
    switch (xx.getDay()){
      case 0:
        return "Sunday";
      break;
      case 1:
        return "Monday";
      break;
      case 2:
        return "Thuesday";
      break;
      case 3:
        return "Wensday";
      break;
      case 4:
        return "Thursday";
      break;
      case 5:
        return "Friday";
      break;
      case 6:
        return "Saturday";
      break;
    default: 
    break;
    }
    
  }

  const getOnePerDay = (data) =>{
    data5.length = 0;
    data.map((day) =>{
      const time = day.dt_txt.slice(11);
      if(time == "15:00:00"){
        data5.push(day)
      }
    })
    setFiveDays(2)

  }

  const getFiveDaysWeather = (url) =>{
    axios.get(url).then((response) =>{
      getOnePerDay(response.data.list)
    })
  }

  const getOneDayWeather = (url) =>{
    axios.get(url).then((response) =>{
      setData(response.data)
    })
  }

  const search = (event) =>{
    if(event.key === 'Enter'){
      getOneDayWeather(url);
      getFiveDaysWeather(url2);
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={event => {
          setLocation(event.target.value)
          setFiveDays(fiveDays + 1)}
        }

        onKeyPress={search}
        placeholder="Enter Location"
        type="text"/>
        
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}&#176;C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>



        {data.name != undefined &&
        <div className="bottom">
           <div className="feels">
             {data.main ? <p className='bold'>{data.main.feels_like}</p> : null}
             <p>Feels Like</p>
           </div>
           <div className="humidity">
             {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
             <p>Humidity</p>
           </div>
           <div className="wind">
             {data.wind ? <p className='bold'>{data.wind.speed}km/h</p> : null}
             <p>Wind Speed</p>
           </div>
        </div>
        }

        
      </div>

      <div className="fiveDays" key={fiveDays}>
        {data5.length > 0 && data5.map((day, index) => {
          return smallCard(day, index)
        }
        )}
      </div>



    </div>
  );
        }


export default App;
