import { Container, Grid } from '@material-ui/core';
import React from 'react';
import classes from './Section_Order.module.css'
import OrderCard from './../OrderCard/OrderCard';

const Section_Order = () => {
    return(
        <div style={{paddingBottom: '100px', paddingTop: '50px', backgroundColor: '#fff'}} >
            <Container>
                <Grid container >
                    <Grid item xs={12} >
                        <h1 style={{textAlign: 'center'}} >
                            Заказать карту ОРЗУ
                        </h1>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} >
                        <OrderCard />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Order