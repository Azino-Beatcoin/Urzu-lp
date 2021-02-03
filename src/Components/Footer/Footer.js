import { Container, Grid } from '@material-ui/core';
import React from 'react';
import classes from './Footer.module.css'
import INSTAGRAMM_LOGO from '../../Images/instagramm.svg'
import FACEBOOK_LOGO from '../../Images/facebook.svg'
import TELEGRAM_LOGO from '../../Images/telegram.svg'
import VK_LOGO from '../../Images/vk.svg'

const Footer = ({background = '#ffffff'}) => {
    return(
        <div>
            <div style={{backgroundColor: background, paddingTop: '50px', paddingBottom: '50px'}} >
                <Container>
                    <Grid container>
                        <Grid item xs={12} sm={6} >
                            <p style={{fontSize: '20px', color: '#141312DE', fontWeight: '500'}} >
                                О нас
                            </p>
                            <p style={{fontSize: '16px', color: '#ACABAB', fontWeight: '500'}} >
                                Прогрессивная и одна из лидирующих микрофинансовых организаций в Таджикистане, предоставляющая банковские услуги более 100 тысячам клиентов.
                            </p>
                            <p style={{fontSize: '16px', color: '#ACABAB', fontWeight: '500'}} >
                                734061, г.Душанбе, ул Н. Карабаева, 148/1. Тел: 544
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <div style={{textAlign: 'right'}} className={`${classes.changeAlign2}`} >
                                <p style={{fontSize: '20px', color: '#141312DE', fontWeight: '500'}} >
                                    Мы в соц-сетях
                                </p>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '200px', marginLeft: 'auto', marginBottom: '25px'}} className={`${classes.Logos}`} >
                                    <a href="https://t.me/bankhumo" target="_blank" >
                                        <img width={40} src={TELEGRAM_LOGO} alt="telegram logo"/>
                                    </a>
                                    <a href="https://ru-ru.facebook.com/mdohumo" target="_blank" >
                                        <img width={40} src={FACEBOOK_LOGO} alt="facebook logo"/>
                                    </a>
                                    <a href="https://vk.com/humo_tj" target="_blank" >
                                        <img width={40} src={VK_LOGO} alt="vk logo"/>
                                    </a>
                                    <a href="https://www.instagram.com/humo.tj" target="_blank" >
                                        <img width={40} src={INSTAGRAMM_LOGO} alt="instagramm logo"/>
                                    </a>
                                </div>
                                <a href="tel:+992-88-777-55-44" className={`${classes.CallPhone}`} >
                                    <p style={{fontSize: '20px', color: '#ACABAB', fontWeight: '500'}} >
                                        (+992)88-777-55-44
                                    </p>
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
                    <hr style={{border: '1px solid rgba(0,0,0,.1)', backgroundColor: background, margin: '0px'}} />
            <div style={{backgroundColor: background, paddingTop: '10px', paddingBottom: '10px'}} >
                <Container>
                    <Grid container >
                        <Grid item xs={12} sm={6} >
                            <p style={{fontSize: '16px', color: "#ACABAB", fontWeight: '500'}} className={`${classes.changeAlign}`} >
                                © 2020 ЗАО МДО «Хумо»
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <p style={{fontSize: '16px', color: "#ACABAB", textAlign: 'right', fontWeight: '500'}} className={`${classes.changeAlign}`} >
                                Сделано с любовью, сделано для Вас
                            </p>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default Footer