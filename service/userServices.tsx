//TODO: implement user services and API connection later.
interface User {
    name?: string;
    email: string;
    password: string;
    phoneNumber?: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

const tempusers: User[] = [
  {
    email: "test@test.com",
    password: "123456"
  }
]

//TODO: when the service part finished is the backend for this rewrite here...
export const loginRequest = (userCredentials: LoginCredentials) => {
    const foundUser = tempusers.find(user => user.email === userCredentials.email && user.password === userCredentials.password)
    if (foundUser) {
        return { status: 200, message: "Login successful" }
    } else {
        return {status: 401, message: "Login failed"}
    }
}

//TODO: when the service part finished is the backend for this rewrite here...
export const signupRequest = (userCredentials: User) => {
  const foundUser = tempusers.find(user => user.email === userCredentials.email)
  if(foundUser){
    return {status: 401, message: "User already exists"}
  }else{
    tempusers.push(userCredentials);
    return {status: 200, message: "Signup successful"}
  }
}
