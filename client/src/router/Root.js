import HomePage from "../HomePage/HomePage";
import Main from "../layout/Main";
const { createBrowserRouter } = require("react-router-dom");


export const router = createBrowserRouter([
    {
   
        path: '/',
        element: <Main></Main>,
        children: [

   {
    path: '/',
    element: <HomePage/> 
   } 


]}

])
