import React,{useState} from 'react';

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddBook = (props) => {
    const [open, setOpen] = useState(false);
    const [newBook, setNewBook] = useState({title: '', author: '', year: '', isbn:'', price:''});
    const handleOpen = () => {
        setOpen(true);
      }
    
      const handleClose = () => {
        setOpen(false);
      }
      const handleSave = () => {
        props.addNewBook(newBook);
        handleClose();
      }


      const inputChanged = (event) => {
        setNewBook({...newBook, [event.target.name]: event.target.value});
      }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add Book
      </Button>
      <Dialog open={open}> 
        <DialogTitle>New Book</DialogTitle>
        <DialogContent>
        <TextField
            name="title"
            value={newBook.title}
            onChange={inputChanged}
            margin="dense"
            label="Title"
            fullWidth
          /> 
         <TextField
           name="author"
           value={newBook.author}
           onChange={inputChanged}
           margin="dense"
           label="Author"
           fullWidth
         /> 
         <TextField
           name="year"
           value={newBook.year}
           onChange={inputChanged}
           margin="dense"
           label="Year"
           fullWidth
         /> 
         <TextField
           name="isbn"
           value={newBook.isbn}
           onChange={inputChanged}
           margin="dense"
           label="Isbn"
           fullWidth
         /> 
         <TextField
           name="price"
           value={newBook.price}
           onChange={inputChanged}
           margin="dense"
           label="Price"
           fullWidth
         /> 
        </DialogContent>
        <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog> 
    </div>
  );
}

export default AddBook;
