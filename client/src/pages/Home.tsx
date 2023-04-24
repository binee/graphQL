import React, { memo, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../graphqlOperation/queries";
import { imageArray } from "./images";

interface BookProps {
  bookName: string;
  description: String;
  userId: string;
}
const Home = () => {
  let count = 0;
  let bookLength = 0;

  const { loading, data, error } = useQuery(GET_ALL_BOOKS);

  if (error) return <p>Error ...</p>;

  if (loading) return <p>Loading ...</p>;


  if (data && data.books) {
    bookLength = data.books.length;
  }
  return (
    <>
      <Container className="mt-2">
        <Row key={count++} md={2} xs={1} lg={3} className="g-3">
          {data?.books?.map((book: any) => (
            <Col key={count++}>
              <Card border="dark" text="dark">
                {error && <p className="error">Error ...</p>}
                <Card.Header>
                  <Card.Title className="bookname">{book.bookName}</Card.Title>
                </Card.Header>
                <Card.Img
                  style={{ objectFit: "none" }}
                  variant="top"
                  height="350px"
                  src={imageArray[count++]}
                />
                <Card.Footer className="text-muted">
                  By : {book?.userId[0]?.username}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
};

export default memo(Home);
