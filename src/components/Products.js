import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getProducts, searchProducts } from '../service/Product';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import { getProductById, deleteProduct } from '../service/Product';
import { useLocation } from 'react-router-dom'
import { isAdmin } from '../service/Auth';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [proData, setProData] = useState([]);
    const [pageData, setPageData] = useState([])
    const location = useLocation()
    const [page, setPage] = React.useState(1);
    let data = proData
    console.log(data)
    const handleChange = (event, page) => {
        setPage(page);
        setPageData(data.slice(page * 4 - 4, page * 4))
    };
    
    useEffect(()=>{
        setPage(page);
        setPageData(data.slice(page * 4 - 4, page * 4))
    },[data])

    useEffect(() => {
        searchProducts(location.search)
            .then(res => {
                if (res.data.err == 0) {
                    setProData(res.data.prodata)
                  
                    setPageData(res.data.prodata)
                }
            })

    }, [location.search])


    useEffect(() => {
        getProducts()
            .then(res => {
                if (res.data.err === 0) {
                    setProData(res.data.prodata)
                    data = proData
                    setPageData(data.slice(page * 4 - 4, page * 4))

                }
            })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            dispatch(countProducts(array.length))
        }
        else {
            dispatch(countProducts(0))
        }
    }, [])

    const delPro = (id) => {
        deleteProduct(id)
            .then(res => {
                if (res.data) {
                    alert("product deleted")
                    let data1 = data.filter(pro => pro._id !== id)
                    setProData(data1)
                    setPageData(data.slice(page * 4 - 4, page * 4))
                }
            })
            .catch(err => console.log(err))
    }

    const addcart = (id) => {
        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));

            array.push(id)
            localStorage.setItem("myproid", JSON.stringify(array));
            dispatch(countProducts(array.length))
        }
        else {
            let array = [];
            array.push(id);
            localStorage.setItem('myproid', JSON.stringify(array));
            dispatch(countProducts(array.length))
        }

        getProductById(id)
            .then(res => {
                if (res) {
                    if (localStorage.getItem('mycart') != undefined) {
                        let ar = JSON.parse(localStorage.getItem('mycart'));
                        if (ar.some(product =>
                            product._id === id
                        )) {
                            // alert("checked in")
                        } else {
                            ar.push(res.data);
                            localStorage.setItem("mycart", JSON.stringify(ar));
                        }

                    }
                    else {
                        let ar = [];
                        ar.push(res.data)
                        localStorage.setItem('mycart', JSON.stringify(ar));
                    }
                }
            })
    }

    return (
        <Container>
            <h2>Products</h2>
            <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
                <Grid container spacing={3}>
                    {pageData.map(pro =>
                        <Grid item xs={3} key={pro._id} >
                            <Card sx={{ maxWidth: 345 }} >
                                <CardMedia
                                    component="img"
                                    alt={pro.name}
                                    image={pro.imageURL}
                                    height="250"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>
                                        {pro.name}
                                    </Typography>
                                    <Typography variant="h6" color='text.secondary' sx={{ textAlign: "center" }}>
                                        ₹{pro.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="contained" size="small" onClick={() => navigate(`/product-details/${pro._id}`)}>Info</Button>
                                    <Button variant="contained" size="small" onClick={() => addcart(pro._id)}>Add To Cart</Button>
                                    {isAdmin() ? <Button variant="contained" size="small" onClick={() => delPro(pro._id)}>Delete</Button> : ""}
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Stack spacing={2}>

                    <Pagination count={data.length%4==0?parseInt(data.length/4):parseInt(data.length/4)+1} page={page} onChange={handleChange} />
                </Stack>
            </Grid>

        </Container >
    )
}

export default Products