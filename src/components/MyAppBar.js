import React,{useState,useEffect} from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { doLogout, isAdmin, isLoggedIn } from '../service/Auth';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';


export const MyAppBar = () => {
    const productCount = useSelector((state) => state.addItem.proInCart)
    const [filter,setFilter]=useState("")
    const navigate = useNavigate();
    
    useEffect(()=>{
        let searchParams=new URLSearchParams();
       if(filter){
        searchParams.set("name",filter)
       }
       navigate({
        pathname:"/products",
        search:searchParams.toString()
       })
    },[filter])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Neostore App
                    </Typography>
                    {isLoggedIn()&& 
                    <div>
                        <SearchIcon/>
                        <InputBase
                        placeholder='Search'
                        value={filter}
                        onChange={(event)=>setFilter(event.target.value)}
                        />
                    </div>
                    }
                    {!isLoggedIn() && (
                        <>
                            <Button color="inherit" onClick={() => navigate("/")}>Login</Button>
                            <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
                        </>
                    )}

                    {isLoggedIn() && (
                        <>
                            <Badge badgeContent={productCount} color="secondary" sx={{cursor: "pointer"}} onClick={() => {navigate("/cartsection")}}>
                                <ShoppingCartIcon />
                            </Badge>

                            <Button color="inherit" onClick={() => navigate("/products")}>Home</Button>
                        </>
                    )}

                    {isLoggedIn() && isAdmin() && (
                        <>
                            <Button color="inherit" onClick={() => navigate("/additems")}>Add Product</Button>
                        </>
                    )}

                    {isLoggedIn() && (
                        <>
                            <Button color="inherit" onClick={doLogout}>Logout</Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    )
}
