import React , {useState} from 'react';
import ImageDown from '../../assets/downIcon.png';
import ImageUp from '../../assets/upIcon.png';

//width: 600 in the <h2> tag is causing responsive page issues 

const DropdownCard = (props) => {
    const [showText, setShowText] = useState(props.showText);

    const changeIcon = () => setShowText(!showText);

    return (
        <div>
            {!showText && 
                <>
                    <h2 style={{display: 'inline-block', width: '60%'}}>{props.title}</h2>
                    <img src={ImageDown} className="downArrow" alt='down arrow' onClick={changeIcon} style={{width: 40, height: 40, position: 'relative', bottom: 7, right: 20}}/>
                </>
            }
            {showText && 
                <div style={{textAlign: 'center'}}>
                    <h2 style={{display: 'inline-block', width: '60%'}}>{props.title}</h2>
                    <img src={ImageUp} alt='up arrow' onClick={changeIcon} style={{width: 40, height: 40, position: 'relative', bottom: 7, right: 20}}/>
                    <ul style={{listStyleType: 'none'}}>
                        <div style={{borderBottom: '2px solid black', marginRight: 30}}> 
                            <p style={{padding: 40}}>
                                    {props.text.map(item => {
                                        return (
                                            <li style={{margin: 10}}>
                                                {item}
                                            </li>
                                        )
                                    })}
                            </p> 
                        </div>
                    </ul>
                </div>
            }
        </div>
    )
}

export default DropdownCard;