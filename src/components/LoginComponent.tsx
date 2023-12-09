import React, {useState} from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

interface LoginProps {
    onLogin : (info:{username:string; password:string}) => void;
}
const LoginComponent = ({onLogin}:LoginProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        onLogin({username, password})
    }

  return (
    <div>
        <InputGroup>
            <Form.Control
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder='Username'
            ></Form.Control>
             <Form.Control
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Password'
            ></Form.Control>
            <Button variant="success" onClick={handleLogin}>Đăng Nhập</Button>
        </InputGroup>
    </div>
  )
}

export default LoginComponent
