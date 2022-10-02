import React from 'react'
import Collapsable from "./collapsable";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import colors from '../hooks/colors';
import spinner from "../assets/images/spinner.gif";
import { useFilter } from "../hooks/fetchData";
const Filter = () => {

const filter=useSelector(state=>  state.filter);
const dispatch=useDispatch();
const {
  isLoading,
  isError,
  data,
} = useFilter();
const selectCheckBoxes=document.querySelectorAll('#filter-form input[type="checkbox"]');





const toggleFilterOptions=(e, option)=>{
  let Name=e.target.value.toLowerCase(),
  isChecked=e.target.checked,
  optionName=option.toUpperCase(),  
  action=isChecked ? `ADD_${optionName}`: `REMOVE_${optionName}`;  
  e.target.toggleAttribute("checked");
  dispatch({type:action, payload:Name})
    }
  


    const resetFilter=(e)=>{
      e.preventDefault();
      selectCheckBoxes.forEach(checkBox=>{
      checkBox.checked=false;
      })

let min=document.querySelector('.input-min');
let max=document.querySelector('.input-max');
let minRange=document.querySelector('.range-min');
let maxRange=document.querySelector('.range-max');
let progress=document.querySelector('.slider .progress');

min.value=0;
max.value=10000;
maxRange.value=10000;
minRange.value=0;
progress.style.left=(0 / minRange.max) * 100 + "%";
progress.style.right= 100 -(10000 / maxRange.max) * 100 + "%";
 dispatch({type:"RESET_FILTER"});
     }



   useEffect(() => {
  const rangeInput=document.querySelectorAll('.range-input input');
  const priceInput=document.querySelectorAll('.price-input input');
  const progress =document.querySelector('.slider .progress');




let priceGap=500;

rangeInput.forEach(input=>{
    input.addEventListener('change',(e)=>{
      let minVal=parseInt(rangeInput[0].value),
      maxVal=parseInt(rangeInput[1].value);


if(maxVal - minVal < priceGap){
  if(e.target.classList.contains("range-min")){ // if active slider is min slider
      rangeInput[0].value=maxVal - priceGap
  }
  else

rangeInput[1].value=minVal + priceGap


}
else{
  priceInput[0].value=minVal;
  priceInput[1].value=maxVal;
  dispatch({type:"SET_PRICE_RANGE", payload:{min:priceInput[0].value,max:priceInput[1].value}})      
    progress.style.left=(minVal / rangeInput[0].max) * 100 + "%";
    progress.style.right= 100 -(maxVal / rangeInput[1].max) * 100 + "%";
}


  })
})



    
priceInput.forEach(input=>{
    input.addEventListener('change',(e)=>{
      let minVal=parseInt(priceInput[0].value),
      maxVal=parseInt(priceInput[1].value);
 if((maxVal - minVal >= priceGap) && maxVal <= 10000 ){
  
  if(e.target.classList.contains('input-min')){ // if active is input is mim input
      rangeInput[0].value=minVal;
      progress.style.left=(minVal / rangeInput[0].max) * 100 + "%";
  }
  else
rangeInput[1].value=maxVal
progress.style.right= 100 -(maxVal / rangeInput[1].max) * 100 + "%";

}
dispatch({type:"SET_PRICE_RANGE", payload:{min:rangeInput[0].value,max:rangeInput[1].value}})

  })




})

 progress.style.left=(filter.priceRange.Min / rangeInput[0].max) * 100 + "%";
 progress.style.right= 100 -(filter.priceRange.Max / rangeInput[1].max) * 100 + "%";






  return () => {
    window.removeEventListener
  };
}, []);



  return (
    <>
      {/* <!-- filter options offcanvas  --> */}
      <div                                               
        className="filter offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOptions"
        aria-labelledby="filterOptionsLabel"
      >

        <form noValidate id="filter-form">
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title text-dark" id="filterOptionsLabel">
            Filter & Refine
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="d-flex justify-content-end m-2">
          <button onClick={(e)=>resetFilter(e)} className="btn btn-outline-primary btn-sm ">Reset All</button>
        </div>

        {/* options for sizes  */}
        <Collapsable title="colors">
          <div className="filter-content colors">
            <div className="color-container">
        <div className="colors">
{colors.map((color, key)=>{
return (
<React.Fragment key={key}>
 <input onClick={(e)=>toggleFilterOptions(e, "color")}
                  type="checkbox"
                  className="d-none"
                  id={color.Name}
                  defaultValue={color.Name}
                  defaultChecked={filter.colors.find(ele=>ele==color.Name.toLowerCase()) ? true: false}
                  aria-label="..." />
<label className="color" style={{ backgroundColor: color.HEX }} htmlFor={color.Name}>
                  
</label> 
</React.Fragment>

    )

})}
              </div>
            </div>
          </div>
        </Collapsable>

        <Collapsable title="brands">
          <div className="filter-content">
          {isLoading &&  <img src={spinner} className="mx-auto d-block" alt="" />}

          {!isLoading && !isError && data && 
             <ul className="list-group">   
{data.brands.map((brand, key)=>{
  return <li className="list-group-item" key={key}>
  <div className="form-check">
 <input className="form-check-input" type="checkbox" id={brand.title}
 defaultChecked={filter.brands.find(ele=>ele==brand.title.toLowerCase()) ? true: false}
defaultValue={brand.title}
 onClick={(e)=> toggleFilterOptions(e, "brand")} />
 <label className="form-check-label"  htmlFor={brand.title}>
  {brand.title}
 </label>
</div>
 </li> 
})}

             </ul>
   
   }

 </div>
        </Collapsable>






        <Collapsable title="materials">
          <div className="filter-content">



          {isLoading &&  <img src={spinner} className="mx-auto d-block" alt="" />}



          {!isLoading && !isError && data && 
             <ul className="list-group">   
{data.materials.map((material)=>{
 return <li className="list-group-item" key={material}>
  <div className="form-check">
 <input className="form-check-input"
 type="checkbox" id={material} 
 defaultChecked={filter.materials.find(ele=>ele==material.toLowerCase()) ? true: false}
 defaultValue={material} 
 onClick={(e)=> toggleFilterOptions(e, "material")} />
 <label className="form-check-label"  htmlFor={material}>
  {material}
 </label>
</div>
 </li> 
})}

             </ul>
   
   }

 </div>
        </Collapsable>

<Collapsable title="Price Range" >

<p>use slider or enter min and max price</p>

<div className="price-input">

<div className="field fw-bold">
    <span className="fw-bolder">Min</span>
    <input type="number" 
    className="form-control input-min" defaultValue={filter.priceRange.Min? filter.priceRange.Min: 0  } /> 
</div>

<div className="separator">-</div>

<div className="field">
    <span className="fw-bolder">Max</span>
    <input 
    type="number"  
    className="input-max form-control" defaultValue={filter.priceRange.Max? filter.priceRange.Max: 10000  } />
</div>

</div>
<div className="slider">
<div className="progress"></div>
</div>
<div className="range-input">
<input type="range" 
className="range-min" min="0" max="10000" defaultValue={filter.priceRange.Min? filter.priceRange.Min: 0 } step="500" />
<input  
type="range" className="range-max" min="0" max="10000" defaultValue={filter.priceRange.Max? filter.priceRange.Max: 0  } step="500" />
</div>
</Collapsable>

        {/* options for sizes  */}
        </form>
      </div>
      {/* <!-- filter options offcanvas  --> */}
    </>
  );
};



export default Filter;