import { getByText, fireEvent, render, screen, waitFor, getByTestId } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import Login from '../pages/Login'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { LOGIN_USER } from "../graphqlOperation/mutation";
import wait from "waait";
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';

const variable = {
   "userSignin": {
      "email": "binita@book.com",
      "password": "123456789"
   }
}

const outputVariable = {
   "data": {
      "loginUser": {
         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2MjA0NzJiOTllOTU1OTdkYjk5YTgiLCJ1c2VybmFtZSI6IkJpbml0YSIsImVtYWlsIjoiYmluaXRhQGJvb2suY29tIiwiaWF0IjoxNjgyMzIzMTc1fQ.0BsnsY5JWI6_UofdG4Z6CmKed97O4TJv_OLZZFKyWYk"
      }
   }
}
const mocksLogin = [
   {
      request: {
         query: LOGIN_USER,
         variable
      },
      result: { data: { outputVariable } },
   },
];


describe("Testcase for Login", () => {
   /**
    * check if its Login Page
    */
   it('check if its Login Page', async () => {
      await act(async () => {
         render(
            <MockedProvider mocks={mocksLogin} addTypename={false}>
               <BrowserRouter><Login /></BrowserRouter>
            </MockedProvider>,
         );
      });
      await wait(() => expect(screen.getByText('Login')).toBeInTheDocument());
   })

   test("check for 2 inputs and submitButton", async () => {
      await act(async () => {
         render(
            <MockedProvider mocks={mocksLogin} addTypename={false}>
               <BrowserRouter><Login /></BrowserRouter>
            </MockedProvider>,
         );
      });
      await wait(() => expect(screen.getByText(/email/i)).toBeInTheDocument());
      await wait(() => expect(screen.getByText(/password/i)).toBeInTheDocument());
      await wait(() => expect(screen.getByText(/Submit/i)).toBeInTheDocument());
   })

   it("check the form Errors", async () => {
      await act(async () => {
         render(
            <MockedProvider mocks={mocksLogin} addTypename={false}>
               <BrowserRouter><Login /></BrowserRouter>
            </MockedProvider>,
         );
      });
      const user = userEvent.setup()
      await act(async () => {
         fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: '' },
         })
         expect(screen.getByText("Please Enter Email.")).toBeInTheDocument();

      })

      await act(async () => {
         fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: '' },
         })
         expect(screen.getByText("Please Enter Password.")).toBeInTheDocument();

      })
   })
})

describe('After successful Login and add to localStorage', () => {

   it('successful Login', async () => {
      //const loginUser = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ2MjA0NzJiOTllOTU1OTdkYjk5YTgiLCJ1c2VybmFtZSI6IkJpbml0YSIsImVtYWlsIjoiYmluaXRhQGJvb2suY29tIiwiaWF0IjoxNjgyMzIzMTc1fQ.0BsnsY5JWI6_UofdG4Z6CmKed97O4TJv_OLZZFKyWYk" }
      // jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      //    return Promise.resolve({
      //       json: () => Promise.resolve(userToken),
      //    })
      // });

   await act(async () => {
      render(
         <MockedProvider mocks={mocksLogin} addTypename={false}>
            <BrowserRouter><Login /></BrowserRouter>
         </MockedProvider>,
      );
   });
   await act(async () => {
      fireEvent.change(screen.getByLabelText(/email/i), {
         target: { value: 'binita@book.com' }
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
         target: { value: '123456789' }
      });
   })
   await fireEvent.submit(screen.getByTestId('form'));
  // await wait(()=>expect(window.localStorage.getItem('token')).toEqual(loginUser.token),{timeout: 5000})
   await wait(() => expect(screen.getByText(/book store/i)).toBeInTheDocument(), {timeout: 5000})
})
})