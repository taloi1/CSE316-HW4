import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentSong !== null}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="modal is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-dialog">
                <div
                    id="edit-song-modal-header"
                    className="modal-header">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="modal-control">
                        <form>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-title">Title:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-title-textfield" 
                                    className='modal-textfield' 
                                    type="text" 
                                    defaultValue={title} 
                                    onChange={handleUpdateTitle} /><br/>
                                </div>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-artist">Artist:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-artist-textfield" 
                                    className='modal-textfield' 
                                    type="text" 
                                    defaultValue={artist} 
                                    onChange={handleUpdateArtist} /><br/>
                                </div>
                                <div className="col-left">
                                    <label htmlFor="edit-song-modal-youtube-id">Youtube Id:</label>
                                </div> 
                                <div className="col-right">
                                <input 
                                    id="edit-song-modal-youTubeId-textfield" 
                                    className='modal-textfield' 
                                    type="text" 
                                    defaultValue={youTubeId} 
                                    onChange={handleUpdateYouTubeId} /><br/>
                                </div>
                            </form>
                </div>
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}