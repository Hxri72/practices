import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({name: "", skills: "", experience: ""});
  const [searchValue,setSearchValue] = useState("");

  const handleSearchValue = (e) => {
    console.log(e);
    //setting the value into state
    setSearchValue(e.target.value);
  }

  const handleSubmitSearch = async (e) => {
    try {
    e.preventDefault();
    console.log(searchValue);
    const response = await fetch(`http://localhost:5005/candidates/${searchValue}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok) {
      throw new error("something went wrong");
    }
    const data = await response.json();
    setCandidates([data]);
    } catch (error) {
      setError("something went wrong");
    }
  }

  const handleSubmit= async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5005/create", {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
    })

    const data = await response.json();

    console.log("response---after returning from backend",data);

    setCandidates((prev) => [
      ...prev,
      data?.data
    ])
  }

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  useEffect(()=> {
    async function fetchCandidates() {
      try {
          const response = await fetch("http://localhost:5005/candidates");
          const response2 = await response.json();
          if(!response.ok) {
            throw new Error("Something went wrong");
          }
          setCandidates(response2);
      } catch (error) {
        console.log(error);
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
  }
  fetchCandidates();
  },[])

  if(loading) {
    return <h1>....Loading Candidates</h1>
  }

  if(error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <h1>Candidate List</h1>
      <input
      type='string'
      name='searchValue'
      value={searchValue}
      onChange={handleSearchValue}
      placeholder='Enter a string to search'
      ></input>
      <button onClick={handleSubmitSearch}>Search Candidate</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c)=> (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.skills.join(", ")}</td>
            <td>{c.experience}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop: '50px'}}>
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input
          type='string'
          value={form.name}
          placeholder='Name'
          name='name'
          onChange={handleChange}
          ></input>
          <p>Skills</p>
          <input
          type='string'
          value={form.value}
          name='skills'
          placeholder='Skills'
          onChange={handleChange}
          ></input>
          <p>Experience</p>
          <input
          type='string'
          name='experience'
          value={form.experience}
          onChange={handleChange}
          placeholder='Experience'
          >
          </input>
          <br/>
          <button type='submit' style={{marginTop:'20px'}}>
            Add Candidate
          </button>
        </form>
      </div>
    </>
  )
}

export default App
