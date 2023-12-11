import { useState } from 'react';
import './App.css';

// const Itemslist = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 1, packed: true },
//   { id: 4, description: "Brush", quantity: 2, packed: false },
// ];
function App() {
  const[items , setitems] = useState([])
  
  function handleAddItems(item){
    console.log({item})
      setitems((items) => [...items,item]);
  }

  function handleDelete(id){
    setitems((items)=>(items.filter((item)=>item.id !== id)))
  }

  function handleToggleItems(id){
    setitems((items)=>items.map((item)=>item.id === id ? {...item , packed:!item.packed} : item));
  }

  function handleClearList(){
    // alert("Are you sure u want to clear all items?🤔")?
    const Confirmed = window.confirm("Are u sure u Want to Clear all items ?🤔")
    if(Confirmed)
    setitems([])
  }
  return (
    <div className="app">
      <Logo/>
      <Form  onAdditems={handleAddItems}/>
      <PackingList  Items={items} onDeleteItem={handleDelete} onToogleItem={handleToggleItems} onClearItem={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return(<h1>🌴Far Away💼</h1>)
}

function Form({onAdditems}){
  const[description,setDesc]=useState("");
  const[quality,setNumber ] = useState("")
  
  function eventhandler(e){
   e.preventDefault();
   if(!description)
   return alert("Please Enter Item 🙌")
  const newItem = {description,quality, packed:false , id:Date.now() }

  onAdditems(newItem);
  setDesc("")
  setNumber(1)
  }
return(
  <form className='add-form' onSubmit={eventhandler}>
    <h3>what do u need for ur Trip😍</h3>
    <select value={quality} onChange={(e)=>setNumber(Number(e.target.value))}>
      {Array.from({length:20} , (_ , i)=>i+1).map((num)=>(<option value={num} key={num}  >{num}</option>))}
    </select>
    <input type='text' placeholder='Items...' value={description} onChange={(e)=>setDesc(e.target.value)}></input>
    <button>Add</button>
  </form>
)
}

function PackingList({Items , onDeleteItem , onToogleItem , onClearItem}){
  const[sortBy,setSortBy] = useState("input") ;
  let sortedItems;
  console.log({sortedItems})
  if(sortBy==="input")
     sortedItems= Items;

     if(sortBy==="description")
     sortedItems= Items.slice().sort((a ,b)=> a.description.localeCompare(b.description.localeCompare))

     if(sortBy==="packed")
     sortedItems=Items.sort((a ,b)=>Number(a.packed)- Number(b.packed));
return (
<div className='list'>
  <ul>
{sortedItems.map((item)=>(<Item items={item} onDeleteItem={onDeleteItem} onToogleItem={onToogleItem} key={item.id}/>))}
</ul>
<div className='actions'>
 <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
  <option value='input'>Sort Items by input Order </option>
  <option value='description'>Sort Items by Description Order </option>
  <option value='packed'>Sort Items by Packed Order </option>
 </select>
 <button onClick={onClearItem}>Clear List</button>
</div>
</div>
)
}

function Item({items , onDeleteItem, onToogleItem}){
        return(
          <li>
            <input type='checkbox' value={items.packed} onChange={()=>onToogleItem(items.id)}></input>
            <span style={items.packed ? {textDecoration:"line-through"} : {}}>
            {items.quality} 
            {items.description}
            <button onClick={()=>onDeleteItem(items.id)}>❌</button>
            </span>
          </li>
        )
}
function Stats({items}){
if(!items.length)
return <p><em className='footer'>Start Adding Items to your Packing List🚀😊</em></p>
else{const NumItems = items.length;
  const Numpacked = items.filter((item)=>item.packed).length
  const Percentage = Math.round(Numpacked/NumItems*100)
   return <footer className='stats'>
    <em>
      {Percentage === 100 ? "You Got Everthing! Ready to Go ✈️🌍":
    `You have ${NumItems} 💼items on your list ,and you already packed ${Numpacked} items😍 (${Percentage}%)💪🤟`}
    </em>
   </footer>}
}
export default App;
