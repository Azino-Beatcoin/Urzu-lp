import React, { useEffect, useState } from 'react';
import classes from './Merchant.module.css'
import { Container, AppBar, useScrollTrigger, Grid, Table, TableHead, TableBody, TableRow, withStyles, TableCell, Link, Breadcrumbs } from '@material-ui/core';
import BackToTop from './../BackToTop/BackToTop';
import Header from '../Header/Header';
import { A } from 'hookrouter';
import OrderCard from '../OrderCard/OrderCard';
import Footer from '../Footer/Footer';
import * as Scroll from 'react-scroll'

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const arr = [
    {
        month: '1 месяц',
        comission: '3%'
    },
    {
        month: '2 месяц',
        comission: '4%'
    },
    {
        month: '3 месяц',
        comission: '5%'
    },
    {
        month: '6 месяц',
        comission: '8%'
    },
    {
        month: '12 месяц',
        comission: '15%'
    },
]



const ActiveLastBreadcrumb = (merchName) => {
    return (
      <Breadcrumbs aria-label="breadcrumb">
          <A href="/" style={{textDecoration: 'none', color: 'inherit'}} >
            <Link color="inherit">
            Главная
            </Link>
          </A>
          <A href="/merchants" style={{textDecoration: 'none', color: 'inherit'}} >
        <Link color="inherit">
          Все партнёры
        </Link>
        </A>
        <A href={`/merchants/${merchName}`} style={{textDecoration: 'none', color: 'inherit'}} >
        <Link
          color="textPrimary"
          aria-current="page"
        >
          {merchName}
        </Link>
        </A>
      </Breadcrumbs>
    );
  }



const StyledTableRow = withStyles((theme) => ({
    // root: {
    //   '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    //   },
    // },
  }))(TableRow);


const StyledTableCell = withStyles((theme) => ({
    head: {
      color: 'rgba(0,0,0,.6)',
      fontSize: '18px',
      fontWeight: '800'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const Merchant = (props) => {

    const [data, setData] = useState([])
    const [merchName, setMerchName] = useState('')
    const [merchAddress, setMerchAddress] = useState('')
    const [logoURL, setLogoURL] = useState('')
    const [loading, setLoading] = useState(false)

    const funcfunc = () => {
      const rer = data.map((elem, ind) => {
          return (
              <StyledTableRow key={ind}>
                <StyledTableCell className={ind == (data.length - 1) ? `withoutBorder` : ''} style={{fontSize: '18px'}} align="center">{elem.Period} месяц</StyledTableCell>
                <StyledTableCell className={ind == (data.length - 1) ? `withoutBorder` : ''} style={{fontSize: '18px'}} align="center">{elem.Commission}%</StyledTableCell>
              </StyledTableRow>
          )
      })
      return rer
  }
    
    useEffect(() => {
      const getMerchantData = async () => {
        try {
          setLoading(true)

          const response = await fetch(`http://192.168.100.61:8081/getMerchComm?id=${props.merchantID}`)
          const responseJSON = await response.json()
          if(responseJSON.commInfo != null){
            setData(responseJSON.commInfo)
          }
            setMerchName(responseJSON.merchName)
            setMerchAddress(responseJSON.merchAddress)
            setLogoURL(responseJSON.logoLink)

          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      }
      getMerchantData()
    }, [])

    return(
        <div style={{backgroundColor: '#f5f5f5'}} >
            <div style={{position: 'absolute'}} >
            <BackToTop />
            </div>
            <ElevationScroll {...props}>
                <AppBar color="inherit" position="sticky" elevation={1} >
                    <Header />
                </AppBar>
            </ElevationScroll>
            <Container style={{paddingTop: '50px', paddingBottom: '100px'}} >
            
                <Grid container style={{marginBottom: '15px'}} >
                    <Grid item style={{fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        {/* <KeyboardReturnIcon style={{width: '40px', fontSize: '25px'}} />
                        <A href="/" style={{textDecoration: 'underline', color: '#FF5800'}} >Все партнёры</A> */}
                        {ActiveLastBreadcrumb(merchName)}
                    </Grid>
                </Grid>
                <Grid container justify="space-between" >
                    <Grid item container xs={12} md={3} style={{backgroundColor: 'white', border: '0px solid rgba(0,0,0,.4)', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 2px rgba(0,0,0,.12)'}} >
                        <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px'}} >
                            <img src={logoURL} width={250} />
                        </Grid>
                        <Grid item xs={12} style={{padding: '25px'}} >
                            <hr />
                            <p style={{fontSize: '18px'}} >
                              {merchAddress}  
                            </p>
                            {/* <p style={{fontSize: '18px'}} >
                            +992 48 888 40 00
                            </p> */}
                            <hr />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={8} alignItems="center" style={{backgroundColor: 'white', border: '0px solid rgba(0,0,0,.4)', borderRadius: '8px', padding: '15px', marginBottom: '20px', boxShadow: '0 1px 2px rgba(0,0,0,.12)'}} >
                        <h1 style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px'}} >
                            Условия рассрочки
                        </h1>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" >Срок</StyledTableCell>
                                    <StyledTableCell align="center">Комиссия</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {funcfunc(data.commInfo)}
                        </Table>
                    </Grid>
                </Grid>
            </Container>
            <div style={{backgroundColor: '#fff', paddingTop: '50px', paddingBottom: '100px'}} id="rerere" >
              <Container>
                <Grid container >
                  <Grid item xs={12} >
                    <h1 style={{textAlign: 'center'}} >Заказать карту ОРЗУ</h1>
                  </Grid>
                </Grid>
                    <OrderCard />
              </Container>
            </div>
            <Footer background="#f5f5f5" />
        </div>
    )
}

export default Merchant