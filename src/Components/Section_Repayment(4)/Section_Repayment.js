import React from 'react';
import classes from './Section_Repayment.module.css'
import { Container, Grid } from '@material-ui/core';
import Humo_Online from '../../Images/android.svg'
import BANK_SVG from '../../Images/bank.svg'
import ATM_SVG from '../../Images/atm.svg'

const Section_Repayment = () => {
    return(
        <div style={{paddingTop: '50px', paddingBottom: '100px', backgroundColor: '#f5f5f5'}} >
            <Container>
                <Grid container style={{paddingBottom: '80px'}} >
                    <Grid item xs={12} >
                        <h1 style={{textAlign: 'center'}}>
                            Начните погашать рассрочку
                        </h1>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={Humo_Online} alt="Humo online wallet" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    В приложении Humo Online
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={BANK_SVG} alt="Humo online wallet" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    В точках обслуживания Хумо
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} md={4} style={{paddingBottom: '60px'}} >
                        <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                                <img width='150px' src={ATM_SVG} alt="Pos-png" />
                            </div>
                            <div style={{paddingTop: '20px', textAlign: 'center'}} >
                                <span style={{fontSize: '16px'}} >
                                    С помощью платёжных терминалов Humo Pay
                                </span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Repayment