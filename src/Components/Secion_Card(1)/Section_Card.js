import { Container, Grid, Hidden, Typography, Button } from '@material-ui/core';
import React from 'react';
import classes from './Section_Card.module.css'
import CardImage from '../../Images/LahzaCard.png'
import {Link} from 'react-scroll'

const Section_Card = () => {
    return(
        <div style={{paddingBottom: '150px', backgroundColor: '#fff'}} >
            <Container>
                <Grid container style={{paddingTop: 100}} className={`${classes.Card_Main}`} >
                    <Hidden mdUp >
                        <Grid item xs={12} >
                            <div style={{display: 'flex', justifyContent: 'center'}} >
                                <img src={CardImage} style={{width: '85%', maxWidth: '400px'}} />
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <div className={`${classes.SloganGroup}`} >
                            <h1 className={`${classes.Slogan}`} >
                                ОРЗУ
                            </h1>
                            <h2 className={`${classes.lowerSlogan}`} >
                                карта для покупок в рассрочку
                            </h2>
                            <Link to="OrderCard" spy={true} smooth={true} offset={-200} duration={500} >
                                <Button className={`${classes.button}`}><span>Заказать карту</span></Button>
                            </Link>
                        </div>

                    </Grid>
                    <Hidden smDown >
                        <Grid item xs={6} >
                            <div style={{display: 'flex', justifyContent: 'center'}} >
                                <div style={{position: 'relative'}}>
                                    <img src={CardImage} width="400px" style={{position: 'relative',zIndex: 3}} />
                                    <div style={{position: 'absolute', width: 400, height: 250, background: 'rgba(0,0,0,.5)',borderRadius: 10, top: 33,left: -35, zIndex: 1, transform: 'rotate(170deg)'}}></div>
                                </div>
                            </div>
                        </Grid>
                    </Hidden>
                    {/* <Grid xs={12} md={4} >
                    </Grid> */}
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Card