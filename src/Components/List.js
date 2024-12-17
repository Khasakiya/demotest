import React, { useState, useEffect, use } from 'react'
import "./style.css";

const getLocalData =()=>{
    const lists = localStorage.getItem("mylist");

    if(lists){
        return JSON.parse(lists);
    }else{
        return[];
    }
}

const List = () => {


    const [inputData,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem =() =>{
        if(!inputData){
            alert("plz fill the data");
        }
        else if(inputData && toggleButton){
            setItems(
                 items.map((curElem)=>{
                    if(curElem.id === isEditItem){
                        return{...curElem,name: inputData};
                    }
                    return curElem;
                 })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } 
        else{
            const myNewInputData = {
                id : new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    const editItem = (index)=>{
        const item_edited = items.find((curElem)=>{
            return curElem.id === index;
        });
        setInputData(item_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    const deleteItem = (index)=> {
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index;
        });
        setItems(updatedItems)
    }

    const removeAll = () =>{
        setItems([]);
    }

    useEffect(()=>{
        localStorage.setItem("mylist", JSON.stringify(items))
    },[items]);


  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="" alt="" />
                <figcaption>Add  Your List Here</figcaption>
            </figure>
            <div className="addItems">
                <input type='text'
                placeholder='✍️ Add Names'
                className='form-control'
                value={ inputData}
                onChange={(event)=> setInputData(event.target.value)}
                />
                {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i>  
                : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
            </div>

                <div className="showItems">
                    {items.map((curElem)=>{
                        return(
                        <div className="eachItems" key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add-btn" 
                        onClick={()=>editItem(curElem.id)}></i>
                        <i className="far fa-trash-alt add-btn" 
                        onClick={()=>deleteItem(curElem.id)}></i>
                        </div>
                    </div>
                        )
                    })}
                    
                </div>


            <div className="showItems">
                <button className='btn effect04' data-sm-link-text="Remove All" 
                onClick={removeAll}>
                    <span>Remove All</span> 
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default List