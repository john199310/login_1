import React from 'react';
import '../App.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from '@mui/material';
import axios from 'axios';

const ListTodo = ({ getTodos, todos, deleteTodo }) => {
  // const [val, setVal] = React.useState(0);
  // const [userHistor, setUserHistory] = React.useState([]);

  // React.useEffect(() => {
  //   // componentDidMount
  //   getUserHistory()
  // }, [user])

  // const getUserHistory = () => {
  //   axios.get('/api/getuser').then(res => setUserHistory(res.data))
  // }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    color:"#fff",
    bgcolor: '#555',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  console.log('=================>')
  console.log(todos);
  // function getObjectById(id) {
  //   const aaa = todos.find(({ action }) => action === "aa");
  //   console.log (`=====>${aaa.action}`);
  //   return aaa;
    
  // }
  const [selItem, setSelItem] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(true); 
    const _selItem=(todos.find(({_id}) => _id ===id)); 
    setSelItem(_selItem);
    setSelDataStr(_selItem.data);
    console.log(_selItem)
  } 

  const handleClose = () => {
    setOpen(false);
    setSelItem({});
    setSelDataStr("");
  }
  // console.log(todos);


  const [text, setText] = React.useState();
  const [selDataStr, setSelDataStr] = React.useState("");

  const handleSelData = (str) => {
    setSelDataStr(str);
  }

  const handleUpdateSelData = () => {
    const update = {
      data: selDataStr
    }

    axios.post(`http://localhost:5000/api/updateTodo/${selItem._id}`, update)                
    .then((res) => {
        console.log('ere');
        if(res.data) {
          console.log('updated response====>', res.data);
          getTodos();
          handleClose();
        }
    })
    .catch((err) => console.log(err));
  }

  return (
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <li key={todo._id}   style={{}} >
              <span onClick={() => {deleteTodo(todo._id);}} class="btn" style={{float:"right",}}></span>
              {todo.action}
              
              <span onClick={() => handleOpen(todo._id)} style={{float:"right",marginRight:"200px"}}>{new Date(todo.createdAt).toLocaleTimeString()}</span>
              
            </li>
          );
        })
      ) : (
        <li>No todo(s) left</li>
      )}
      {selItem && 
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selItem.action}
            </Typography>
            <TextField id="standard-basic" onChange={(e)=>handleSelData(e.target.value)} value={selDataStr} label="Standard" variant="standard" />
            <Button onClick={handleUpdateSelData} variant='outlined' color='primary'>
              submit
            </Button>
          </Box>
        </Modal>
      }
    </ul>
  );
};

export default ListTodo;