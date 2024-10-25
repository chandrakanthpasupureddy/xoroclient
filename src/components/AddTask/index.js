import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';
import { Navigate } from 'react-router-dom';

class AddTask extends Component {
    state = {
        title:'',
        description:'',
        navigateToHome:false,
    }
    addTitle = (event) =>{
        this.setState({title:event.target.value})
    }
    addDescription = (event) =>{
        this.setState({description:event.target.value})
    }
    onSubmitSuccess = () => {
        alert("Task added successfully!")
        this.setState({navigateToHome:true})
    }
    submitForm = async (event) =>{
        event.preventDefault()
        const {title,description} = this.state
        const userDetails = {title,description}
        const url = "http://localhost:8080/tasks"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        };
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            this.onSubmitSuccess()
          }
    }

  render() {
    const { navigateToHome } = this.state;

    if(navigateToHome){
        return <Navigate to = "/"/>;
    }
    return (
      <div className="app">
        <Header />
        <div className="content">
          <h1>Add New Task</h1>

          <form className="task-form" onSubmit={this.submitForm}>
            <div className="form-group">
              <label className='lab'>TITLE:</label>
              <input type="text" placeholder="Enter task title" onChange={this.addTitle}/>
            </div>
            <div className="form-group">
              <label className='lab'>DESCRIPTION:</label>
              <input type="text" placeholder="Enter task description"  onChange={this.addDescription}/>
            </div>

            <button type="submit" className="submit-btn">Add Task</button>

          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddTask;