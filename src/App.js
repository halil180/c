import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState("")
  const [lineThrough, setlineThrough] = useState(false)

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);


  const decorateText = () => {
    setlineThrough(!lineThrough) 
  }


  function getTodos() {
    fetch('http://localhost:8080/todos')
    .then(response => response.json())
    .then(data => {
      setGroups(data);
      console.log("data ",data)
      setLoading(false);
    })
    
  }



  useEffect(() => {
    getTodos()
    setLoading(true);
  }, []);
  const addTodo = (values) => {
    // console.log(values);
  fetch("http://localhost:8080/todo", {
    method: "POST", ////use the POST method to save the infos in the db
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  }).then(()=> getTodos());
};
  


  const handleDeleteItem = async (id) => {
    console.log(";p")
    console.log(id + "delete")
    await fetch(`http://localhost:8080/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => getTodos())
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="App">  
    <h1 style={{color: "white"}}>Todo List  + </h1>
    <input type="text" name="" id="" placeholder='add new todo'  onChange={(e) => setInput(e.target.value)} style={{marginRight:12}}/>
    <button style={{background:"#0c63b5"}} onClick={() => addTodo(input)}>add</button>
    <table>
      <tbody>
      {groups.map((x,index) => (
          <tr className={lineThrough ? "lineThrough" : ""}>
          {/* <td onClick={() => decorateText()}>[]</td> */}
          <td onClick={() => decorateText()}>{x.toString()}</td>
          <td><button onClick={() => handleDeleteItem(index)}><i className="fa fa-trash"></i></button></td>
        </tr>
      ))}
            </tbody>
</table>

    </div>
  );
}

export default App;
