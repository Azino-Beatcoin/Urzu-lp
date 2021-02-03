import React from 'react';
import classes from './MerchantCard.module.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { navigate } from 'hookrouter';

const MerchantCard = ({src, name, description}) => {
    return(
        <div className={`${classes.MainCard} ${classes.cardShadow}`} >
            
            <div className={`${classes.ImageBox}`} >
                <img src={src} width="200px" alt="1232"/>
            </div>
            <div style={{display: 'flex', padding: '30px 15px 10px 15px', width: '100%', backgroundColor: '#fff', alignItems: 'center', height: '60px'}} >
                <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'left'}} >
                    <span className={`${classes.Name}`} >{name}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '220px'}} >
                    <button className={`${classes.LookButton}`} onClick={() => navigate(`/merchants/${description}`)} > <NavigateNextIcon /> </button>
                </div>
            </div>
        </div>
    )
}

export default MerchantCard