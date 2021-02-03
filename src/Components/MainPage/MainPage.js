import React from 'react';
import classes from './MainPage.module.css'
import Header from '../Header/Header';
import Section_Card from '../Secion_Card(1)/Section_Card';
import Section_Partners from '../Section_Partners(2)/Section_Partners';
import Section_Choose from '../Section_Choose(3)/Section_Choose';
import Section_Repayment from './../Section_Repayment(4)/Section_Repayment';
import Section_Order from '../Section_Order(5)/Section_Order';
import { AppBar, Slide, useScrollTrigger } from '@material-ui/core';
import BackToTop from './../BackToTop/BackToTop';
import Footer from '../Footer/Footer';
import Section_Question from './../Section_Questions/Section_Questions';
import { useState } from 'react';



function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

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

const MainPage = (props) => {
  const [fio, setFio] = useState('Azamat')
    return(
        <>
        <div style={{position: 'absolute', zIndex: '1000'}} >
            <BackToTop />
        </div>
        <ElevationScroll {...props}>
            {/* <HideOnScroll {...props}> */}
                <AppBar color="inherit" position="sticky" elevation={1} >
                    <Header />
                </AppBar>
            {/* </HideOnScroll> */}
        </ElevationScroll>
            <Section_Card />
            <Section_Partners />
            <Section_Choose />
            <Section_Repayment />
            <Section_Order fio={fio} />
            <Section_Question />
            <Footer />
        </>
    )
}

export default MainPage