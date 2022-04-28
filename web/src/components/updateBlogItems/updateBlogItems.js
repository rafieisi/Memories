import {React, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import updateBlogItems from './updateBlogItems.module.scss';
import TagInput from './tagInput';

function UpdateBlogItems(props) {
  
  const [title, setTitle] = useState(props.blog.title)
  const [content, setContent] = useState(props.blog.content)
  const [image, setImage] = useState(props.blog.image)
  const [tags, setTags] = useState(props.blog.tags);
  let navigate = useNavigate();
  
  const submitForm = (event) => {
        event.preventDefault()
        if(title.length==0||content.length==0||image.length==0)return
        let blog = {...props.blog}
        blog["title"] = title
        blog["content"] = content
        blog["image"] = image
        blog['tags'] = tags
        props.action(blog)
        navigate("/", { replace: true });
  }

  const cancelForm = (event) => {
    event.preventDefault()
    navigate("/", { replace: true });
  }

  const addTag = (newTag) => {
    setTags(prevState => [...prevState,newTag])
  }
  const deleteTag = (tagName) => {
    setTags(prevState => prevState.filter(tag=>tag!=tagName))
  }

  return (
    <div className={updateBlogItems.card}>
      <h3>{props.pageTitle}</h3>
        <Form  onSubmit={submitForm}>
          <div className={updateBlogItems.cardForm}>
            <Form.Group className={updateBlogItems.cardInput} controlId="formBasicEmail">
              <Form.Label>Memory Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Blog Title" value={title} onChange={(event)=>setTitle(event.target.value)}/>
            </Form.Group>

            <Form.Group className={updateBlogItems.cardInput} controlId="formBasicPassword">
              <Form.Label>Memory Content</Form.Label>
              <Form.Control rows={10} as="textarea" placeholder="Enter Blog Content" value={content} onChange={(event)=>setContent(event.target.value)}/>
            </Form.Group>

            <Form.Group className={updateBlogItems.cardInput} controlId="formBasicPassword">
              <Form.Label>Memory Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter Image URL" value={image} onChange={(event)=>setImage(event.target.value)}/>
            </Form.Group>

            <TagInput tags={tags} addTag={addTag} deleteTag={deleteTag}/>
          </div>
          <div className={updateBlogItems.cardButton}>
            <Button className={updateBlogItems.cancelButton} onClick={cancelForm}>
              Cancel
            </Button>
            <Button className={updateBlogItems.submitButton} type="submit">
              Submit
            </Button>
          </div>
        </Form>
    </div>
  )
}

export default UpdateBlogItems