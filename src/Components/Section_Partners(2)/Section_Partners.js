import React, { useEffect, useState } from 'react';
import classes from './Section_Partners.module.css'
import { Container, Grid, Button } from '@material-ui/core';
import MerchantCard from './Modals/MerchantCard/MerchantCard';
import { navigate } from 'hookrouter';

const Section_Partners = () => {

    const [cardData, setCardData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMerchantsList = async () => {
            try {
                setLoading(true)
    
                const response = await (await fetch('http://192.168.100.61:8081/getMerchlist')).json()
                
                if(response.info.length > 0){
                    setCardData(response.info)
                }
    
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        getMerchantsList()
    }, [])

    return(
        <div style={{paddingBottom: '100px', backgroundColor: '#f5f5f5', paddingTop: '50px'}} >
            <Container>
                <Grid container>
                    <Grid item xs={12} style={{textAlign: 'center'}} >
                        <h1 className={`${classes.HowToUse}`} >
                            Как покупать в рассрочку с картой ОРЗУ
                        </h1>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center', fontWeight: '800 !important'}} >
                        <span style={{fontWeight: '400'}} >
                            Придите к одному из наших партнёров
                        </span>
                    </Grid>
                </Grid>
                <Grid container style={{/*border: '1px solid rgba(0,0,0,.15)',*/ paddingTop: '20px'}} >
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap'}} >
                        {cardData.map((el, id) => {
                            // console.log(id);
                            if (id < 8) {
                              return (
                                  <div style={{padding: '15px'}} key={el['Logolink']} >
                                      <MerchantCard src={el['Logolink']} description={el['Merchid']} name={el['Merchname']} />
                                  </div>
                              )
                            }
                        })}
                    </div>
                </Grid>
                <Grid container justify="center" >
                    <Grid item xs={12} md={3} style={{paddingTop: '50px', textAlign: 'center'}} >
                        {/* <button className={`${classes.AllPartners}`} > */}
                            <Button className={`${classes.AllPartners}`} onClick={() => navigate('/merchants')} >
                                Все партнёры
                            </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Partners