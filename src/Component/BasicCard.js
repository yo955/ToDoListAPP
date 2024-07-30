import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import { useState } from 'react';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import { useTodosDispatch } from './Context/TodosContext';




export default function BasicCard({todo,showDelete}) {
  const dispatch = useTodosDispatch();
  const [showUpdateDialog,setshowUpdateDialog] = useState(false);
 const [updatedTodo,setUpdatedTodo] = useState ({
  title:todo.title,
  details:todo.details,
 })


  function handleCheckClick(){
   dispatch({type:"check",payload:todo})
  }
  function handleDeleteClick(){
    showDelete(todo);  // props
  }
  function handleUpdateClick(){
    setshowUpdateDialog(true);
  }
  
function handleUpdateClose(){
  setshowUpdateDialog(false);
}

function handleUpdateConfirm(){
  
  dispatch({type:"updated",payload:{
    id:todo.id,
    title:updatedTodo.title,
    details:updatedTodo.details,
  }})
  setshowUpdateDialog(false )

}
  return (
    <>
     {/* Update DiaLoG */}
     <Dialog
        style={{direction:"rtl"}}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          تعديل مهمة
        </DialogTitle>
        <DialogContent>
         <TextField 
         autoFocus
         margin='dense'
         id='name'
         label='عنوان المهمة'
         fullWidth 
         variant='standard'
         value={updatedTodo.title}
         onChange={(e)=>{
          setUpdatedTodo({...updatedTodo,title:e.target.value})
         }}
         />
         <TextField 
         autoFocus
         margin='dense'
         id='name'
         label=' التفاصيل'
         fullWidth
         variant='standard'
         value={updatedTodo.details}
         onChange={(e)=>{
          setUpdatedTodo({...updatedTodo,details:e.target.value})
         }}/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>اغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>تحديث</Button>
        </DialogActions>
      </Dialog>
    {/* Update DiaLoG */}
    
    <Card className='todoCard' sx={{ minWidth: 275,background:"#283593",color:"white",marginTop:1 }}>
      <CardContent>
          {/* Grid */}
      <Grid container spacing={2}>
        <Grid xs={8}>
        <Typography variant='h5' sx={{textAlign:"right",textDecoration:todo.isCompleted ?"line-through":"none"}}>  {todo.title}</Typography>
        <Typography variant='h6' sx={{textAlign:"right"}}> {todo.details}</Typography>
        </Grid>
        <Grid xs={4} display="flex" justifyContent="space-around" alignItems="center" >
          {/* Icons */}
          <IconButton aria-label="delete" style={{color:todo.isCompleted?"white":"#8bc34a",
          background:todo.isCompleted? "#8bc34a":"white",
          border:"3px solid #8bc34a"}}className='IconButton'
          onClick={()=>{
            handleCheckClick();
          }}
          >
        <CheckIcon />
      </IconButton>

          <IconButton aria-label="delete" style={{color:"#1769aa",background:"white",border:"3px solid #1769aa"}}className='IconButton' onClick={handleUpdateClick}>
        <CreateIcon />
      </IconButton>
       
          <IconButton aria-label="delete" style={{color:"#b23c17",background:"white",border:"3px solid #b23c17"}}className='IconButton'
          onClick={handleDeleteClick}>
            
        <DeleteIcon />
      </IconButton>
          {/* Icons */}
        </Grid>
      </Grid>
    {/* Grid */}  
      </CardContent>
    </Card>
    </>
  );
}