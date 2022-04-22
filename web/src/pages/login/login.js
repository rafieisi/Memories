import {React, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import LoginStyle from './login.module.scss';
import axios from 'axios'

function Login() {
  
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
          
          let res = await axios.post("/authentication/login",newUser)
          console.log(res)

          navigate("/", { replace: true });
        }
  }

  const cancelForm = (event) => {
    event.preventDefault()
    navigate("/", { replace: true });
  }

  return (
    <div className={LoginStyle.card}>
      <h3>Register</h3>
        <Form  onSubmit={submitForm}>
          <div className={LoginStyle.cardForm}>
            <Form.Group className={LoginStyle.cardInput}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </Form.Group>

            <Form.Group className={LoginStyle.cardInput}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </Form.Group>

          </div>
          <div className={LoginStyle.cardButton}>
            <Button className={LoginStyle.cancelButton} onClick={cancelForm}>
              Cancel
            </Button>
            <Button className={LoginStyle.submitButton} type="submit">
              Login
            </Button>
          </div>
        </Form>
    </div>
  )
}

export default Login