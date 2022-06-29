import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { saveProducts } from '../service/Product';
import { isAdmin, isLoggedIn } from '../service/Auth';
import { getToken } from '../service/Auth';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function AddProducts() {
    const navigate= useNavigate();
    const [state,setState] = useState({name:"",category:'',price:'',description:'',manufacturer:'',availableItems:'',imageURL:''})
    
    const handler = (event) => {
        let {name,value} = event.target;
        setState({...state,[name]:value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        isLoggedIn();
        isAdmin();
        const token = getToken();
        saveProducts(state)
        .then(res=>{
            if(res.data.err === 0){
                alert("Product added");
                navigate('/')
            }
            else{
                alert(res.data.msg)
            }
        })
        .catch(err => {
            console.log(err);
        })
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add Product
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="category"
                            label="Category"
                            name="category"
                            autoComplete="category"
                            autoFocus
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="price"
                            name="price"
                            autoComplete="price"
                            type="number"
                            autoFocus
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Product Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="manufacturer"
                            label="Product manufacturer"
                            name="manufacturer"
                            autoComplete="manufacturer"
                            autoFocus
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="availableItems"
                            label="Items Available"
                            name="availableItems"
                            autoComplete="availableItems "
                            autoFocus
                            type="number"
                            onChange={handler}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="imageURL"
                            label="Image URL"
                            name="imageURL"
                            autoComplete="imageURL "
                            autoFocus
                            onChange={handler}
                        />
                        

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AddProducts