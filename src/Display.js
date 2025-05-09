import React,{useState} from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Display() {
    const [tasks,setList]=useState([])
    const [name,setName] = useState('')
    const [editIndex,setEditIndex] = useState(null);

    const addElement = () =>{
        if(name.trim() ==='')return;
        if (tasks.includes(name.trim())){
            //alert('Task already exists');
            return;
        } 
        if (editIndex!==null){
            const newtasks=[...tasks];
            newtasks[editIndex]=name;
            setEditIndex(null);
            setList(newtasks);
        }else{
            setList([...tasks,name]);
        }
        
        setName('');
    }
    const editElement =(index) =>{
        setName(tasks[index])
        setEditIndex(index);
    }
    const deleteElement = (index) =>{
        setList(prevItems => prevItems.filter((_,ind) =>ind!==index ));
    }
    const moveUp=(index)=>{
        if (index!==0){
            const newtasks=[...tasks];
            const temp=newtasks[index];
            newtasks[index]=newtasks[index-1];
            newtasks[index-1]=temp;
            setList(newtasks);
        }
    }
    const moveDown=(index)=>{
        if (index!==tasks.length-1){
            const newtasks=[...tasks];
            const temp=newtasks[index];
            newtasks[index]=newtasks[index+1];
            newtasks[index+1]=temp;
            setList(newtasks);
        }
    }
  return (
    <div className='full'>
        <h1 className='to-do'>ToDo List</h1>
        <div className='top'>
            <div className='input-wrapper'>
                <input className='inputbar' type='text' value={name} onChange={e => setName(e.target.value)}/>
                <button className='add' onClick={addElement}> 
                    {editIndex !== null ? "Update" : <i className="fa-solid fa-plus"></i>} 
                </button>
                
                {editIndex !== null && (
                    <button className='cancel' onClick={() => {
                        setEditIndex(null);
                        setName('');
                    }}>
                        Cancel
                    </button>
                )}
            </div>
        </div>


        <div className='row'>
        <ul className='items'>
            {tasks.map((task,index)=>(
                <li key={index}>
                    <div className='eachTask'>
                        <div className='text'>
                            {index+1}.{task} 
                        </div>
                        <div className='buttons'>
                            <button onClick={()=>editElement(index)}><i class="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={()=>deleteElement(index)}><i className="fa-solid fa-trash"></i>                            </button>
                            <button onClick={()=>moveUp(index)}><i class="fa-solid fa-up-long"></i></button>
                            <button onClick={()=>moveDown(index)}><i class="fa-solid fa-down-long"></i></button>
                        </div>
                    </div></li>
            ))}
        </ul>
      </div>

    </div>
  )
}

export default Display
