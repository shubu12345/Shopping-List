import { useState } from 'react';
import './App.css'
import note from './assets/note.png'
import { useEffect } from 'react';

const GetStoredData = () => {
  const list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list)
  }else{
    return []
  }
}

function App() {
const [list, setList] = useState('');
const [items, setItems] = useState(GetStoredData());

const AddList = () => {
  if(!list){
    alert("Please insert item")
  }else{
    setItems((previous) => {
      return [...previous, list]
     });
     setList("")
   }
  }
 
useEffect(() => {
localStorage.setItem("list", JSON.stringify(items))
},[items])


const DeleteItem = (id) => {
  const UpdatedData = items.filter((arr, ind) => {
    return id !== ind
  });
  setItems(UpdatedData)
}

const DeleteAllRecord = () => {
  setItems([]);
}

  return (
    <>
      <div className='main-container'>
      <div>
        <figure className='text-container'>
          <img src={note} alt={note} />
          <figcaption style={{color:'#fff'}}>Shopping List</figcaption>
        </figure>
      </div>
      <div className='input-box'>
        <input name='name' value={list} onChange={(e) => {
         setList(e.target.value);
        }} type='text' placeholder='✍ Add your shopping List...' />
        <button onClick={AddList}>+</button>
      </div>
      <div className='list-container'>
        <div>
          {
            items.map((item, index) => {
              return <h3 key={index} id={index} style={{padding:5, color:'#fff', fontFamily:'sans-serif',fontWeight:'normal'}}>{item}
      <span style={{marginLeft:5}}><i onClick={() => DeleteItem(index)} className="fa-solid fa-trash" style={{color:'#A31D1D'}}></i></span>
      </h3>
            })
          }
      </div>
      </div>
      <div className='all-btn'>
        <button onClick={DeleteAllRecord}>Clear All</button>
      </div>
      </div>
    </>
  )
}

export default App
