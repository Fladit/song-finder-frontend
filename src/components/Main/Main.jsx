import React, {useEffect, useState} from 'react';
import "./main.css"
import axios from "axios"
import getTime from "./time";

const Main = () => {
    const hostURL = "http://localhost:3001"
    const [link, setLink] = useState("");
    const [checked, setChecked] = useState(false)
    const [firstInputValue, setFirstInputValue] = useState(0)
    const [secondInputValue, setSecondInputValue] = useState(1)
    const [duration, setDuration] = useState(10);
    const distinction = 100;
    useEffect(() => {
        console.log(firstInputValue, secondInputValue)
    })

    const changeLink = (e) => {
        console.log(link);
        setLink(e.target.value);
    }
    const findVideo = async (videoUrl) => {
        try {
            const res = await axios.post(`${hostURL}/duration`, {id: videoUrl});
            console.log(`Duration: ${res.data.duration}`);
            if (res.data.duration > 5)
            {
                const newLink = "https://www.youtube.com/embed/" + res.data.videoID;
                setDuration(res.data.duration);
                setLink(newLink);
                setChecked(true);
            }
        }
        catch (e) {
            throw e;
        }
    };

    const findSong = () => {

    };

    const changeFirstInputValue = (e) => {
        const value = parseInt(e.target.value);
        if (value < secondInputValue && ((secondInputValue - value) <= distinction)) {
            //console.log("yes ", value, " ", secondInputValue);
            setFirstInputValue(value);
            //e.preventDefault();
        }
    };

    const changeSecondInputValue = (e) => {
        const value = parseInt(e.target.value);
        //console.log(typeof e.target.value, typeof secondInputValue, "70" > 100,  70 > 100, "70" > "100")
        if (value > firstInputValue && (value - firstInputValue <= distinction))
        {
            //console.log("yes", firstInputValue, value);
            setSecondInputValue(value);
        }

    };

    return (
        <div className={"main"} style={!checked? {marginTop: "30vh"}: {marginTop: 35}}>
            <div className={"main-track"}>Что за трек?</div>
            <div className={"main-insert-title"}>Вставьте ссылку на видео с YouTube</div>
            <input type={"text"} maxLength={70} className={"main-input-link"}  value={link} onChange={changeLink} placeholder={"Введите ссылку на видео...."}/>
            {checked? <div className={"main-container"}>
                {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                <iframe className={"main-youtube-player"} width="560" height="370" src={link} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                        <div className={"main-container-text-fields"}>
                            <div className={"main-container-text-fields-time"}>{getTime(firstInputValue)}</div>
                            <div className={"main-container-text-fields-text"}> Введите промежуток </div>
                            <div className={"main-container-text-fields-time"}>{getTime(secondInputValue)}</div>
                        </div>
                <div className={"range-slider"}>
                    <input type={"range"} min={"0"} max={duration} step={"1"} value={firstInputValue} onChange={changeFirstInputValue} />
                    <input type={"range"} min={"0"} max={duration} step={"1"} value={secondInputValue} onChange={changeSecondInputValue}/>
                </div>
                        </div>:""}
            <button onClick={ () => !checked? findVideo(link) : findSong(link)}> Найти </button>
        </div>
    );
};

export default Main;