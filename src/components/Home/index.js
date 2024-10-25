import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';
import { Link } from 'react-router-dom';



class Home extends Component {
    state = {
        tasks: [],
        isEditing:null,
        updatedTitle:'',
        updatedDescription:'',
        searchTerm:''
    }

    componentDidMount() {
        this.fetchAllTasks();
    }

    fetchAllTasks = async () => {
        const url = "http://localhost:8080/tasks";
        const options = {
            method: "GET"
        };
        try {
            const res = await fetch(url, options);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json(); // Await here to get the JSON data
            this.setState({ tasks: data });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    updateButn = async (task) =>{
        const updatedTitle = prompt("Enter new title", task.title);
        const updatedDescription = prompt("Enter new description", task.description);
    
        if (updatedTitle!=null && updatedDescription!=null){
            const url = `http://localhost:8080/tasks/${task.id}`
            console.log(url)
            const options = {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  title: updatedTitle,
                  description: updatedDescription
                })
              };
              try {
                const res = await fetch(url, options);
                if (!res.ok) {
                  throw new Error('Error updating task');
                }
                this.fetchAllTasks();  // Refresh the task list after update
              } catch (error) {
                console.error('Error updating task:', error);
              }
        
        }
    }
    deleteButn = async (taskId) => {
        const url = `http://localhost:8080/tasks/${taskId}`;
        const options = {
          method: "DELETE"
        };
        try {
          const res = await fetch(url, options);
          if (!res.ok) {
            throw new Error('Error deleting task');
          }
          this.fetchAllTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }
      handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    
  render() {
    const {tasks,searchTerm} = this.state
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="app">
        <Header />
        <div className="content">
          <h1 className="main-heading">Task Management Table</h1>
          <div className="table-section">
            <Link to = "/add-task">
            <button className="add-row-btn" onClick={this.navigateToAddTask}>
              Add Task
            </button>
            </Link>
            <input
                type="text"
                placeholder="Search tasks by title"
                value={searchTerm}
                onChange={this.handleSearchChange}
                className="search-bar" // Style this in CSS
            />

            <table className="task-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                    {filteredTasks.map((task, index) => (
                        <tr key={task.id}>
                            <td>{index+1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <button className="update-btn" onClick={()=> this.updateButn(task)}>Update</button>
                                <button className="delete-btn" onClick={()=> this.deleteButn(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home; 