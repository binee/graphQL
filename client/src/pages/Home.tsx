import React, { useState } from 'react'
import { Container, Card, Button, Form, Col, Row, Table } from "react-bootstrap";
import {useQuery} from '@apollo/client';
import { GET_ALL_BOOKS } from '../graphqlOperation/queries';
import {imageArray} from './images';

interface BookProps {
    bookName:string,
    description:String,
    userId:string
}


const Home: React.FC<BookProps> = () => {
    let count = 0;
    let bookLength = 0

      const { loading, data }= useQuery(GET_ALL_BOOKS);

      if (loading) return <p>Loading ...</p>;
  
      if (data && data.books) {
         bookLength = data.books.length;
        console.log(data.books.length);
      }
  return (
    <>
      <Container className="mt-2">
      <Row md={2} xs={1} lg={3} className="g-3">
{ data?.books?.map((book : any) => (
 <Col key={book.id}>
   <Card 
   border="dark"
    text='dark'
>
   <Card.Header><Card.Title>{book.bookName}</Card.Title></Card.Header>
     <Card.Img
     style={{ objectFit: "none"}}
       variant="top"
       height="350px"
       src={imageArray[count++]}
     />
    
     {/* <Card.Body className="d-flex flex-column">
       <Card.Text className="d-flex justify-content-space-between align-items-baseline mb-4">
           <span></span>
           <span></span>
           </Card.Text>
      </Card.Body> */}
      <Card.Footer  className="text-muted">By : {book?.userId[0]?.username}</Card.Footer>

   </Card>
 </Col>
))}
</Row>

      
    </Container>
    </>
  )
}

export default Home
