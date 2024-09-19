import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home/Home';
// import Service from './components/Service/Service';
import Activity from './components/Activity/Activity.jsx';
import NetworkLogs from './components/NetworkLogs/NetworkLogs.jsx';
import Profile from './components/Profile/Profile.jsx';
import Ports from './components/Ports/Ports.jsx';
import Alert from './components/Alert/Alert.jsx';
import Login from './components/Login/Login.jsx';
import Registration from './components/Register/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logout from './components/Logout/Logout.jsx';

const App = () => {
    return (
        <div >
        
        <BrowserRouter>
            <Routes>
                {/* <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />

              <Route element={<PrivateRoute />}> */}
          <Route path="/home" element={<Home />} />
              <Route path='/activity' element={<Activity/>}/>
              <Route path='/networklogs' element={<NetworkLogs/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/ports' element={<Ports/>}/>
              <Route path='/alert' element={<Alert/>}/>
              {/* <Route path='/logout' element={<Logout/>}/> */}
              
        {/* </Route> */}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
        

        </div>
    );
};

export default App;
