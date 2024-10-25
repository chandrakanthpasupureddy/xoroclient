import {Route, BrowserRouter,Routes, } from "react-router-dom"
import Home from './components/Home'
import NotFound from './components/NotFound'
import AddTask from './components/AddTask'
import './App.css';
const App = () => {
  return(
  <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/add-task" element={<AddTask/>} />
        <Route exact path = '/*'element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
  </>
)}

export default App;
