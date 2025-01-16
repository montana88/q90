import { createReducer, on } from "@ngrx/store";
import { addUser } from "./auth.actions";

export interface UserInterface {
    id: string,
    username: string,
    level: string,
    previousLogin: string,
    token: string,
    tokenExpiry: string,
    refreshToken: string,
    refreshTokenExpiry: string,
    state: number
  }

const initialState = <UserInterface | null> null;

export const authReducer = createReducer(
    initialState,
    on(addUser, (state, action) => {
        return {
            ...state,
            ...action
        };
    })
)