import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { getProductById } from '../service/Product';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';



export const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        getProductById(id)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.log(err))
    }, [id])
    
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
        <>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "40px 40px" }}>
                <div>
                    <ul style={{ listStyleType: "none", fontSize: "24px",fontWeight:"bolder", maxWidth:"600px"}}>
                        <li >
                            Product Name: <span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.name}</span>
                        </li>
                        <li>
                            Price:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>₹{product.price}</span> 
                        </li>
                        <li>
                            Category:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.category}</span> 
                        </li>
                        <li>
                            Description:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.description}</span> 
                        </li>
                        <li>
                            Manufacturer:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.manufacturer}</span> 
                        </li>
                        <li>
                            Available Items:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.availableItems}</span> 
                        </li>
                        <li>
                            <button className='btn btn-primary' onClick={() => addcart(product._id)}>Add to cart</button>
                            <button className='btn btn-warning m-2' onClick={() => navigate("/")}>Back</button>
                        </li>
                    </ul>



                </div>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: "500px" }} >
                        <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.imageURL}
                            height="250"
                        />
                    </Card>
                </Grid>

            </div>
        </>

    )
}
