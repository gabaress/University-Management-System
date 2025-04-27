import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Layouts/Navbar';
import Homepage from './Layouts/Homepage';
import AllDegrees from './Layouts/AllDegrees';
import AllCohorts from './Layouts/AllCohorts';
import AllModules from './Layouts/AllModules';
import SingleDegree from './Layouts/SingleDegree';
import SingleCohort from './Layouts/SingleCohort';
import SingleModule from './Layouts/SingleModule';
import CreateDegree from './Layouts/CreateDegree';
import CreateModule from './Layouts/CreateModule';
import CreateCohort from './Layouts/CreateCohort';
import SingleStudent from './Layouts/SingleStudent';
import CreateStudent from './Layouts/CreateStudent';
import EditGrade from './Layouts/EditGrade';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/degrees" element={<AllDegrees />} />
        <Route path="/cohorts" element={<AllCohorts />} />
        <Route path="/modules" element={<AllModules />} />
        <Route path="/degree/:id" element={<SingleDegree />} />
        <Route path="/cohort/:id" element={<SingleCohort />} />
        <Route path="/module/:id" element={<SingleModule />} />
        <Route path="/students/:id" element={<SingleStudent />} />
        <Route path="/students/:id/edit" element={<EditGrade />} />
        <Route path="/create_degree" element={CreateDegree()} />
        <Route path="/create_module" element={CreateModule()} />
        <Route path="/create_cohort" element={CreateCohort()} />
        <Route path="/create_student" element={CreateStudent()} />

      </Routes>
    </Router>
  );
}

export default App;
