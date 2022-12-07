import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import SongCard from './SongCard.js';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import List from '@mui/material/List';
import expand from './expand.png';
import thumbsUp from './thumbsUp.png';
import thumbsDown from './thumbsDown.png';
import workspace from './WorkspaceScreen';
import WorkspaceScreen from './WorkspaceScreen';
import EditToolbar from './EditToolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../auth'



/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, expanded } = props;
    const { auth } = useContext(AuthContext);
    const theme = createTheme({
        palette: {
          coral: {
            main: '#f7a8a5',
            contrastText: '#f5f5f5',
          },
        },
    });
    let showList = false;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        if (auth.visitor === "REGISTERED" && auth.view === "HOME") 
        {toggleEdit();}
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let publishDate = '';
    if (idNamePair.published) {
        publishDate = idNamePair.publishDate.toString().substring(0, 10);
    }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    function handleOpenList(e) {
        let button = document.getElementById('expandButton-'+idNamePair._id);

        if (!store.currentList) {
            handleLoadList(e, idNamePair._id);
            button.style.transform = 'rotate(180deg)';
        }
        else {
            store.closeCurrentList();
        }

    }

    function handleSetPlayerList(event, id) {
        console.log("setting playerlist")
        event.stopPropagation();
        store.setPlayerList(id);
    }
 
    function handleDuplicateList(event) {
        event.stopPropagation();
        store.duplicateList();
    }
    let songList = "";
    if (store.currentList) {
        if (store.currentList._id == idNamePair._id) {
            songList = (
                <div>
                  <ThemeProvider theme={theme}>
                  <List
                    id="playlist-cards"
                    sx={{ width: "100%", bgcolor: "#404040" }}
                  >
                    {store.currentList.songs.map((song, index) => (
                      <SongCard
                        id={"playlist-song-" + index}
                        key={"playlist-song-" + index}
                        index={index}
                        song={song}
                      />
                    ))}
                  </List>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <EditToolbar />
                    <div
                      style={{
                        padding: "10px 15px 0px 10px",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "28%",
                      }}
                    >
                      <Button
                      disabled= {auth.visitor === "GUEST"} 
                      variant="contained" 
                      color="coral"
                      onClick={(event) => {
                        handleDuplicateList(event)
                        }}>
                        Duplicate
                      </Button>
                      <Button variant="contained" color="coral" 
                        onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </ThemeProvider>
                </div>
              );
        }
    }

    let cardStyle = {
        width: "100%",
        fontSize: "24pt",
        color: "whitesmoke",
        backgroundColor: "#202020",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        cursor: "default",
      };
      if (store.playerList) {
          if (idNamePair._id == store.playerList._id) {
              cardStyle = {
                  width: "100%",
                  fontSize: "24pt",
                  color: "whitesmoke",
                  backgroundColor: "#a51e93",
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "default",
                };
          }
      }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={cardStyle}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
            onDoubleClick= {handleToggleEdit}
        >
            <div style={{display: 'flex', width: '100%'}}
                onClick={(event) => {
                    handleSetPlayerList(event, idNamePair._id) 
                }}>  
                <Box sx={{ p: 1, flexGrow: 1, overflowX: 'auto' }}>{idNamePair.name}<br></br>
                    <div style={{fontSize: '12pt', paddingLeft: '10px'}}>by: {idNamePair.userName}</div>
                </Box>
                <div style={{paddingRight: 5}}><img src={thumbsUp} style={{width: '48px'}} /> {idNamePair.likes} <img src={thumbsDown} style={{width: '48px'}} /> {idNamePair.dislikes}</div>
            </div>

            <div  
            style={{width: '100%', padding: 10}}>
                {songList}
            </div> 
            <div style={{display: 'flex', width: '100%', fontSize: '16px', justifyContent: 'space-between', padding: 10}}>
            <div style={{ padding: "0px 20px 0px 20px" }}>
            Published: {publishDate}
          </div>
                <div style={{padding: '0px 20px 0px 20px'}}>Listens: {idNamePair.listens}</div>
                <div><img id={'expandButton-' + idNamePair._id} onClick={handleOpenList} src={expand} style={{width: '24px', padding: '0px 20px 0px 20px', cursor: 'pointer'}}></img></div>
            </div>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        <Box>
            {cardElement}
            {modalJSX}
        </Box>

    );
}

export default ListCard;