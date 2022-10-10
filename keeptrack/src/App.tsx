import React from 'react';
import ProjectsPage from './projects/ProjectsPage';
import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';
import { Provider } from 'react-redux';
import { store } from './state';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
          </NavLink>
          <NavLink to="/projects" className="button rounded">
            Projects
          </NavLink>
        </header>
        <div className='container'>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/projects" element={<ProjectsPage />}></Route>
            <Route path="/projects/:id" element={<ProjectPage />}></Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
