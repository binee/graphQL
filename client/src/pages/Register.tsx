import React, { useRef, useState } from "react";
import {
  Col,
  Button,
  Form,
  Card,
  Container,
  Row,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphqlOperation/mutation";
import Utility from "../utlis";
import {Link} from 'react-router-dom'

interface RegisterProps {
  input: {
    User: any;
  };
}
const Register: React.FC<RegisterProps> = () => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const registerNewUser = (data: any) => {
    let payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const check = Utility.checkKeyValue(payload);
    if (check) {
      registerUser({
        variables: {
          userInput: payload,
        },
      });
      resetField("username");
      resetField("email");
      resetField("password");
    }
  };
  return (
    <Container className="mt-2">
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} className="col-md-8-offset-md-2">
          {error && (
            <span className="d-block p-2 bg-danger text-white">
              {error.message}
            </span>
          )}
          {data && data?.registerUser && (
            <span className="d-block p-2 bg-info text-white">
              Successfully Register {data.registerUser.username}
            </span>
          )}

          <Card className="px-4 shadow rounded">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <Image fluid src="../public/shp.jpg" />

                <div className="mb-3">
                  <Form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit(registerNewUser)}
                  >
                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label>Name</Form.Label>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="username"
                        render={({ field }) => (
                          <Form.Control
                            isInvalid={errors.username}
                            type="text"
                            {...field}
                            placeholder="Enter Name"
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Name.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Controller
                        name="email"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            type="email"
                            {...field}
                            isInvalid={errors.email}
                            name="email"
                            placeholder="Enter email"
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            isInvalid={errors.password}
                            type="password"
                            placeholder="Password"
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Password.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="primary"
                      disabled={!isDirty && !isValid}
                      type="submit"
                      onClick={registerNewUser}
                    >
                      Submit
                    </Button>
                    
                  </Form>
                </div>
              </div>
              <Link to="/login"><p>Already have an account ?</p></Link> 
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
