const API_KEY = '606977ee3f66c9b38b4e0f08802402a4';
const makeIconURL = (iconid)=>`https://openweathermap.org/img/wn/${iconid}@2x.png`

const getFormattedWeatherData = async (city,units="imperial")=>{
   
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(url)
    .then((res)=>res.json());

    console.log(data);

    const {
        weather,
        main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
        wind:{speed},
        sys:{country,sunrise,sunset},
        name,
        visibility,
        dt,
    }=data;

    
    
    const {description,icon}=weather[0];

    console.log(description);
    console.log(icon);
    
    return{
        description, icon,
        iconURL : makeIconURL(icon),
        temp,feels_like,
        temp_min,temp_max,
        pressure,humidity,
        speed,country,
        sunrise,sunset,
        name,visibility,
        dt,
    }};
export { getFormattedWeatherData };
