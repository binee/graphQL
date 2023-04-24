import {render,screen, logRoles, cleanup} from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import Home from '../pages/Home'
import {MockedProvider} from "@apollo/client/testing";
import { GET_ALL_BOOKS } from "../graphqlOperation/queries";
import React  from 'react';
import { act } from 'react-dom/test-utils';
import wait from "waait";
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });
// test('Jest is working', ()=>{
//   const toggleInstance = Enzyme.shallow(<Home />);
//   const element = toggleInstance.find('Container Row Col');
//   expect(element.text()).toBe("The India Story");})

const mockData = {
    request : {
query:GET_ALL_BOOKS
    },
    result : {
        "data": {
          "books": [
            {
              "_id": "64369176171b146abed68d32",
              "bookName": "The India Story",
              "description": "Former RBI -  governor Bimal Jalan",
              "userId": [
                {
                  "_id": "64362fb0a885289ca43d40f7",
                  "username": "Bimal Jalal"
                }
              ]
            },
          ]
        }
}
};


const mockWithError = [
  {
    request: {
      query: GET_ALL_BOOKS,
    },
    "errors": [
      {
        "message": "Error",
        "extensions": {
          "code": "INTERNAL_SERVER_ERROR",
          
        }
      }
    ],
    error: new Error("Network Error"),
  },
];

describe('<Home /> TEST CASE', () => {

it("render Book Error",async () => {
  let wrapper : any;
  await act(async() =>{
      wrapper = Enzyme.mount(
          <MockedProvider addTypename={false} mocks={mockWithError}>
          <Home/>
          </MockedProvider>
        )
  });
  await act(() =>wait(0));
  wrapper.update();
  expect(wrapper).toBeTruthy();
  expect(wrapper.find('div p'));
  expect(wrapper.text()).toBe("Error ...");
})


it("renders Loading .....",() => {
  const { getByText } = render(
    <MockedProvider mocks={[mockData]} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  expect(getByText("Loading ...")).toBeInTheDocument();
});


it("render Book",async () => {
    let wrapper : any;
    await act(async() =>{
        wrapper = Enzyme.mount(
            <MockedProvider addTypename={false} mocks={[mockData]}>
            <Home/>
            </MockedProvider>
          )
    });
    await act(() =>wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    const element = wrapper.find('Container Row Col Card');
    expect(wrapper.exists('.bookname')).toBe(true)
    expect(wrapper.text()).toBe("The India StoryBy : Bimal Jalal");})

  });
