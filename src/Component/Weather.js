import React from 'react'
import './Weather.css'

//This component is to render weather icons
export default function Weather(props) {
    const weather = props.weather.weather[0].main
    return (
        <div>
            <div className='box'>
                <p className={
                    (weather==='Haze')?'Haze':
                    (weather==='Clouds')?'Clouds':
                    (weather==='Smoke')?'Smoke':
                    (weather==='Rain')?'Rain':
                    (weather==='Clear')?'Clear':
                    (weather==='Snow')?'Snow':
                    (weather==='Drizzle')?'Drizzle'
                    :'Clear'
                    }></p> 
            </div>
        </div>
    )
}
