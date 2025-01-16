import { createAction, props } from "@ngrx/store";
import { UserInterface } from "./auth.reducer";

export const addUser = createAction(
    '[auth] User',
    props<UserInterface>()
);