import {React, useState} from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import searchBarStyle from './searchBar.module.scss';

export default function SearchBar(props) {
  const [search,setSearch] = useState("")

  const submitSearch = ()=>{
    if(search.length){
      props.setSearchTerm(search)
      setSearch("")
    }
  }

  const handleEnterKey = (event) => {
    if(event.keyCode === 13){
      submitSearch();
    }
  }

  const searchBar = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    margin:"25px"
  }

  return (
    <div style={searchBar}>
      <span style={{fontSize:"125%"}}>Search for Blogs:</span>
      <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined" 
      className={searchBarStyle.searchBar}>
        <InputLabel htmlFor="outlined-adornment-search">
          Search
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type={'text'}
          onChange={(event)=>setSearch(event.target.value)}
          onKeyDown={handleEnterKey}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon onClick={submitSearch}/>
            </InputAdornment>
          }
          label="search"
          value={search}
        />
      </FormControl>
    </div>
  )
}
