const countProducts = (procount) => {
    return{
        type: "addingItems",
        payload: procount
    }
}


export {countProducts};