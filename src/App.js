import React,{useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

import AddBook from './AddBook';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';



function App() {
  const [books, setBooks] = useState([])

  

 
  const fetchItems = () => {
    fetch('https://bookstore-4283e-default-rtdb.firebaseio.com/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }
  
  useEffect(() => {
    fetchItems();
  }, [fetchItems])


  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setBooks(valueKeys);
  }

  const addNewBook = (newBook) => {
    fetch('https://bookstore-4283e-default-rtdb.firebaseio.com/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch(`https://bookstore-4283e-default-rtdb.firebaseio.com/books/${id}.json`,
   {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <div  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
    <AddBook style={{marginLeft:'500px'}} addNewBook={addNewBook}/>
    </div>

    <div className="ag-theme-material" style={ { height: 400, width: 1100, margin: 'auto' } }>
        <AgGridReact rowData={books}>
          <AgGridColumn sortable={true} filter={true} field='title' />
          <AgGridColumn sortable={true} filter={true} field='author' />
          <AgGridColumn sortable={true} filter={true} field='year' />
          <AgGridColumn sortable={true} filter={true} field='isbn' />
          <AgGridColumn sortable={true} filter={true} field='price' />
          <AgGridColumn 
            headerName=''
            field='id' 
            width={90}
            cellRenderer={ params => 
                <Button color="primary" onClick={() => deleteTodo(params.value)}>Delete</Button>
            }
          />
        </AgGridReact>
      </div>
    
    
    </>
  );
}

export default App;
