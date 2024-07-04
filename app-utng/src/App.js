
import './App.css';
import { DataStore } from 'aws-amplify/datastore';
import { Todo } from './models';
function App() {
const createTODO= async()=>{
  await DataStore.save(
    new Todo({
		"name": "Lorem ipsum dolor sit amet",
		"description": "Lorem ipsum dolor sit amet"
	})
);
queryTODO();
}
const queryTODO=async()=>{
  const models = await DataStore.query(Todo);
  console.log(models);
}
const deleteTODO=async()=>{
  const modelToDelete = await DataStore.query(Todo, "97a40f3e-6efe-492d-a6e0-39ecab575e8b");
  DataStore.delete(modelToDelete);
  queryTODO();
}
const updateTODO=async()=>{
  const CURRENT_ITEM =await DataStore.query(Todo,"97a40f3e-6efe-492d-a6e0-39ecab575e8b");
  await DataStore.save(Todo.copyOf(CURRENT_ITEM,item=>{
    item.name="hola";
    item.description="adios";
  }));
  queryTODO();
}
  return (
    <div className="App">
      <button onClick={()=>queryTODO()}>Query</button>
      <button onClick={()=>createTODO()}>Create</button>
      <button onClick={()=>updateTODO()}>Update</button>
      <button onClick={()=>deleteTODO()}>Delete</button>
      
    </div>
  );
}

export default App;
