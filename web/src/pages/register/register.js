import {React, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import RegisterStyle from './register.module.scss';
import axios from 'axios'

function Register() {
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  let navigate = useNavigate();
  
  const submitForm = async (event) => {
        event.preventDefault()
        if(username.length != 0 && password.length != 0 && profilePicture.length != 0){
          let newUser = {
            username: username,
            password: password, 
            profilePicture: profilePicture
          }
          
          let res = await axios.post("/authentication/register",newUser)
          console.log(res)

          navigate("/", { replace: true });
        }
  }

  const cancelForm = (event) => {
    event.preventDefault()
    navigate("/", { replace: true });
  }

  return (
    <div className={RegisterStyle.card}>
      <h3>Register</h3>
        <Form  onSubmit={submitForm}>
          <div className={RegisterStyle.cardForm}>
            <Form.Group className={RegisterStyle.cardInput}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </Form.Group>

            <Form.Group className={RegisterStyle.cardInput}>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="text" placeholder="Enter Profile Picture" value={profilePicture} onChange={(event)=>setProfilePicture(event.target.value)}/>
            </Form.Group>

            <Form.Group className={RegisterStyle.cardInput}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </Form.Group>

          </div>
          <div className={RegisterStyle.cardButton}>
            <Button className={RegisterStyle.cancelButton} onClick={cancelForm}>
              Cancel
            </Button>
            <Button className={RegisterStyle.submitButton} type="submit">
              Register
            </Button>
          </div>
        </Form>
    </div>
  )
}

export default Register