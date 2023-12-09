import React, { useState, useEffect } from "react";
import Product from "./interface/Product";
import {Button, Form, Stack} from 'react-bootstrap';

type Props = {
  onSubmit:(product:Product) => void;
  initProduct :Product | null;
  closeForm:() => void;
}


const ProductForm = ({onSubmit, initProduct, closeForm}:Props) => {
  const [product, setProduct] = useState<Product>(
    initProduct || {
      name:"",
      price:0,
      desc:""
    }
  )

  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setProduct(prevs => ({...prevs, [name]:value}))
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(product.name.length === 0){
      alert("Ten san pham khong duoc de trong")
      return;
    }
    if(product.price <=0){
      alert("Gia san pham phai lon hon 0")
      return;
    }
    if(product) onSubmit(product);
  }

  useEffect(() => {
    if(initProduct) setProduct(initProduct);
  },[initProduct])


  return <div>
    <h2>Product Form</h2>
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChangeInput}
          placeholder="Input product name..."
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChangeInput}
          placeholder="Input product price..."
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Desc</Form.Label>
        <Form.Control
          type="text"
          name="desc"
          value={product.desc}
          onChange={handleChangeInput}
          placeholder="Input product desc..."
        ></Form.Control>
      </Form.Group>
      <Stack direction="horizontal" gap={3}>
        <Button type="submit" variant="primary">{initProduct? "Update" : "Add"}</Button>
        <Button onClick={closeForm} variant="primary">Cancel</Button>
      </Stack>
    </Form>
  </div>;
};

export default ProductForm;
