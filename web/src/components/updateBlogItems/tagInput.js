import {React, useRef} from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import tagInputStyle from './tagInput.module.scss';

export default function TagInput(props) {
    const tagRef = useRef("");
    
    const AddNewTag = (event) => {
        event.preventDefault();
        if(tagRef.current.value.length) 
            props.addTag(tagRef.current.value)
            tagRef.current.value = ""
    }

    const deleteOldTag = (tagName) => {
        props.deleteTag(tagName)
    }

    let tags = []
    if (props.tags){
        tags = props.tags.map(tag=> 
            <Chip   label={tag} 
                    variant="outlined" 
                    onDelete={()=>deleteOldTag(tag)} />
        )
    }

  return (
    <div className={tagInputStyle.container}
        onClick={()=> tagRef.current.focus()}>
        <Stack direction="row" spacing={1}>
           {tags}
        </Stack>
        <input placeholder={"Enter Tag"} ref={tagRef}
            style={{marginTop:"5px"}}></input>
        <button onClick={AddNewTag}>Add Tag</button>
    </div>
  )
}
