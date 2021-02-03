import React from 'react';
import classes from './Section_Questions.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@material-ui/core';
import { ExpandMoreTwoTone } from '@material-ui/icons';

const arr = [
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui hniuh hiu hiuh hiuhiuhiu hiuhiuhiu huhiuhiu hiu',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue, hgciurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue ,hgciurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue, hgciurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue,hg ciurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue,hgc iurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegc rehgue,hgciurehgrexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue,hgciurehg rexhgues,hnxiurehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
    [
        'gosjfdgjjgdijhnindhdgiuntiubnrtsiuhnsrtginsui',
        'ofij9cmguerhegchghtcmhoireuthcxhegcrehgue,hgciurehgrexhgues,hnxiur ehgoiex,hgrhgiuhgiuhreghreiughroghirhgioahreoaiughr'
    ],
]

const Section_Question = () => {
    return(
        <div style={{backgroundColor: '#f5f5f5', paddingTop: '50px', paddingBottom: '100px'}} >
            <Container>
                <Grid container >
                    <Grid item xs={12} >
                        <h1 style={{textAlign: 'center'}} >
                            Часто задаваемые вопросы
                        </h1>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} >
                        <div style={{padding: '15px 20px'}} >
                            {
                                arr.map((elem, ind) => (
                                    <Accordion style={{margin: '0 auto 20px auto', maxWidth: '700px', borderRadius: '6px', minHeight: '70px'}} >
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreTwoTone />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        style={{paddingTop: '13px', paddingBottom: '13px'}}
                                        >
                                            <Typography style={{fontSize: '16px', fontWeight: '500'}} >{elem[0]}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography style={{fontSize: '15px', color: '#24242499'}} >{elem[1]}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            }
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Section_Question