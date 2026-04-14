import { json } from "node:stream/consumers";

export async function signInService(request) {
    const user = {
        email: request.email,
        password: request.password
    };
    const response = await fetch(`${process.env.AUTH_API_URL}/auths/login`,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user),
    })
    const loggedInUser = await response.json();
    return loggedInUser;
}
export async function signUpService(request){
    const user = {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        password: request.password,
        birthDate: request.birthDate
    }
    const res = await fetch(`${process.env.AUTH_API_URL}/auths/register`,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(user)
    })
   const data = await res.json();
    return data;
}