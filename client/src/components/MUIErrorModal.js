import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Alert } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

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

export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);
    let message = auth.errorMessage;
    function handleCloseModal(event) {
        auth.hideModal();
    }

    return (
        <Modal
            open={auth.errorMessage !== ""}
        >
            <Stack sx={{ width: '40%', marginLeft: '30%', marginTop: '20%' }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {message}
                    <Button color="primary" size="small" onClick={handleCloseModal}>
                            Close
                    </Button>
                </Alert>
            </Stack>
        </Modal>
    );
}