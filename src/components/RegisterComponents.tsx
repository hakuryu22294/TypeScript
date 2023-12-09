import React, {useState} from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'

interface RegisterProps {
    onRegister: (userData:{
        username:string;
        password:string;
    }) => void;
}

const RegisterComponents = ({onRegister}:RegisterProps) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleRegister = () => {
        onRegister({username, password})
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
                <Button variant="success" onClick={handleRegister}>Đăng Ký</Button>
            </InputGroup>
        </div>
      )
}

export default RegisterComponents
