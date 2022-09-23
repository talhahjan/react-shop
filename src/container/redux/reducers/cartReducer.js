import { CartActionTypes } from "../actions/action-types";

const initialState={
    total:0,
    totalPairs:0, // 
    totalItems:0,
    items:[]
}


 const CartReducer=(state=initialState, action)=>{
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            let prod=action.payload;
            let inCart=state.items.find((item)=>item.id===prod.id)
if(inCart)
return {...state, 
    total:state.total+prod.price, 
    totalPairs:state.totalPairs+1,
    items:state.items.map((x)=>x.id===prod.id ? {...prod, quantity:x.quantity+1}: x)}
else
return {...state,
            items:[...state.items, prod], 
            total:state.total+prod.price, 
            totalPairs:state.totalPairs+1,
          totalItems:state.totalItems+1
        } 
    case CartActionTypes.REMOVE_FROM_CART:
        let remove=state.items.find((item)=>item.id===action.payload)
    return{
            ...state,
            total:state.total-parseInt(remove.price)*remove.quantity,
            totalPairs:state.totalPairs-parseInt(remove.quantity),
            totalItems:state.totalItems-1,
items:state.items.filter((x)=>x.id!==remove.id)
       }

case CartActionTypes.SUB_QTY:
    const item = state.items.find(item => item.id === action.payload);
    if (item?.quantity === 1) {
        // new quantity is 0, remove item from cart
        return {
          ...state,
          total:state.total-item.price,
          totalPairs:state.totalPairs-1,
          totalItems:state.totalItems-1,
          items: state.items.filter(item => item.id !== action.payload),
        };
      }

      // decrement quantity
      return {
        ...state,
        total:state.total-item.price,
        totalPairs:state.totalPairs-1,      
        items: state.items.map(
          item => item.id === action.payload
            ? {
              ...item,
              quantity: parseInt(item.quantity) - 1
            }
            :item
        ),
      };

    break;
    case CartActionTypes.EMPTY_CART:
    return initialState;
    default:
    return  state;



    }
}


export default CartReducer