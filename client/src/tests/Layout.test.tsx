import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import Layout from '../components/Layout'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import wait from "waait";

describe('Test Case Layout Compoenent',() =>{
    jest.setTimeout(10000);
    test('Home Page NAvigation', async()=>{
        render(<Layout />, {wrapper: BrowserRouter})
        const user = userEvent.setup()
        expect(screen.getByText(/Books Store/i)).toBeInTheDocument()
        await user.click(screen.getByText(/About Us/i))
        await wait(()=>expect(screen.getByText(/Featured/i)).toBeInTheDocument(), 5000 )
        await user.click(screen.getByText(/Login/i))
        await wait(()=>expect(screen.getByText(/Login/i)).toBeInTheDocument(),{timeout: 5000})
        await user.click(screen.getByText(/Register/i))
        await wait(()=>expect(screen.getByText(/Already have an account/i)).toBeInTheDocument(),{timeout: 5000})
        // const registerPage = await screen.findByTestId('login-element');
        // expect(registerPage).toHaveTextContent('Already have an account')
    })

    it('Checking For Page Non Found',async () => {
        const badRoute = '/page/non/found'

        render(
            <MemoryRouter initialEntries={[badRoute]}>
              <Layout />
            </MemoryRouter>,
          ) 
          await wait(()=>expect(screen.getByText(/NotFound/i)).toBeInTheDocument(),{timeout: 5000})
    })
})