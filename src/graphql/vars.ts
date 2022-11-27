import { makeVar } from "@apollo/client";

export const tokenVar = makeVar<string | null>(localStorage.getItem("token"));

export default {};
