import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name:'', age:'' })
  useEffect(()=>{ getAllData() },[])
  const [user2, setUser2] = useState({id:'', name:'', age:''})

  // read all rows from table
  async function getAllData() {
    let { data: users, error } = await supabase
      .from('users')
      .select('*')
    setUsers(users);
  }

  const handleChange = (event) => {
    setUser(prevFormData=>{
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleChange2 = (event) => {
    setUser2(prevFormData=>{
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  // Insert new row / post new form data
  async function createUser(event) {
    event.preventDefault();
    try{
      await supabase
        .from('users')
        .insert({ name: user.name, age: user.age })
      setUser({id:'', name:'', age:''})
    }catch(error){
      console.log(error)
    }
    getAllData();
  }

  // Delete the row
  async function deleteUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId)

      if(error){
        console.log(error)
      }
      if(data){
        console.log(data)
      }

    getAllData();
  }

  // Update the row
  async function getUpdateUser(userId) {
    // console.log(userId.name, userId.age)
    const updateRow = users.find((user)=>user.id===userId)
    console.log(updateRow);
    setUser2({id:updateRow.id, name:updateRow.name, age:updateRow.age})
  }

  async function updateUser(userId) {
    try{
      const { data, error } = await supabase
      .from('users')
      .update({ name: user2.name, age: user2.age })
      .eq('id', userId)

      setUser2({id:'', name:'', age:''})
    } catch (error) {
        console.log(error)
    }
    getAllData();
  }
  

  console.log(user2)

  return (
    <>
      {/* FORM 1 */}
      <form onSubmit={createUser}>
        <input type="text" placeholder='Name' name="name" onChange={handleChange} value={user.name} />
        <input type="number" placeholder='Age' name="age" onChange={handleChange} value={user.age} />
        <button type="submit">Create</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row)=>(
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>
                <button onClick={()=>{deleteUser(row.id)}}>Delete</button>
                <button onClick={()=>{getUpdateUser(row.id)}}>Update</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>

      {/* FORM 2 */}
      <form onSubmit={(event)=>{event.preventDefault(); updateUser(user2.id)}}>
        <input type="text" value={user2.name} name="name" onChange={handleChange2} />
        <input type="number" value={user2.age}  name="age" onChange={handleChange2} />
        <button type="submit">Save Changes</button>
      </form>
    </>
  )
}

export default App
