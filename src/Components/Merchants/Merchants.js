import React, {useEffect, useState} from 'react';
// import classes from './Merchants.module.css'
import { Container, Grid, AppBar, useScrollTrigger, Breadcrumbs, Link, TextField, InputBase, Select, MenuItem } from '@material-ui/core';
import BackToTop from './../BackToTop/BackToTop';
import Header from '../Header/Header';
import { A } from 'hookrouter';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import MerchantCard from './../Section_Partners(2)/Modals/MerchantCard/MerchantCard';
import { Pagination } from '@material-ui/lab';
import Footer from './../Footer/Footer';




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


  const ActiveLastBreadcrumb = () => {
    return (
      <Breadcrumbs aria-label="breadcrumb">
          <A href="/" style={{textDecoration: 'none', color: 'inherit'}} >
            <Link color="inherit">
            Главная
            </Link>
          </A>
        <A href={`/merchants`} style={{textDecoration: 'none', color: 'inherit'}} >
        <Link
          color="textPrimary"
          aria-current="page"
        >
          Все партнёры
        </Link>
        </A>
      </Breadcrumbs>
    );
  }



  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: '5px',
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Merchants = (props) => {

    const [searchValue, setSearchValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [paginationCount, setPaginationCount] = useState(12)
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)

    const classes = useStyles();

    useEffect(() => {
        const getMerchantsList = async () => {
            try {
                setLoading(true)
    
                const response = await (await fetch('http://192.168.100.61:8081/getMerchlist')).json()
                
                if(response.info.length > 0){
                    setData(response.info)
                    setSearchData(response.info)
                    setLoaded(true)
                }
    
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        getMerchantsList()
    }, [])

    const juxtaposeArray = {
      en: {
        'а' : ['a'],
        'б' : ['b'],
        'в' : ['v', 'w'],
        'г' : ['g'],
        'д' : ['d'],
        'е' : ['e'],
        'ё' : ['e'],
        'ж' : ['j'],
        'з' : ['z'],
        'и' : ['i', 'y'],
        'й' : ['i', 'y'],
        'к' : ['k'],
        'л' : ['l'],
        'м' : ['m'],
        'н' : ['n'],
        'о' : ['o'],
        'п' : ['p'],
        'р' : ['r'],
        'с' : ['s', 'c'],
        'т' : ['t'],
        'у' : ['u', 'oo'],
        'ф' : ['f'],
        'х' : ['h', 'kh'],
        'ц' : ['c'],
        'ч' : ['ch'],
        'ш' : ['sh'],
        'щ' : ['sh'],
        'ъ' : false,
        'ы' : false,
        'ю' : false,
        'ь' : false,
        'э' : false,
        'ю' : false,
        'я' : ['ya']
      },
      ru: {
        'a' : ['а'],
        'b' : ['б'],
        'c' : ['с', 'ц'],
        'd' : ['д'],
        'e' : ['е', 'ё'],
        'f' : ['ф'],
        'g' : ['г'],
        'h' : ['х'],
        'i' : ['и', 'й'],
        'j' : ['ж', 'дж'],
        'k' : ['к'],
        'l' : ['л'],
        'm' : ['м'],
        'n' : ['н'],
        'o' : ['о'],
        'p' : ['п'],
        'q' : false,
        'r' : ['р'],
        's' : ['с'],
        't' : ['т'],
        'u' : ['у'],
        'v' : ['в'],
        'w' : ['в'],
        'x' : false,
        'y' : ['и', 'й'],
        'z' : ['з'],
      },
    };
  
    const juxtapose = (str) => {};
  
    const getJuxtapositionArray = (container, item) => {
      const arr = []

      if( container[0].charCodeAt() < 200 ) {
        
      } else if( container[0].charCodeAt() > 1040 && container[0].charCodeAt() < 1110 ) {
        
      }
      
    }
  
    getJuxtapositionArray('123', '123')


    const handleChangeSearch = (str) => {
      setSearchValue(str)
      const arr = []
      for(let elem of data){
        if(elem.Merchname.toLowerCase().includes(str.toLowerCase().trim())){
          arr.push(elem)
        }
      }
      setSearchData(arr)
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh'}} >
            <div style={{position: 'absolute'}} >
                <BackToTop />
            </div>
            <ElevationScroll {...props}>
                <AppBar color="inherit" position="sticky" elevation={1} >
                    <Header />
                </AppBar>
            </ElevationScroll>
            <Container style={{paddingTop: '50px', minHeight: '500px'}} >
                <Grid container >
                    <Grid item >
                        {ActiveLastBreadcrumb()}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid xs={12} md={7} item >
                        <h1 style={{textAlign: 'right'}} >
                            Наши партнёры
                        </h1>
                    </Grid>
                    <Grid item xs={12} md={5} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                                <InputBase
                                placeholder="Поиск"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => handleChangeSearch(e.target.value)}
                                value={searchValue}
                                />
                        </div>
                    </Grid>
                </Grid>
                {/* {console.log(data)} */}
                <Grid container style={{/*border: '1px solid rgba(0,0,0,.15)',*/ paddingTop: '20px'}} >
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap'}} >
                        {searchData.map((el, id) => {
                            // console.log(id);
                            if (id >= (page - 1)*paginationCount && id < page*paginationCount) {
                              return (
                                  <div style={{padding: '15px'}} key={el['Logolink']} >
                                      <MerchantCard src={el['Logolink']} description={el['Merchid']} name={el['Merchname']} />
                                  </div>
                              )
                            }
                        })}
                    </div>
                </Grid>
                {searchData.length > 0 && (<Grid container style={{paddingTop: '20px', paddingBottom: '50px'}} >
                  <Grid item xs={12} >
                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} >
                      <Select value={paginationCount} onChange={(e) => setPaginationCount(e.target.value)} >
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                        <MenuItem value={36}>36</MenuItem>
                        <MenuItem value={60}>60</MenuItem>
                      </Select>
                      <Pagination color='primary' count={ Math.ceil(searchData.length / paginationCount) } page={page} onChange={(_, val) => setPage(val)} />
                    </div>
                  </Grid>
                </Grid>)}
            </Container>
            <div style={{marginTop: 'auto'}} >
              <Footer />
            </div>
        </div>
    )
}

export default Merchants