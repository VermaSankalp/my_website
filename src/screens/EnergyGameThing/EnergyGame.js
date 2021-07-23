import React, {useState} from 'react';

const EnergyGame = () => {
    const [energyLvl, setEnergyLvl] = useState(0);

    const handleSpacebarPress = (event) => {
        if (event.code === 'Space') {
            setEnergyLvl((prev) => prev + 0.1);
        }
    }

    return (
        <>
        <div onKeyUp={handleSpacebarPress} style={{textAlign: 'center', width: '100vw', height: '92vh'}} tabindex="0" >
            {`${energyLvl.toFixed(1)} Joules`}
        </div>
        </>
    )
}

export default EnergyGame;