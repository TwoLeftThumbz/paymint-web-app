import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountScreen from "./screens/AccountScreen";
import ReportScreen from './screens/ReportScreen';
import GoalScreen from './screens/GoalScreen';
import {Route,Routes, Navigate, BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {validateToken} from "./features/userSlice";
import TransactionScreen from './screens/TransactionScreen';
import ProfileScreen from './screens/Profile';
import BudgetScreen from "./screens/BudgetScreen";




function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<AlreadyLoggedin><LandingScreen></LandingScreen></AlreadyLoggedin>} />
              <Route path='/dashboard' element={<RequireAuth><DashboardScreen/></RequireAuth>}/>
              <Route path='/test' element={<DashboardScreen/>}/>
              <Route path='/account' element={<RequireAuth><AccountScreen/></RequireAuth>}/>
              <Route path='/report' element={<ReportScreen/>}/>
              <Route path='/goal' element={<GoalScreen/>}/>
              <Route path='/transaction' element={<RequireAuth><TransactionScreen/></RequireAuth>}/>
              <Route path='/profile' element={<ProfileScreen/>}/>
              <Route path='/budget' element={<BudgetScreen/>}/>

          </Routes>
      </BrowserRouter>
   
     
     
  );
}

function RequireAuth({children}){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    if(token!==null){
        dispatch(validateToken(token))
    }
    return token===null ? <Navigate to="/"/> : children
}

function AlreadyLoggedin({children}){
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    if(token!==null){
        dispatch(validateToken(token))
    }
    return token!==null ? <Navigate to="/dashboard"/> : children
}

export default App;
