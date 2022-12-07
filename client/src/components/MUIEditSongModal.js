import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    let newTitle = '';
    let newArtist = '';
    let newYouTubeId = '';

    if (store.currentList != null && store.currentSong != null) {
        newTitle = store.currentSong.title;
        newArtist = store.currentSong.artist;
        newYouTubeId = store.currentSong.youTubeId
    }

    function handleConfirmEditSong() {
        let newSongData = {
            title: newTitle,
            artist: newArtist,
            youTubeId: newYouTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        newTitle = event.target.value;
    }

    function handleUpdateArtist(event) {
        newArtist = event.target.value;
    }


    function handleUpdateYouTubeId(event) {
        newYouTubeId = event.target.value;
    }

    return (
        <Modal
            open={store.currentModal == "EDIT_SONG"}
        >
        <Box sx={style}>
            <div id="edit-song-modal" data-animation="slideInOutLeft">
            <Typography sx={{fontWeight: 'bold'}} id="modal-modal-title" variant="h4" component="h2">
                Edit Song
            </Typography>
            <Divider sx={{borderBottomWidth: 5, p: '5px', transform: 'translate(-5.5%, 0%)', width:377}}/>
            <Typography sx={{mt: "10px", color: "#702963", fontWeight:"bold", fontSize:"30px"}} id="modal-modal-title" variant="h6" component="h2">
                Title: <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" defaultValue={newTitle} onChange={handleUpdateTitle} />
            </Typography>
            <Typography sx={{color: "#702963", fontWeight:"bold", fontSize:"30px"}} id="modal-modal-artist" variant="h6" component="h2">
            Artist: <input id="edit-artist-modal-title-textfield" className='modal-textfield' type="text" defaultValue={newArtist} onChange={handleUpdateArtist} />
            </Typography>
            <Typography sx={{color: "#702963", fontWeight:"bold", fontSize:"25px"}} id="modal-modal-youTubeId" variant="h6" component="h2">
                YouTubeId: <input id="edit-artist-modal-youTubeId-textfield" className='modal-textfield' type="text" defaultValue={newYouTubeId} onChange={handleUpdateYouTubeId} />
            </Typography>
            <Button sx={{color: "#8932CC", backgroundColor: "#CBC3E3", fontSize: 13, fontWeight: 'bold', border: 2, p:"5px", mt:"20px"}} variant="outlined" id="edit-song-confirm-button" onClick={handleConfirmEditSong}>Confirm</Button>
            <Button sx={{opacity: 0.80, color: "#8932CC", backgroundColor: "#CBC3E3", fontSize: 13, fontWeight: 'bold', border: 2, p:"5px", mt:"20px", ml:"197px"}} variant="outlined" id="edit-song-confirm-button" onClick={handleCancelEditSong}>Cancel</Button>
            </div>
        </Box>
        </Modal>
    );
    
}