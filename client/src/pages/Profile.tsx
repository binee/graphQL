import React from 'react'
import { Button, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import {useQuery} from '@apollo/client';
import { GET_ALL_USER } from '../graphqlOperation/queries';
import { useContext, useState } from "react";
import { Ctx } from "../context/Ctx";
import { Link, useNavigate } from "react-router-dom";


export default function Profile() {
    const { loading, error, data } = useQuery(GET_ALL_USER);
    if(data){
        console.log(data)
    }
    return (
        <>
         <Container className='p-4'>  
        <Row md={2} xs={1} lg={3} className="g-3">
        {data?.users.map((user : any) =>{
                return (
              
    <Card
    style={{ width: '24rem' }}
    className="mb-2 m-2 shadow-lg p-3 mb-5 bg-white rounded"
  >
    <Card.Header>About <b>{user.username}</b></Card.Header>  
    <Card.Body>  
      <Card.Title> </Card.Title>  
      <Card.Text>  
      Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs  
      </Card.Text>  
    </Card.Body>  
    {user?.books ?  
    <ListGroup variant="flush">
    <ListGroup.Item variant="success"><b>Book Published</b></ListGroup.Item>
      { user?.books.map((book : any) => (
        <>
      <ListGroup.Item variant="warning">{book.bookName}</ListGroup.Item>
      </>
      ))}
    </ListGroup>
    : null}
    <Card.Footer className="text-muted">Latest Book 2 days ago</Card.Footer>

  </Card>  
)})} 
</Row> 
 </Container>
 </>)

}