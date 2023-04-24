import React, { useEffect, useState } from "react";
import { Container, Button, Form, Col, Row, Table } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK, UPDATE_BOOK } from "../graphqlOperation/mutation";
import Utility from "../utlis";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Ctx } from "../context/Ctx";
import { GET_BOOK_BY_ID, GET_BOOK_BY_USER } from "../graphqlOperation/queries";

interface BookProps {
  _id: String;
  bookName: string;
  description: String;
  userId: string;
}

const CreateBook = () => {
  const FormInput: BookProps = {
    _id: "",
    bookName: "",
    description: "",
    userId: "",
  };

  const userInfo: any = useContext(Ctx);
  let userId = userInfo.user._id;
  const { id } = useParams();
  const updateFlag = id ? true : false;

  const navigate = useNavigate();

  const { control, resetField, handleSubmit, reset } = useForm({
    defaultValues: {
      bookName: "",
      description: "",
    },
  });

  // if(updateFlag){
  const {
    data: updateData,
    loading: updateLoading,
    error: updateError,
  } = useQuery(GET_BOOK_BY_ID, {
    variables: { bookId: id },
  });
  useEffect(() => {
    let defaults = {
      bookName: updateData?.book.bookName,
      description: updateData?.book.description,
    };
    reset(defaults);
  }, [updateData, reset]);

  const [
    updateOldBook,
    { data: modifiedData, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOK_BY_USER, variables: { userId } }],
  });

  const updateTheBook = (formPayload: any) => {
    let payload = {
      bookName: formPayload.bookName,
      description: formPayload.description,
    };
    const check = Utility.checkKeyValue(payload);
    if (check) {
      updateOldBook({
        variables: {
          input: payload,
          bookId: id,
        },
      });
      resetField("bookName");
      resetField("description");
    }
  };
  if (errorUpdate) {
    return <p><span data-testid="errorUpdated">{errorUpdate.message}</span></p>
  }

  //UPDATE_BOOK }

  const [
    createNewBook,
    { data: bookData, loading: bookLoading, error: bookError },
  ] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOK_BY_USER, variables: { userId } }],
  });

  const createNewUser = (formPayload: any) => {
    let payload = {
      bookName: formPayload.bookName,
      description: formPayload.description,
      userId: userInfo.user._id,
    };
    const check = Utility.checkKeyValue(payload);
    if (check) {
      createNewBook({
        variables: {
          bookInput: payload,
        },
      });
      resetField("bookName");
      resetField("description");
    }
  };
  if (bookError) {
    return <p><span data-testid="error">Error</span></p>
  }
  if (modifiedData || bookData) {
    navigate("/mybooks");
  }
  return (
    <>
      <div className="page-bgimage">
      {bookData && bookData?.createBook && (
        <span role="alert" style={{ color: "#900" }}>
              Book Created
      </span>
          
          )}
        <Container className="mt-2">
          <Row>
            {bookError && (
              <span  data-testid="error" className="d-block p-2 bg-danger text-white">
                {bookError.message}
              </span>
            )}
            <Col className="col-md-8-offset-md-2">
              <legend className="text-muted"> Create Book </legend>
              <Form className="w-50" data-testid="form"
                onSubmit={handleSubmit(
                  updateFlag ? updateTheBook : createNewUser
                )}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-muted">Book Name</Form.Label>
                  <Controller
                    control={control}
                    name="bookName"
                    render={({ field }) => (
                      <Form.Control placeholder="Enter Book Name" type="text" {...field} />
                    )}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicfirstname">
                  <Form.Label className="text-dark">Description</Form.Label>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <Form.Control  placeholder="Enter Description"
                      type="text" {...field} />
                    )}
                  />
                </Form.Group>
                <Button variant="primary" name="formButton" type="submit" className="text-dark">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreateBook;
