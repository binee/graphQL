
import { Container, Col, Row, Table, Button, Modal } from "react-bootstrap";
import {useMutation, useQuery} from '@apollo/client';
import { GET_BOOK_BY_USER } from '../graphqlOperation/queries';
import { useContext, useState } from "react";
import { Ctx } from "../context/Ctx";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_BOOK } from "../graphqlOperation/mutation";

interface BookProps {
    bookName:string,
    description:String,
    userId:string
}

const MyBooks: React.FC<BookProps> = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<boolean>(null);
  const [show, setShow] = useState(false);
  const userInfo : any = useContext(Ctx);  
    let count = 1;
    const  userId = userInfo.user._id;
    let bookLength = 0;
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { loading, error, data } = useQuery(GET_BOOK_BY_USER, {
      variables: { userId },
    });
  
      if (data && data.userBook) {
         bookLength = data.userBook.length;
        console.log(data.userBook.length);
      }


    //   const [login , {data, loading, error}] = useMutation(LOGIN_USER, {
    //     onCompleted(data){
    //       localStorage.setItem('userToken' , data?.loginUser.token )
    //         navigate('/profile')
    //     }
    // })
      const [deleteUser, {loading: deleteLoading, error: deleteError}]= useMutation(DELETE_BOOK,{
             refetchQueries: [{ query: GET_BOOK_BY_USER, variables: { userId } }],
        });
        

      const deleteTheBook = () => {
        console.log('sdfasf', itemToDeleteId)
        deleteUser({
          variables: {
            bookId: itemToDeleteId,
          },
        });
        setShow(false); 
      }
      if(deleteError){
        console.log(deleteError.message)
      }
      
      const hideDeleteModal = () => {
        setShow(false); 
        setItemToDeleteId(null);
      };
    
      const showDeleteModal = (id : any) => {
        setShow(true); 
       setItemToDeleteId(id);
        
      };
    
  return (
    <>
      <Container className="mt-2">
      <Row className="mt-5">
        <legend>My Books List</legend>
        <Col>
        {(loading) &&  <p>Loading ...</p>}

        <Table variant="dark"  striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th colSpan={2}>Edit | Delete</th>
        </tr>
      </thead>
      <tbody>
        {bookLength<= 0 ? <tr><td style={{textAlign: 'center'}} colSpan={4}> No Records Found</td></tr>: 
        data?.userBook.map((book : any) =>{
            return(<tr key={count}>
                <td>{count++}</td>
                <td>{book.bookName}</td>
                <td>{book.description}</td>
                <td colSpan={2}> <Button
                    variant="primary"
                    type="button"
                    name="edit"
                    className="m-auto"
                    onClick={() => navigate(`/edit/${book._id}`)}
                  >Edit</Button>&nbsp;
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => showDeleteModal(book._id)}
                  >
                    Delete
                  </Button>
                   </td>
              </tr>)
        })}
        
        
      </tbody>
    </Table>        </Col>
      </Row>
    </Container>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          onClick={deleteTheBook}>
            Delete
          </Button>
          <Button variant="primary" onClick={hideDeleteModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyBooks
