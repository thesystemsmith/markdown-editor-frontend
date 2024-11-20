import React, { useState, useEffect } from "react";
import axios from "axios";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./App.css";

function App(){
  const [markdown, setMarkdown] = useState('')
  const [htmlPreview, setHtmlPreview] = useState('')

  //event handler
  const handleInputChange = async (e) =>{
    const input = e.target.value
    setMarkdown(input)

    try {
      const response = await axios.post('http://localhost:5001/convert', {markdown: input})
      setHtmlPreview(response.data.html)
    } catch (error) {
      console.log('error converting markdown to html ', error)
    }
  }

  //apply syntax highlighting whenever content changes
  useEffect(() => {
    Prism.highlightAll()
  }, [htmlPreview])
  
  return (
    <div className="App">
      <h1>Markdown Editor</h1>
      <div className="editor-container">
        <textarea
          className="editor"
          value={markdown}
          onChange={handleInputChange}
          placeholder="Type Markdown here....."
        />
        <div
          className="preview"
          dangerouslySetInnerHTML={{__html: htmlPreview}}
        />
      </div>
    </div>
  )
}

export default App