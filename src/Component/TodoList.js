import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BasicCard from './BasicCard';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTodos,useTodosDispatch } from './Context/TodosContext';
import { useState,useEffect ,useMemo} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodoList() {
  

const todos = useTodos();
const dispatch = useTodosDispatch();
const [showDeleteDialog,setshowDeleteDialog] = useState(false);
const [dialogTodo,setDialogTodo] = useState(null); 
const [titleInput,setTitleInput] = useState("")
const [displayedtodosType,setDisplayedtodosType] = useState("all"); 

  // Filters
const completedtodos = useMemo(()=>{
  return todos.filter((t)=>{
    return t.isCompleted
  });
},[todos])

const notCompletedtodos = useMemo(()=>{
  return todos.filter((t)=>{
    return ! t.isCompleted
  })
},[todos]) 

let todosToBeRenderd = todos
if(displayedtodosType === "Completed"){
  todosToBeRenderd = completedtodos
}
else if(displayedtodosType === "nonCompleted"){
  todosToBeRenderd = notCompletedtodos
}else{
  todosToBeRenderd = todos
}


 //Filters
function ChangeDisplayedType(e){
  setDisplayedtodosType(e.target.value)
}

 function handleAddClick(){
  dispatch({type:"added",payload:{newTitle:titleInput}});
  setTitleInput("");
 } 
useEffect(()=>{
  dispatch({type:"get"})

},[])
function openDeleteDialog(todo){
  setDialogTodo(todo)
  setshowDeleteDialog(true);
}

function handleDeleteDialogClose(){
  setshowDeleteDialog(false);
}
function handleDeleteConfirm(){
  dispatch({type:"deleted",payload:dialogTodo})
  setshowDeleteDialog(false);
}





const todosJsx =todosToBeRenderd.map((t)=>{
  return <BasicCard key={t.id} todo={t} showDelete={openDeleteDialog}  />})
  return (
    <>
     {/* Delete DiaLoG */}
     <Dialog
        style={{direction:"rtl"}}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك فى حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>نعم, قم بالحذف</Button>
        </DialogActions>
      </Dialog>
    {/* Delete DiaLoG */}
   

      <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style={{
        maxHeight:"80vh",
        overflow:"scroll"
      }}>
      <CardContent>
        <Typography variant='h2' style={{fontWeight:"bold"}}>مهامى</Typography>
        <Divider/>
        
        {/* Buttons */}
        <ToggleButtonGroup style={{direction:"ltr",marginTop:"30px"}}
      value={displayedtodosType}
      exclusive
      onChange={ChangeDisplayedType}
      aria-label="text alignment"
    >
      <ToggleButton value="nonCompleted">
      غير المنجز
      </ToggleButton>
      <ToggleButton value="Completed">
       المنجز
      </ToggleButton>
      <ToggleButton value="all">
      الكل
      </ToggleButton>
    </ToggleButtonGroup>
        {/* Buttons */}
        

        {/*All todos */}
       {todosJsx}
      {/* All todos */}


       {/* Grid */}
       <Grid container spacing={2}sx={{marginTop:"3px"}}>
        <Grid xs={8}>
        <Typography variant='h5' sx={{textAlign:"right"}} > 
        <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{width:"100%"}} value={titleInput} onChange={(e)=>{
          setTitleInput(e.target.value)
        }}/>
        </Typography>
        </Grid>

        <Grid xs={4}>
        <Typography variant='h6' sx={{textAlign:"right",height:"100%"}}> 
        <Button variant="contained" style={{height:"100%",width:"100%"}} onClick={()=>{
          handleAddClick();
        }}
        // eslint-disable-next-line eqeqeq
        disabled={titleInput.length == 0}>اضافة</Button>
        </Typography>
        </Grid>
        
      </Grid>
    {/* Grid */} 
      </CardContent>
    </Card>
      </Container>
    </>
  );
}