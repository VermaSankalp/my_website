import React, {useState, useEffect} from 'react';
import './EnergyGame.css';

/*
Features to add:
Add an animation when the user presses space bar where '+1' pops up everytime.
Add sound for when the upgrades becomes purchasable. 
Add a buy 10 (press commmand to buy 10) and buy 100 (press control to buy 100) upgrade options
Make the background of the upgrades the image of what the upgrades are, ex: hamster wheels will be hamsters etc.
Make the name of the upgrades '???' when the lifetime energy is less than the cost of the upgrades -> Show the next 2 upgrades that the user can get as ???
Add random upgrades that go across the screen, when clicked they increase the spacePressMultiplier
*/

const EnergyGame = () => {
    const [energyLvl, setEnergyLvl] = useState(0);
    const [lifetimeEnergyLvl, setLifetimeEnergyLvl] = useState(0);
    // const [spacePressMultiplier, setSpacePressMultiplier] = useState(1);
    const [eps, setEps] = useState(0);
    const [showUpgrades, setShowUpgrades] = useState([false, false, false]);
    const [ownedUpgrades, setOwnedUpgrades] = useState([0, 0, 0]);
    const [upgradeCostColor, setUpgradeCostColor] = useState(['red', 'red', 'red']);
    const [style, setStyle] = useState(['none', 'none', 'none']);
    const [gameStart, setGameStart] = useState(false);
    const [message, setMessage] = useState(true);
    const [numToBuy, setNumToBuy] = useState(1);

    const handleSpacebarPress = (event) => {
        if (event.code === 'Space') {
            setMessage(false);
            setEnergyLvl((prev) => prev + (0.1)); //* spacePressMultiplier
            setLifetimeEnergyLvl((prev) => prev + (0.1)); //* spacePressMultiplier
        }
    }

    useEffect(() => {
        if (numToBuy === 1) {
            if (energyLvl >= 10 && energyLvl < 100) {
                const temp = ['white', 'red', 'red'];
                setUpgradeCostColor(temp);
            }
            else if (energyLvl >= 100 && energyLvl < 1000) {
                setUpgradeCostColor(['white', 'white', 'red']);
            }
            else if (energyLvl >= 1000 && energyLvl < Math.pow(2, Math.pow(10,1000))) {
                setUpgradeCostColor(['white', 'white', 'white']);
            }
            else {
                setUpgradeCostColor(['red', 'red', 'red']);
            }
        }
        else if (numToBuy === 10) {
            if (energyLvl >= 100 && energyLvl < 1000) {
                const temp = ['white', 'red', 'red'];
                setUpgradeCostColor(temp);
            }
            else if (energyLvl >= 1000 && energyLvl < 10000) {
                setUpgradeCostColor(['white', 'white', 'red']);
            }
            else if (energyLvl >= 10000 && energyLvl < Math.pow(2, Math.pow(10,1000))) {
                setUpgradeCostColor(['white', 'white', 'white']);
            }
            else {
                setUpgradeCostColor(['red', 'red', 'red']);
            }
        }
        else {
            if (energyLvl >= 1000 && energyLvl < 10000) {
                const temp = ['white', 'red', 'red'];
                setUpgradeCostColor(temp);
            }
            else if (energyLvl >= 10000 && energyLvl < 100000) {
                setUpgradeCostColor(['white', 'white', 'red']);
            }
            else if (energyLvl >= 100000 && energyLvl < Math.pow(2, Math.pow(10,1000))) {
                setUpgradeCostColor(['white', 'white', 'white']);
            }
            else {
                setUpgradeCostColor(['red', 'red', 'red']);
            }
        }

        if (lifetimeEnergyLvl >= 10 && lifetimeEnergyLvl < 100) {
            setShowUpgrades([true, false, false]);
        }
        else if (lifetimeEnergyLvl >= 100 && lifetimeEnergyLvl < 1000) {
            setShowUpgrades([true, true, false]);
        }
        else if (lifetimeEnergyLvl >= 1000 && lifetimeEnergyLvl < Math.pow(2, Math.pow(10,1000))) {
            setShowUpgrades([true, true, true]);
        }
        else {
            setShowUpgrades([true, false, false]);
        }

        window.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
            }
        })
    }, [lifetimeEnergyLvl, energyLvl, numToBuy]);

    const buyUpgrade = (number) => {
        if (number === 0 && energyLvl >= 10) {
            if (numToBuy === 1) {
                setEnergyLvl(energyLvl - 10);
                setEps(eps + 1);
                setOwnedUpgrades([ownedUpgrades[0] + 1, ownedUpgrades[1], ownedUpgrades[2]]);
                setInterval(() => {
                    setEnergyLvl((prev) => prev + 1);
                    setLifetimeEnergyLvl((prev) => prev + 1);
                }, 1000);
            }
            else if (numToBuy === 10) {
                setEnergyLvl(energyLvl - 100);
                setEps(eps + 10);
                setOwnedUpgrades([ownedUpgrades[0] + 10, ownedUpgrades[1], ownedUpgrades[2]]);
                setInterval(() => {
                    setEnergyLvl((prev) => prev + 10);
                    setLifetimeEnergyLvl((prev) => prev + 10);
                }, 1000);
            }
            else {
                setEnergyLvl(energyLvl - 1000);
                setEps(eps + 100);
                setOwnedUpgrades([ownedUpgrades[0] + 100, ownedUpgrades[1], ownedUpgrades[2]]);
                setInterval(() => {
                    setEnergyLvl((prev) => prev + 100);
                    setLifetimeEnergyLvl((prev) => prev + 100);
                }, 1000);
            }
        }
        else if (number === 1 && energyLvl >= 100) {
            setEnergyLvl(energyLvl - 100);
            setEps(eps + 5);
            setOwnedUpgrades([ownedUpgrades[0], ownedUpgrades[1] + 1, ownedUpgrades[2]]);
            setInterval(() => {
                setEnergyLvl((prev) => prev + 5);
                setLifetimeEnergyLvl((prev) => prev + 5);
            }, 1000);
        }
        else if (number === 2 && energyLvl >= 1000) {
            setEnergyLvl(energyLvl - 1000);
            setEps(eps + 50);
            setOwnedUpgrades([ownedUpgrades[0], ownedUpgrades[1], ownedUpgrades[2] + 1]);
            setInterval(() => {
                setEnergyLvl((prev) => prev + 50);
                setLifetimeEnergyLvl((prev) => prev + 50);
            }, 1000);
        }
    }

    const renderBox = (number) => {
        if (number === 0) {
            setStyle(['block', 'none', 'none']);
        }
        else if (number === 1) {
            setStyle(['none', 'block', 'none']);
        }
        else if (number === 2) {
            setStyle(['none', 'none', 'block']);
        }
    }
    
    const unrenderBox = () => {
        setStyle(['none', 'none', 'none']);
    }

    const startGame = () => {
        setGameStart(true);
    }

    return (
        <>
        {!gameStart &&
            <div className="gameStartMainDiv">
                <p className="gameStartTitleText">nrg farmer.</p>
                <p className="gameStartText">this is a game meant to be played with a keyboard using a <strong>laptop or computer ideally.</strong></p>
                <p className="gameStartText">the aim of this game is to collect energy by pressing the spacebar</p>
                <p className="gameStartText">after collecting enough energy, you can unlock upgrades which will auto-collect energy for you every second</p>
                <p className="gameStartText">there are multiple upgrades you can purchase after collecting certain levels of energy</p>
                <button onClick={startGame} className="gameStartButton">start.</button>
            </div>
        }
        {gameStart && <div className="energyGameMainDiv ">
            <div onKeyUp={handleSpacebarPress} className="energyGameClickableDiv" tabindex="0" >
                {message && <p className="startColelctingText">click the screen and press space to start collecting energy</p>}
                {/* <button onClick={endGame} className="gameStartButton">back.</button> */}
                <p style={{fontSize: 'x-large'}}>{`${energyLvl.toFixed(1)} Joules`}</p> <br />
                <p style={{fontSize: 'medium'}}><strong>{`${eps} joule(s) per second`}</strong></p>
                <div className="energyGameUpgradeDiv">
                    <div className="energyGameBuyButtons">
                        <button onClick={() => setNumToBuy(1)}>buy 1.</button>
                        <button onClick={() => setNumToBuy(10)}>buy 10.</button>
                        <button onClick={() => setNumToBuy(100)}>buy 100.</button>
                    </div>
                    {showUpgrades[0] && <div className="energyGameUpgradeOne">
                        <div style={{display: style[0]}} className="energyGameHoverBox">
                            {numToBuy === 1 && <p style={{color: 'white'}}>purchasing this upgrade will increase your joules per second by 1.</p>}
                            {numToBuy === 10 && <p style={{color: 'white'}}>purchasing this upgrade will increase your joules per second by 10.</p>}
                            {numToBuy === 100 && <p style={{color: 'white'}}>purchasing this upgrade will increase your joules per second by 100.</p>}
                        </div>
                        <button className="invisibleButton" 
                            onClick={() => {buyUpgrade(0)}}
                            onMouseOver={() => {renderBox(0)}}
                            onMouseOut={unrenderBox}
                        >
                            <p className="energyGameUpgradeTitleText">hamster wheel.</p>
                            {numToBuy === 1 && <p className='energyGameUpgradeTitleText' style={{color: upgradeCostColor[0]}}>10 J</p>}
                            {numToBuy === 10 && <p className='energyGameUpgradeTitleText' style={{color: upgradeCostColor[0]}}>100 J</p>}
                            {numToBuy === 100 && <p className='energyGameUpgradeTitleText' style={{color: upgradeCostColor[0]}}>1000 J</p>}
                            <p className="energyGameUpgradeDescrptText">
                                <i>"magical immortal hamsters that run on a wheel that generate energy for you"</i>
                            </p>
                            <p className="energyGameNumOfUpgrades">{`owned: ${ownedUpgrades[0]}`}</p>
                        </button>
                    </div>}
                    {showUpgrades[1] && <div className="energyGameUpgradeOne">
                        <div style={{display: style[1]}} className="energyGameHoverBox">
                            <p style={{color: 'white'}}>purchasing this upgrade will increase your joules per second by 5.</p>
                        </div>
                        <button className="invisibleButton" 
                            onClick={() => {buyUpgrade(1)}}
                            onMouseOver={() => {renderBox(1)}}
                            onMouseOut={unrenderBox}
                        >
                            <p className="energyGameUpgradeTitleText">energy-gen bike.</p>
                            <p className='energyGameUpgradeTitleText' style={{color: upgradeCostColor[1]}}>100 J</p>
                            <p className="energyGameUpgradeDescrptText">
                                <i>"energy generating bikes pedalled by the race of highlander magical imps to generate free energy, all for you..."</i>
                            </p>
                            <p className="energyGameNumOfUpgrades">{`owned: ${ownedUpgrades[1]}`}</p>
                        </button>
                    </div>}
                    {showUpgrades[2] && <div className="energyGameUpgradeOne">
                        <div style={{display: style[2]}} className="energyGameHoverBox">
                            <p style={{color: 'white'}}>purchasing this upgrade will increase your joules per second by 50.</p>
                        </div>
                        <button className="invisibleButton" 
                            onClick={() => {buyUpgrade(2)}}
                            onMouseOver={() => {renderBox(2)}}
                            onMouseOut={unrenderBox}
                        >
                            <p className="energyGameUpgradeTitleText">solar panel.</p>
                            <p className='energyGameUpgradeTitleText' style={{color: upgradeCostColor[2]}}>1000 J</p>
                            <p className="energyGameUpgradeDescrptText">
                                <i>"panels installed by the magical trolls to generate energy by harnessing the power of the sun"</i>
                            </p>
                            <p className="energyGameNumOfUpgrades">{`owned: ${ownedUpgrades[2]}`}</p>
                        </button>
                    </div>}
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default EnergyGame;