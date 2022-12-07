import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import Typography from '@mui/material/Typography';
import PageBanner from './PageBanner'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

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
    
    return (
        <div>
            <PageBanner />
            <div id="playlist-selector">
                <div id="list-selector-heading">
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
                <div id="list-selector-list">
                    {
                        listCard
                    }
                    <MUIDeleteModal />
                </div>
                <div id = 'player'></div>
            </div>
        </div>)
}

export default HomeScreen;