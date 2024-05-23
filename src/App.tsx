import {useState, useEffect} from 'react'
import './App.css'
import GaugeComponent from 'react-gauge-component'

import pointerImage from './freesvgorg13428.png';

const BoostGauge = () => {
    // Calculate the positions of the ticks
    const ticks = Array.from({length: 11}).map((_, index) => {
        const tickAngle = index * 18; // 180 degrees divided by 10 ticks
        const tickX = Math.cos((tickAngle - 90) * (Math.PI / 180)) * 45 + 50; // Adjusted radius
        const tickY = Math.sin((tickAngle - 90) * (Math.PI / 180)) * 45 + 50;
        return (
            <circle
                key={index}
                cx={tickX}
                cy={tickY}
                r={index % 2 === 0 ? 2 : 1} // Larger tick for every other tick
                fill="black"
            />
        );
    });

    return (
        <svg width="200" height="100">
            {/* Draw the ticks */}
            {ticks}
        </svg>
    );
};


function App() {
    const [count, setCount] = useState<number>(0)
    const [rotationValue, setRotationValue] = useState<number>(0)
    const [climbing, setClimbing] = useState<boolean>(false)

    const sweepGauge = (r: number) => {
        if (climbing) {
            if (r < 200) {
                setRotationValue(prv => prv + 1)
            } else {
                setClimbing(false)
            }
        } else {
            if (r > -200) {
                setRotationValue(prv => prv - 1)
            } else {
                setClimbing(true)
            }
        }
    }

    useEffect(() => {
        setTimeout(() => sweepGauge(rotationValue), 10);

    }, [rotationValue, climbing]);

    return (
        <>
            <div style={{width: "400px"}}>
                <GaugeComponent
                    type="grafana"
                    maxValue={230}
                    value={190}
                />
                <img src={pointerImage} alt="pointer image"
                     style={{
                         transform: `rotate(${rotationValue}deg)`,
                         transition: '1s',
                         width: 100,
                         position: 'relative',
                         marginTop: '-115px',
                         marginLeft: '150px',
                         float: "left"
                     }}></img>
            </div>
            <BoostGauge/>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count} and rotationValue is {rotationValue} and we are {climbing ? "climbing" : "falling"}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </>
    )
}

export default App
