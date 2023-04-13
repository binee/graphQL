import React, { createContext } from "react";

export default interface Users  {
    id: number;
    username : String;
    email: string
  }

export interface StateInterface{
    token : String | null,
    user: Users[]
  }


export const initialState = (): StateInterface => {
    return {
        user: [],
        token: null
      }
  }

export const Ctx: React.Context<StateInterface> = createContext(initialState())