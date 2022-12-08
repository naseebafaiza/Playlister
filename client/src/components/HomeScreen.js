import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import AuthContext from '../auth';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import Typography from '@mui/material/Typography';
import PageBanner from './PageBanner'
import Player from './Player'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: '#353535', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        expanded = {false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(1150%, 10%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
            </List>;
    }
    let heading = (<div id="list-selector-heading"></div>);
    console.log(auth)
    if (auth) {
      if (auth.view === "HOME") {
        heading = (
          <div  id="list-selector-heading">
            <Fab
              color="primary"
              aria-label="add"
              id="add-list-button"
              onClick={handleCreateNewList}
            >
              <AddIcon />
            </Fab>
            <Typography variant="h2">Your Lists</Typography>
          </div>
        );
      }
      else if (auth.view === "ALL_LISTS") {
        heading = (
          <div id="list-selector-heading">
            <Typography variant="h2">All Lists</Typography>
          </div>
        );
      }
      else if (auth.view === "USERS") {
        heading = (
            <div id="list-selector-heading">
              <Typography variant="h2">Users</Typography>
            </div>
          );
      }
    }
    
    return (
        <div>
            <PageBanner />
            <div id="playlist-selector">
            {heading}
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
                <Player />
            </div>
        </div>)
}

export default HomeScreen;