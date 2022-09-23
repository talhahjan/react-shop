import { CartActionTypes } from "./action-types";

export const AddItem=(item)=>{
    return {
        type:CartActionTypes.ADD_TO_CART,
        payload: item
    }
}


export const RemoveItem=(id)=>{
    return {
        type:CartActionTypes.REMOVE_FROM_CART,
        payload:id
    }

}


export const AddQty=(id)=>{
    return {
        type: CartActionTypes.ADD_QTY,
        payload: id
    }
}


export const SubQty=(id)=>{
return {
    action: CartActionTypes.SUB_QTY,
    payload: id
}
}



export const emptyCart=()=>{
    return {
        type:CartActionTypes.EMPTY_CART,
    }
}