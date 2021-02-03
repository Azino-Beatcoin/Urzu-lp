import { Container, Grid } from '@material-ui/core';
import React from 'react';
import classes from './Section_Choose.module.css'
import POS_SVG from '../../Images/pos-terminal.svg'
import CARD_SVG from '../../Images/credit-card.svg'
import CUSTOMER_SVG from '../../Images/customer.svg'

const Section_Choose = () => {
    return(
        <div style={{backgroundColor: '#fff', paddingBottom: '100px', paddingTop: '50px'}} >
            <Container>
                <Grid container >
                    <Grid item xs={12} style={{textAlign: 'center', fontWeight: '800 !important'}} >
                        {/* <span style={{fontWeight: '400'}} > */}
                            <h1>
                                Выберите товар и используйте ОРЗУ
                            </h1>
                        {/* </span> */}
                    </Grid>
                </Grid>
                <Grid container style={{paddingTop: '50px'}} >
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={POS_SVG} alt="Pos-png" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    Подойдите к POS терминалу
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={CARD_SVG} alt="Pos-png" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    Используйте один из возможных способов оплаты
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={CUSTOMER_SVG} alt="Pos-png" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    Заберите товар
                                </span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Choose