import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoutes from './Components/ProtectedRoutes';
import PublicRoute from './Components/PublicRoute';
import CreatePoll from './Components/CreatePoll';
import Voting from './Components/Voting';
import Results from './Components/Results';
import DeletePoll from './Components/DeletePoll';


function App() 
{

  const {loading} = useSelector(state => state.alerts);
  return (
    <div>
      <BrowserRouter>
      {loading ? (

         <Spinner/> 
      ) : (
        <Routes>
          <Route path='/' element ={
          <ProtectedRoutes>
            <HomePage/>
          </ProtectedRoutes>
        }
        />
          <Route path='/create-poll' element ={
          <ProtectedRoutes>
            <CreatePoll/>
          </ProtectedRoutes>
        }
        />
        <Route path='/voting' element={
            <ProtectedRoutes>
              <Voting/>
            </ProtectedRoutes>} 
        />
        <Route path='/results' element={
            <ProtectedRoutes>
              <Results/>
            </ProtectedRoutes>} 
        />
        <Route path='/deletePoll' element={
        <ProtectedRoutes>
          <DeletePoll />
        </ProtectedRoutes>} 
        />



          <Route path='/login' element={
          <PublicRoute>
            <Login/>
          </PublicRoute>}/>
          
          <Route path='/register' element={
          <PublicRoute>
            <Register/>
          </PublicRoute>} />

          
        </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
