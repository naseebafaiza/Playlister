import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import Home from '@mui/icons-material/Home';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



export default function PageBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePublishDateSort = () => {
      store.publishDateSort();
      handleMenuClose();
    }
    const handleNameSort = () => {
      store.nameSort();
      handleMenuClose();
    }
    const handleListensSort = () => {
      store.listensSort();
      handleMenuClose();
    }
    const handleLikesSort = () => {
      store.likesSort();
      handleMenuClose();
    }
    const handleDislikesSort = () => {
      store.dislikesSort();
      handleMenuClose();
    }

    const menuId = 'sort-list-menu';
    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handlePublishDateSort}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleListensSort}>Listens (High to Low)</MenuItem>
            <MenuItem onClick={handleLikesSort}>Likes (High to Low)</MenuItem>
            <MenuItem onClick={handleDislikesSort}>Disikes (High to Low)</MenuItem>
        </Menu>
    );

    return (
      <Box style={{}} sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          id="PageBanner"
          style={{ backgroundColor: "transparent" }}
        >
          <Toolbar>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "8%",
                paddingTop: 10
              }}
            >
              <HomeIcon />
              <GroupsIcon />
              <PersonIcon />
            </div>
            <div style={{width: '40%'}}>
            <form>
              <TextField
                InputProps={{ sx: { width: 550, color: "whitesmoke" } }}
                id="search-bar"
                className="text"
                label="Search"
                variant="outlined"
                placeholder=""
                size="small"
              />
              <IconButton aria-label="search" onClick={store.handleSearch}>
                <SearchIcon style={{ fill: "whitesmoke" }} />
              </IconButton>
            </form>
            </div>

            <div>
                Sort by
            <IconButton
                size="large"
                edge="end"
                aria-label="form of sorting"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleSortMenuOpen}
                color="inherit"
              >
                <SortIcon />
              </IconButton>
            </div>
            </div>

          </Toolbar>
        </AppBar>
        {sortMenu}
      </Box>
    );
}