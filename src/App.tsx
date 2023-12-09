import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
// import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="container">
      <>
        <ProductList></ProductList>
      </>
    </div>
  );
}

export default App;
