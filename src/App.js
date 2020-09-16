import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [rover, setRover] = useState("curiosity")
    const [camera, setCamera] = useState("fhaz")
    const [sol, setSol] = useState(null)
    const [data, setData] = useState(null)
    let [imageToShow, setImagetoShow] = useState(2);
    const hendleChange1 = (e) => {
        setRover(e.currentTarget.value)
        setImagetoShow(imageToShow=2)
    }
    const hendleChange2 = (e) => {
        setCamera(e.currentTarget.value)
        setImagetoShow(imageToShow=2)
    }
    const hendleChange3 = (e) => {
        setSol(e.currentTarget.value)
        setImagetoShow(imageToShow=2)
    }
    const hendleSubmit = (e) => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=CMmKidrraZtZG62lBQz4zbQYziw1sAKfufDdZBC8`)
            .then((rez) => {
                setData(rez.data.photos.slice(0, imageToShow))
            })
        e.preventDefault()
    }
    const loadMore = () => {
        setImagetoShow(imageToShow + 2)
    }
    useEffect(() => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=CMmKidrraZtZG62lBQz4zbQYziw1sAKfufDdZBC8`)
            .then((rez) => {
                setData(rez.data.photos.slice(0, imageToShow))
            })
    }, [imageToShow])

    return <div className="App">
        <form onSubmit={hendleSubmit}>
            <p>Rover</p>
            <select onChange={hendleChange1}>
                <option value={"curiosity"}>Curiosity</option>
                <option value={"opportunity"}>Opportunity</option>
                <option value={"spirit"}>Spirit</option>
            </select>
            <p>Camera</p>
            <select onChange={hendleChange2}>
                <option value={"fhaz"}>Front</option>
                <option value={"rhaz"}>Rear</option>
                <option value={"navcam"}>Navigation</option>
            </select>
            <div>
                <label>Sol</label>
                <input onChange={hendleChange3}/>
            </div>
            <button>let's see</button>
        </form>
        <>
            {!data ? null : data.map((d) => <><img key={d.id} src={d.img_src} alt={'mars'}/></>)}
            {!data ? null : <button onClick={loadMore}>showMore</button>}
        </>
    </div>
}

export default App;
