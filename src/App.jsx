import { useState } from 'react'
import './App.css'
import './output.css'

function App() {
  const [responses, setResponses] = useState([])
  
  async function getData(query) {
    const url = `http://8.215.95.104:8000/prompt?query=${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      return json
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const query = form.querySelector("input").value
    const json = getData(query)
    const responseDiv = document.querySelector(".response")
    const responseParagraph = document.createElement("p")
    responseParagraph.textContent = json.response
    responseDiv.append(responseParagraph)
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="container flex flex-col">
      <div className="response row w-full h-full ">
        {
          responses.map((response) => {
            return <p>{response}</p>
          })
        }
      </div>
      <div className="prompt-container row">
        <input type="text" className="prompt form-input px-4 py-3 rounded-full" placeholder="prompt here.." />
      </div>
    </div>
    </form>
  )
}

export default App
