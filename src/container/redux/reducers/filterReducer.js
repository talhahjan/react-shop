import { FilterActionTypes } from "../actions/action-types";

const initialState={
colors:[],
brands:[],
materials:[],
priceRange:{Min:0,Max:10000},
sortBy:'latest',
}


 const FilterReducer=(state=initialState, action)=>{
switch (action.type) {
case FilterActionTypes.ADD_COLOR:
let color=state.colors.find((x)=>x==action.payload)
if(!color)
return {...state, colors:[...state.colors, action.payload]}
else
return state;
case FilterActionTypes.REMOVE_COLOR:
return {...state, colors:state.colors.filter((el)=> el!=action.payload)}
 case FilterActionTypes.RESET_COLORS:
    return {...state, colors:[initialState.colors]}

    case FilterActionTypes.ADD_BRAND:
      let brand=state.brands.find((x)=>x==action.payload)
      if(!brand)
      return {...state, brands:[...state.brands, action.payload]}
      else
      return state;
      case FilterActionTypes.REMOVE_BRAND:
        return {...state, brands:state.brands.filter((el)=> el!=action.payload)}
       case FilterActionTypes.RESET_BRANDS:
      return {...state, brands:[initialState.brands]}
        case FilterActionTypes.ADD_MATERIAL:
          let material=state.materials.find((x)=>x==action.payload)
          if(!material)
          return {...state, materials:[...state.materials, action.payload]}
          else
          return state;
          case FilterActionTypes.REMOVE_MATERIAL:
            return {...state, materials:state.materials.filter((el)=> el!=action.payload)}
           case FilterActionTypes.RESET_MATERIALS:
            return {...state, materials:[initialState.materials]}
            case FilterActionTypes.SET_PRICE_RANGE:
  return {...state, priceRange:{Min:action.payload.min, Max:action.payload.max}}
case FilterActionTypes.RESET_PRICE_RANGE:
  return {...state, priceRange:[]}
case FilterActionTypes.SET_SORTING:
 return {...state, sortBy:action.payload}
case FilterActionTypes.RESET_SORTING:
  return {...state, sortBy:state.sortBy}
  case FilterActionTypes.RESET_FILTER:
    return initialState;
    default:
    return  state;



    }
}


export default FilterReducer