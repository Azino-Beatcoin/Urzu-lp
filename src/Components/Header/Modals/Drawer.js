import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../../Images/Humo-header-logo.svg'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({toggleDrawer, state}) {
  const classes = useStyles();

  const list = () => (
    <div
      className={`${classes.list}`}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <Divider style={{backgroundColor: 'rgba(0,0,0,.05)'}} />
        {['Акции', 'Новости', 'Что-то ещё'].map((text, index) => (
            <>
          <ListItem button key={text}>
            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
            <Divider style={{backgroundColor: 'rgba(0,0,0,.05)'}} />
          </>
        ))}
      </List>
    </div>
  );

  return (
    <div>
          <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '15px', paddingTop: '25px'}} >
                  <img src={logo} alt="" />
              </div>
            {list()}
          </Drawer>
    </div>
  );
}
