import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; 
import { useContext } from "react";
import { Ctx } from "../context/Ctx";

type LayoutProps = {
  state: [];
  children: React.ReactNode;
  // dispatch: React.Dispatch<ActionType>;
};

const Layout: React.FC<LayoutProps> = ({
  children,
}): JSX.Element => {
  const navigate = useNavigate()
  const userInfo : any = useContext(Ctx);  
  const userToken : string | null = localStorage.getItem('userToken');

  userInfo.token=userToken

  if(userToken){
  const decoded = jwt_decode(userToken);
  console.log(decoded)
  userInfo.user = decoded;
  }
  return (
    <>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Books Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            {userToken && 
            <>
             <Nav.Link as={Link} to="/mybooks">My Books</Nav.Link>
             <Nav.Link as={Link} to="/create">Add New Book</Nav.Link>
             </>
            }
          </Nav>
          <Nav>
          {userToken ?
        <><Nav.Link as={Link} to="/profile">Profile&nbsp; | </Nav.Link>
        <Nav.Link eventKey={2} to="/login" as={Link} onClick={()=>{
                 localStorage.removeItem("userToken")
                 navigate('/login')
               }}>&nbsp;Logout</Nav.Link>
        </> :
       <><Nav.Link as={Link} to="/login">Login&nbsp; | </Nav.Link>
        <Nav.Link eventKey={2} as={Link} to='/register'>&nbsp;Register</Nav.Link>    
        </>  
  }        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Container className="md-2">{children}</Container>
    </>
  );
};

export default Layout;
