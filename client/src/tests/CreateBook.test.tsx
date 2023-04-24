import {render,screen, logRoles, cleanup, fireEvent} from '@testing-library/react'
import CreateBook from '../pages/CreateBook'
import {MockedProvider} from "@apollo/client/testing";
import { CREATE_BOOK } from "../graphqlOperation/mutation";
import wait from "waait";
import { BrowserRouter, Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Enzyme from 'enzyme';


const variable = {
  "bookInput": {
    "bookName" :"WorkZone",
    "description": "",
    "userId": "643392db517a2863d1bd102e"
  }
}

const outputVariable = {
  "data": {
    "createBook": {
      "bookName": "WorkZone",
      "description": "sss",
      "userId": [
        {
          "_id": "643392db517a2863d1bd102e",
          "username": "Binita"
        }
      ]
    }
  }
}

const mockWithError = [
  {
    request: {
      query: CREATE_BOOK,
    },
    bookError: new Error("Network Error"),
  },
];
const mocks = [
  {
    request: {
      query: CREATE_BOOK,
      variables: variable,
    },
    result: { data: { outputVariable } },
  },
];


describe('Create Book TEST CASE', () => {
it("create Book with Error",async() => {
  await act(async() =>{ render(
  <MockedProvider mocks={mockWithError} addTypename={false}>
    <BrowserRouter><CreateBook /></BrowserRouter>
  </MockedProvider>,
);
});
await act(() =>wait(0));
await fireEvent.submit(screen.getByTestId('form'));
await wait(()=>expect(screen.getByText('Error')).toBeInTheDocument(),{timeout: 5000})
});

it("create .....",async() => {
  await act(async() =>{ render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <BrowserRouter><CreateBook /></BrowserRouter>
  </MockedProvider>,
);
});
await act(() =>wait(0));
const button = screen.getByRole('button', {name: /Submit/i});
//await fireEvent.submit(button);
await fireEvent.submit(screen.getByTestId('form'));
await wait(()=>expect(screen.getByText('My Books List')).toBeInTheDocument(),{timeout: 5000})
});
});

