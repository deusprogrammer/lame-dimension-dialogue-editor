import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import ScriptList from './routes/ScriptList';
import ScriptEditor from './routes/ScriptEditor';
import Login from './routes/Login';

import './App.css';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path={`/scripts`} exact element={<ScriptList />} />
                    <Route path={`/scripts/:id`} exact element={<ScriptEditor />} />
                    <Route path={`/login`} exact element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace={true} />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
