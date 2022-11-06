import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    store.history = useHistory();
    
    let modalJSX = "";
    if (auth.user === null) {
        store.history.push("/");
    }
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    let songList = "";
    if (store.currentList) {
        songList = <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
                
            }
         </List>; 
         if (auth.user)  {
            if (auth.user.email !== store.currentList.ownerEmail) {
                auth.logoutUser();
            }   
         }          
    }
    return (
        <Box style={{maxHeight: '83%', overflow: 'auto'}}>
         { songList }
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;