import React from "react";
import axios from "axios";
import "./FileuploadForm.css";

export default class FileuploadForm extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      file: "",
      message: "Please choose your file.",
      isSubmit: false,
    }
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.isSubmit = this.isSubmit.bind(this)
    this.handlerChangefile = this.handlerChangefile.bind(this);
    this.changeButtonColor = this.changeButtonColor.bind(this);
    this.fileInput = React.createRef();
  }
  render(){
    return (
      <form onSubmit={this.handlerSubmit} encType="multipart/form-data">
        <div>
          {this.isSubmit()}
        </div>
        <div>
          <label>
            <input onChange={this.handlerChangefile} ref={this.fileInput} type="file" />
          </label>
        </div>
        <div>
          <button className="btn">upload</button>
        </div>
        <div>
          <p>{this.state.message}</p>
        </div>
      </form>
    )
  }
  async handlerSubmit(event){
    event.preventDefault();
    const formData = new FormData()
    formData.append('file', this.state.file)
    console.log(this.state.file)
    return axios.post("http://127.0.0.1:3333/upload", 
    formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response)
      this.setState({message: `"${this.state.file.name}" file uploaded.`})
    })
    .catch(error => console.log(error))
  }
  async handlerChangefile(event) {
    const file = this.fileInput.current.files[0]
    await this.setState({
      file: file,
      message: (file !== "")?"Please click upload button!":"Please choose your file."
    })
    this.changeButtonColor()
  }
  changeButtonColor(){
    const file = this.state.file;
    
    const buttonClassname = document.querySelector('button').className
    
    const button = (buttonClassname === "btn")? document.querySelector(".btn"):document.querySelector(".btn-upload")
    
    if (file !== "") {
      button.className = "btn-upload"
    } else {
      button.className = "btn"
    }
  }
  isSubmit(){
    const isSubmit = this.state.isSubmit;
    if (isSubmit) {
      return <p>the file submitted.</p>
    }
    return <p></p>
  }
}