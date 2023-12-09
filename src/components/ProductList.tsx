import React, { useState, useEffect, ChangeEvent } from "react";
import Product from "./interface/Product";
import {Button, Form, Stack, InputGroup, Table} from 'react-bootstrap';
import ProductForm from "./ProductForm";
import axios from "axios";
import LoginComponent from "./LoginComponent";
import RegisterComponents from "./RegisterComponents";
import User from "./interface/User";
const api = "http://localhost:3001/products";
const userAPI = "http://localhost:3001/user";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [selectedPrd, setSelectedPrd] = useState<Product | null>(null);
  const [kw, setKw] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [loginUSer, setLoginUser]= useState<User | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  useEffect(() => {
    axios.get(api)
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))
  },[])


  const handleLogin = async (info:User) => {
    axios.get(userAPI)
    .then(res => {
      const isCheck = res.data.some((user:User) => {
        if(user.username == info.username && user.password == info.password){
          return true;
        }
        return false;
      });
      console.log(isCheck);
      if(isCheck === true){
        setLoginUser(info);
        setShowLogin(false);
      }else{
        alert("Sai ten dang nhap hoac mat khau")
        return;
      }
    })
    .catch(err => console.log(err))
  }

  const handleRegister = (info:User) => {
    axios.post(userAPI, info)
    .then(res => {
      setLoginUser(res.data);
      setShowLogin(false);
    })
  }
  const handleLogOut = () => {
    setLoginUser(null);
  }

  const openForm = (product:Product | null = null) =>{
    setIsOpenForm(true);
    setSelectedPrd(product);
  }

  const closeForm = () => {
    setIsOpenForm(false);
    setSelectedPrd(null);
  }

  const addPrd = (newObj:Product) => {
    axios.post(api, newObj)
    .then((res) => {
      setProducts(prevs => [...prevs, res.data])
      alert(`Added Product ${res.data.name}`)
    })
    .catch(err => console.log(err))
  }

  const updatePrd= (updateObj:Product) => {
    openForm(updateObj);
    axios.put(`${api}/${updateObj.id}`, updateObj)
    .then((res) => {
      const newArr = products.map((product) => product.id === updateObj.id? res.data : product);
      setProducts(newArr);
    })
    .catch(err => console.log(err))
  }

  const deletePrd = (id:string) => {
    let isOk = confirm(`Ban co muon xoa khong ?`)
    if(isOk){
      axios.delete(`${api}/${id}`)
      .then(() => {
        const newArr = products.filter((product) => product.id !== id);
        setProducts(newArr);
        alert(`Deleted successfully`)
      })
      .catch(err => console.log(err))
    }
  }

  const handleSubmit = (product:Product) => {
    if(selectedPrd) updatePrd(product)
    else addPrd(product)
    closeForm();
  } 

  const handleChangeSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setKw(e.target.value);
  }

  const searchPrds = (kw:string) => {
    axios.get(api)
    .then(res => {
     if(kw==="") setProducts(res.data)
      else {
        const prdArr = products.filter(prd => prd.name.toLowerCase().includes(kw.toLowerCase()))
        setProducts(prdArr);
      }
    })
    .catch(err => console.log(err))
  }

  const openDrtails = (product:Product) => {
    setShowDetails(true)
    setSelectedPrd(product);
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedPrd(null);
  }
 
 
  return <div>
    <div className="container">
      <div className="row">
        <div className="col-12">
          {!loginUSer && showLogin && (
            <LoginComponent onLogin={handleLogin} />
          )}
           {loginUSer && (
            <h2>Xin Chào : {loginUSer?.username}</h2>
          )}
          {!loginUSer && showRegister && (
            <RegisterComponents onRegister={handleRegister} />
          )}
          <div className="col-12">
          {!loginUSer ? (
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" onClick={() => setShowLogin(true)}>
              Login
            </Button>
            <Button variant="info" onClick={() => setShowRegister(true)}>
              Register
            </Button>
          </Stack>
          ) : (
          <Button variant="danger" onClick={handleLogOut}>
            Logout
          </Button>
          )}
          </div>
        </div>
        <div className="col-12">
          <h2>Search</h2>
          <InputGroup>
            <Form.Control
              onChange={handleChangeSearch}
              value={kw}
              placeholder="Enter search keyword...."
            ></Form.Control>
            <Button variant="success" onClick={()=>searchPrds(kw)}>Search</Button>
          </InputGroup>
        </div>
        <div className="col-12">
          <h2>Form</h2>
          <Button variant="primary" onClick={()=> openForm()}>{isOpenForm? "Close":"Open"}</Button>
          {isOpenForm && (
            <ProductForm
              initProduct={selectedPrd}
              onSubmit={handleSubmit}
              closeForm={()=>closeForm()}
            ></ProductForm>
          )}
        </div>
        <div className="col-12">
          <h2>Product List</h2>
          <Table bordered striped hover>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Desc</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products && products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.desc || "Dang cap nhat"}</td>
                  <td>
                   {loginUSer ? (
                    <Stack direction="horizontal" gap={3}>
                      <Button variant="success" onClick={()=> updatePrd(product)}>Edit</Button>
                      <Button variant="danger" onClick={()=> product.id && deletePrd(product.id)}>Delete</Button>
                      <Button variant="secondary" onClick={()=> product.id && openDrtails(product)}>Details</Button>
                    </Stack>
                   ):<p>Vui lòng đăng nhập để thực hiện tác vụ</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {selectedPrd && (
          <div className="col-12">
            <h2>Product Details</h2>
            <p><strong>ID: </strong>{selectedPrd?.id}</p>
            <p><strong>Name: </strong>{selectedPrd?.name}</p>
            <p><strong>Price: </strong>{selectedPrd?.price}</p>
            <p><strong>Desc: </strong>{selectedPrd?.desc || "Dang cap nhat"}</p>
            <Button variant="secondary" onClick={closeDetails}>Close Details</Button>
          </div>
        )}
      </div>
    </div>

  </div>;
};

export default ProductList;
