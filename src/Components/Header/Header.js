import { Container, Grid, Hidden } from '@material-ui/core';
import React, { useState } from 'react';
import classes from './Header.module.css';
import HumoHeaderLogo from '../../Images/Humo-header-logo.svg';
import { A } from 'hookrouter';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './Modals/Drawer';

const Header = () => {

    const [opened, setOpened] = useState(false)

    const handleHamburgerOpen = () => {
        opened ? setOpened(false) : setOpened(true)
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setOpened(open)
      };

    return(
        <div>
            <Container>
                <Grid className={`${classes.HeaderBox}`} container alignItems="center" justify="space-between" >
                    <Grid item xs={5} sm={2} md={2} container >
                        <img src={HumoHeaderLogo} alt="Humo Logo" width="114px" />
                    </Grid>
                    <Hidden mdUp>
                        <Grid item xs={1} >
                            <div style={{textAlign: 'end'}} >
                                <div className={`${classes.Hamburger}`} onClick={handleHamburgerOpen} >
                                    <MenuIcon />
                                </div>
                            </div>
                        </Grid>
                    </Hidden>
                    <Hidden smDown >
                        <Grid container xs={10} justify="space-between" >
                            <Grid container md={8} item spacing={3} >
                                <Grid item >
                                    <A href="#" className={`${classes.Ahref}`} >
                                        Акции
                                    </A>
                                </Grid>
                                <Grid item >
                                    <A href="#" className={`${classes.Ahref}`} >
                                        Новости
                                    </A>
                                </Grid>
                                <Grid item >
                                    <A href="#" className={`${classes.Ahref}`} >
                                        Что-то ещё
                                    </A>
                                </Grid>
                            </Grid>
                            <Grid>
                                <a href="https://humo.tj" target="_blank" rel="noopener noreferrer" className={`${classes.Ahref1}`} >
                                    Личный кабинет
                                </a>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
            <Hidden mdUp >
                {/* <Container style={{paddingBottom: '15px', transition: '500ms'}} > */}
                    {/* <Grid container >
                        <Grid item xs={12} style={{fontSize: '20px'}} >Акции</Grid>
                        <Grid item xs={12} style={{fontSize: '20px'}} >Новости</Grid>
                        <Grid item xs={12} style={{fontSize: '20px'}} >Что-то ещё</Grid>
                    </Grid> */}
                {/* </Container> */}
                    <TemporaryDrawer state={opened} toggleDrawer={toggleDrawer} />
            </Hidden>
        </div>
    )
}

export default Header