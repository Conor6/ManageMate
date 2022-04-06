import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ImageList, ImageListItem } from '@mui/material';
import { List, ListItemButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import '../CSS/Sidebar.css';
import {Link} from 'react-router-dom';



function SearchAppBar() {

  const ListButton = styled(ListItemButton)({
    color: 'black',
    paddingRight: 10,
    borderRadius: '20px',
    marginLeft: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
      backgroundColor: "white",
      color: 'black',
   },
  
    
  });
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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


  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ height: '100%', width: 250, backgroundColor: '#2196f3', color: 'white', }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>

        <Link to="/" className='ListButton'>
          <ListButton className='ListButton'>
            <ListItemIcon className='icon'>
              <HomeIcon className='icon'></HomeIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary="Home" className='side-text'/>
          </ListButton>
        </Link>

          <ListButton className='ListButton'>
            <ListItemIcon className='icon'>
            <PersonIcon className='icon'></PersonIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary="Profile" className='side-text'/>
          </ListButton>


        <Link to='/schedule' className='ListButton'>
          <ListButton className='ListButton'>
            <ListItemIcon className='icon'>
              <EventNoteIcon className='icon'></EventNoteIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary="Schedule" className='side-text'/>
          </ListButton>
        </Link>


        <Link to='/mybookings' className='ListButton'>
          <ListButton className='ListButton'>
            <ListItemIcon className='icon'>
              <EventIcon className='icon'></EventIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary="My Bookings" className='side-text'/>
          </ListButton>
        </Link>

        
        <Link to="/teamlist" className='ListButton'>
          <ListButton className='ListButton'> 
            <ListItemIcon className='icon'>
              <GroupsIcon className='icon'></GroupsIcon>
            </ListItemIcon>
            <ListItemText disableTypography primary="My Teams" className='side-text'/>
          </ListButton>
        </Link>

        <Link to="/gymlist" className='ListButton'>
          <ListButton className='ListButton'>
            <ListItemIcon className='icon'>
              <ListAltIcon className='icon'/>
            </ListItemIcon>
            <ListItemText disableTypography primary="Gym List" className='side-text'/>
          </ListButton>
        </Link>

      </List>

    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'red' }}>
      <AppBar position="static" >
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
        <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            ManageMate
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;