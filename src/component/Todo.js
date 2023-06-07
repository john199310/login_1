import React, { Component } from 'react';
import axios from 'axios';
import Input from './Inputt';
import ListTodo from './ListTodo';
import { Button } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

class Todo extends Component {
  state = {
    todos: [],
  };
  
  // nav = () => {
  //   Navigate('/');
  // }
   
  componentDidMount() {
    this.getTodos();
  }
  
    // getTodos = async () => {
    // const token = localStorage.getItem('token');
    // const response = awaitfetch('http://127.0.0.1:5000/api/todos', {
    //             method: 'GET',
    //             headers: { 'Authorization': ` ${token}` }
                
    //           });
    //           console.log(response.data);
    //           if (response.data)
    //           this.setState({
    //                       todos: response.data,
    //                     });}
      getTodos = () => {
        const [cookies, setCookie] = useCookies(['token']);
        // const token = localStorage.getItem('token');
        axios
          .get('http://localhost:5000/api/todos',{
            withCredentials: true
          }
          )
          .then((res) => {
            
            if (res.data) {
              this.setState({
                todos: res.data,
              });
            }
          })
          .catch((err) => console.log(err));
      };


  deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { todos } = this.state;
    
    return (
      <div>
        <NavLink to="/" style={{float:'right'}}><Button  variant='outlined'>home</Button></NavLink>
        
        <h1>My Todo(s)</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} getTodos={this.getTodos}/>
      </div>
    );
  }

}

export default Todo;