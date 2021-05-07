import {useState,useEffect} from 'react'
import image from '../img/sun2.png'
import humid from '../img/humid.png'
import up from '../img/up.png'
import down from '../img/down.png'
import './Forecast.css'

export default  function Forecast(props) {
    const date = new Date();
    const today = ( date.getFullYear())+"-"+("00" + (date.getMonth() + 1)).slice(-2)
                + "-" + ("00" + date.getDate()).slice(-2) + " "
                + ("00" + date.getHours()).slice(-2) + ":"
                + ("00" + date.getMinutes()).slice(-2)
                + ":" + ("00" + date.getSeconds()).slice(-2);
   
    const [flag,setFlag] = useState(false);
    const [flag2,setFlag2] = useState(true);
    const [yestarday,setYestarday] = useState({time:'',temp:'',speed:''});
    const [todays,setTodays] = useState({time:[],temp:[],speed:[]})
    const [tomorrow,setTomorrow] = useState({days:[],temp_min:[],temp_max:[],humidity:[]});
    const days = []
    const temp_min = []
    const temp_max = []
    const humidity = []
    const now_time = []
    const now_temp = []
    const now_speed = []
    let counter=[]
   const newdate = '00:00:00'

  useEffect(()=>{
   
    return () => {
      console.log('as');
    }
  },[flag,flag2])
    
  //Counter for no of Days
      for(let i=0;i<5;i++){
          counter[i]=(date.getDay())+(i+1)
          if(counter[i]===7){counter[i]=0}
          else if(counter[i]===8){counter[i]=1}
          else if(counter[i]===9){counter[i]=2}
          else if(counter[i]===10){counter[i]=3}
          else if(counter[i]===11)counter[i]=4
          else counter[i]=(date.getDay())+(i+1)
      }

      //For toggle Button
    const slide = async() => {
        if(!flag && flag2 ){
            setFlag(true)
            setFlag2(false)
        }
        if(flag && !flag2){
            setFlag(false)
            setFlag2(true) 
        }
        //For yestarday
         props.forecast.list.map(element => {
            if(today.split(' ')[0]>=element.dt_txt.split(' ')[0] && today.split(' ')[1]>=element.dt_txt.split(' ')[1]){
                    setYestarday({...yestarday,
                        time:element.dt_txt.split(' ')[1].split(':')[0]+':00',
                        temp:Math.round(element.main.temp),
                        speed:(element.wind.speed * 3.6).toFixed(1)
                    })
               }
             })
        // for today
        props.forecast.list.filter(element => {
            if(today.split(' ')[0]===element.dt_txt.split(' ')[0]  && today.split(' ')[1] <= element.dt_txt.split(' ')[1] ){
                    now_time.push(element.dt_txt.split(' ')[1].split(':')[0]+':00')
                    now_temp.push(Math.round(element.main.temp))
                    now_speed.push((element.wind.speed * 3.6).toFixed(1))
                }
           else if(today.split(' ')[0]<element.dt_txt.split(' ')[0] && today.split(' ')[1] > element.dt_txt.split(' ')[1]){
                    now_time.push(element.dt_txt.split(' ')[1].split(':')[0]+':00')
                    now_temp.push(Math.round(element.main.temp))
                    now_speed.push((element.wind.speed * 3.6).toFixed(1))
            }
             })
        
        
        //For tomorrows
        props.forecast.list.filter(element => {
            if(today.split(' ')[0]<element.dt_txt.split(' ')[0] && element.dt_txt.split(' ')[1] === newdate){
              days.push(element.dt_txt.split(' ')[0]);
              temp_min.push(Math.round(element.main.temp_min));
              temp_max.push(Math.round(element.main.temp_max));   
              humidity.push(element.main.humidity)   
                     }
                   }) 
                
         setTomorrow({...tomorrow,days:days,temp_min:temp_min,temp_max:temp_max,humidity:humidity})
         setTodays({...todays,time:now_time,temp:now_temp,speed:now_speed})
    }
  console.log(todays);
    
    return (
        <div>{flag ?
            <div className='new-div'>
              <div className='container1'>
                 <h1>Today</h1>
              </div>
              <div className='container2'>  
             <div className='c1'>{yestarday.time} 
                <p>{yestarday.temp}°</p>
                <p className='speed'>{yestarday.speed}km/h</p>
             </div>
             <div className='c2'>Now 
             <p>{props.temp}°</p> 
             <p className='speed'>{(props.speed*3.6).toFixed(1)}km/h</p>
             </div>
             <div className='c3'>
                 {todays.time.slice(0,3).map((today,index)=>{
                 return(
                 <div className='c3-a' key={index}>
                 <p className='c3-time'>{today}</p>
                 <p className='c3-temp'>{todays.temp[index]}°</p>
                 <p className='c3-speed'>{todays.speed[index]}km/h</p>
                 </div>)
             })}
             </div>
              </div>
              <p className='upcoming'>Next 5 Days</p>
              <div className='container3'>
                    <div className='box1'>
                        <p className='b1'>{props.Day[counter[0]].slice(0, 3).toUpperCase()}</p>
                        <p className='b2'>{tomorrow.days[0].split('-')[2]}/{tomorrow.days[0].split('-')[1]}</p>
                        <p className='b3'>{tomorrow.temp_min[0]}° / {tomorrow.temp_max[0]}°</p>
                        <p className='b4'><img src={image} alt='1' width="35" height="35" /></p>
                        <p className='b5'><img src={humid} alt="" width='15' height="25" /></p>
                        <p className='b6'>{tomorrow.humidity[0]}%</p>
                        
                    </div>
                    <div className='box2'>
                        <p className='b1'>{props.Day[counter[1]].slice(0, 3).toUpperCase()}</p>
                        <p className='b2'>{tomorrow.days[1].split('-')[2]}/{tomorrow.days[1].split('-')[1]}</p> 
                        <p className='b3'>{tomorrow.temp_min[1]}° / {tomorrow.temp_max[1]}°</p>
                        <p className='b4'><img src={image} alt='1' width="35" height="35" /></p>
                        <p className='b5'><img src={humid} alt="" width='15' height="25" /></p>
                        <p className='b6'>{tomorrow.humidity[1]}%</p>

                    </div>
                    <div className='box3'>
                        <p className='b1'>{props.Day[counter[2]].slice(0, 3).toUpperCase()}</p>
                        <p className='b2'>{tomorrow.days[2].split('-')[2]}/{tomorrow.days[2].split('-')[1]}</p> 
                        <p className='b3'>{tomorrow.temp_min[2]}° / {tomorrow.temp_max[2]}°</p>
                        <p className='b4'><img src={image} alt='1' width="35" height="35" /></p>
                        <p className='b5'><img src={humid} alt="" width='15' height="25" /></p>
                        <p className='b6'>{tomorrow.humidity[2]}%</p>
                    </div>
                    <div className='box4'>
                        <p className='b1'>{props.Day[counter[3]].slice(0, 3).toUpperCase()}</p>
                        <p className='b2'>{tomorrow.days[3].split('-')[2]}/{tomorrow.days[3].split('-')[1]}</p> 
                        <p className='b3'>{tomorrow.temp_min[3]}° / {tomorrow.temp_max[3]}°</p>
                        <p className='b4'><img src={image} alt='1' width="35" height="35" /></p>
                        <p className='b5'><img src={humid} alt="" width='15' height="25" /></p>
                        <p className='b6'>{tomorrow.humidity[3]}%</p>
                    </div>
                    <div className='box5'>
                        <p className='b1'>{props.Day[counter[4]].slice(0, 3).toUpperCase()}</p>
                        <p className='b2'>{tomorrow.days[4].split('-')[2]}/{tomorrow.days[4].split('-')[1]}</p> 
                        <p className='b3'>{tomorrow.temp_min[4]}° / {tomorrow.temp_max[4]}°</p>
                        <p className='b4'><img src={image} alt='1' width="35" height="35" /></p>
                        <p className='b5'><img src={humid} alt="" width='15' height="25" /></p>
                        <p className='b6'>{tomorrow.humidity[4]}%</p>
                    </div>
                   
              </div>
                
            </div>
        
        :'' }    
            <button className='click' onClick={slide}>
                {!flag? <img src={up} alt='up' width='20' height='10'/> : 
                <img src={down} alt='down' width='20' height='10'/>}
            </button>
        </div>
    )
}
