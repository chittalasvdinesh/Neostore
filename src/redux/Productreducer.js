const initialState = {
    proInCart: 0
}

export const addToCart = (state = initialState, { type, payload }) => {
    switch (type) {
        case "addingItems":
            return { ...state, proInCart: payload };
        default:
            return state;
    }
} 
