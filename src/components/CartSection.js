import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const CartSection = () => {
    const [data, setData] = useState([]);
    const [uniqueIds, setUniqueIds] = useState([])

    const [cprice,setCprice] = useState(0);

    useEffect(()=>{
        if (localStorage.getItem('myproid') != undefined) {
            let indItems = JSON.parse(localStorage.getItem('mycart'));
            let proitems = JSON.parse(localStorage.getItem('myproid'));
            let v = 0;
            proitems.forEach(el => {
                indItems.forEach(i => {
                    if(i._id === el){
                        v = v+i.price;
                    }
                })
            })
            setCprice(v)
        }
    })      //For continuous update of the cost price 


    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('mycart') != undefined) {
            let proitems = JSON.parse(localStorage.getItem('mycart'));
            setData(proitems)
        }

        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            dispatch(countProducts(array.length))
        }
    }, [])

    const setcount = () => {
        if (localStorage.getItem('myproid') != undefined) {
            let ids = JSON.parse(localStorage.getItem('myproid'));
            const countUnique = ids => {
                const counts = {};
                for (var i = 0; i < ids.length; i++) {
                    counts[ids[i]] = 1 + (counts[ids[i]] || 0);
                };
                return counts;
            };
            setUniqueIds(countUnique(ids))
        }
    }

    useEffect(() => {
        setcount();
    },[data])

    const AddMore = (id) => {
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
            dispatch(countProducts(array.length));
        }
        setcount();
    }

    const Remove = (id) => {
        console.log(uniqueIds[`${id}`]-1)
        if(uniqueIds[`${id}`]-1>0){
          if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            for (var i = 0; i < array.length; i++) {
                if (array[i] === id) {
                    var spliced = array.splice(i, 1);
                    localStorage.setItem("myproid", JSON.stringify(array));
                    dispatch(countProducts(array.length));
                    break
                }
            }
            setcount();
        }
  
        }
        else{
          setcount()
        }
    }

    const delProduct =(id)=>{
        let array = JSON.parse(localStorage.getItem('mycart'));
        if(array.some(element => 
            element._id === id
            )){
                let i = 0;
                let num;
                array.forEach(element => {
                    if(element._id === id){
                        num = i
                    }
                    i = i+1;
                });
                let localArray = JSON.parse(localStorage.getItem("mycart"));
                let newArr = localArray.splice(num,1);
                let strarr = JSON.stringify(localArray);
                localStorage.setItem("mycart", strarr);

                let localArray1 = JSON.parse(localStorage.getItem('myproid'));
                let newArray = [...localArray1];
                newArray.forEach(element => {
                    if(element === id){
                        const index = localArray1.indexOf(id);
                        localArray1.splice(index,1)
                    }
                });

                let strarr1 = JSON.stringify(localArray1);
                localStorage.setItem("myproid",strarr1);
                dispatch(countProducts(localArray1.length));

                let dataItems = JSON.parse(localStorage.getItem('mycart'));
                setData(dataItems)
            }
    }

    return (
        <div className='container'>
            <table className='table table-striped mt-3'>
                <thead>
                    <tr>
                        <th className='text-center'>Product</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>subtotal</th>
                        <th className='text-center'></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element) =>
                        <tr key={element._id} className='text-center'>
                            <td>
                                {element.name}
                            </td>
                            <td>
                                {element.price}
                            </td>
                            
                            <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-secondary"  onClick={() => AddMore(element._id)}>+</button>
                                    <button type="button" className="btn btn-light" style={{width: "70px"}}>{uniqueIds[`${element._id}`]}</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => Remove(element._id)}>-</button>
                                </div>
                            </td>
                            <td>
                            ₹ {uniqueIds[`${element._id}`] * element.price}
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => delProduct(element._id)}><DeleteOutlinedIcon/></button>
                            </td>
                        </tr>
                    )}
                    <tr className='text-center'>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total: ₹ {cprice}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
