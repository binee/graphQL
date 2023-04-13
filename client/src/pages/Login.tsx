import React, { useRef, useState } from "react";
import {
  Col,
  Button,
  Form,
  Card,
  Container,
  Row,
  Spinner 
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
type LoginProps = {
    email : 'string',
    password : 'string'
}
import { useMutation } from "@apollo/client";
import Utility from "../utlis";
import { LOGIN_USER } from "../graphqlOperation/mutation";

const Login:React.FC<LoginProps> = () => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors ,isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
  });
const navigate = useNavigate();
  const [login , {data, loading, error}] = useMutation(LOGIN_USER, {
    onCompleted(data){
      localStorage.setItem('userToken' , data?.loginUser.token )
        navigate('/')
    }
})
  const loginUser = (formPayload:any) => {
    let payload = {
       email: formPayload.email,
      password: formPayload.password,
    };
    const check = Utility.checkKeyValue(payload);
    if(check){
      login({
        variables:{
          userSignin: payload
        }
      })
    }
    if(error){
      console.log(error.message)
      resetField("email");
      resetField("password");
    }
  }
  return (
    <>
        <div className="homepage-bgimage">

    <Container >
    <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} className="col-md-8-offset-md-2">
      
          <Card className="px-4 shadow rounded">
            <Card.Body>
            {error && (
            <span className="d-block p-2 bg-danger text-white">
              {error.message}
            </span>
          )}
          {data && data?.loginUser && (
            <span className="d-block p-2 bg-info text-white">
              Successfully Register {data.loginUser.username}
            </span>
          )}
              <div className="mb-3 mt-md-4">
               <h2>Login</h2>
                <div className="mb-3">
                  <Form noValidate onSubmit={handleSubmit(loginUser)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Controller
                        name="email"
                        rules={{ required: true }}
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                          type="email" 
                          placeholder="Enter email"
                            {...field}
                            isInvalid={errors.email}
                          
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicname">
                      <Form.Label>Password</Form.Label>
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <Form.Control
                            isInvalid={errors.password}
                            type="password"
                            {...field}
                            placeholder="Enter Password"
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Password.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" disabled={!isDirty && !isValid} type="submit">
                Submit
              </Button>
                  </Form>
                </div>
              </div>
              <Link to="/register"><p>Dont't have account ?</p></Link> 

            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
      </>
  )
}

export default Login
