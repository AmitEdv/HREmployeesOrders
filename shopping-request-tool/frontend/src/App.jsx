import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HRPage from './pages/HrPage';


function App() {
  return (
   <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hr" element={<HRPage />} />
    </Routes>
  );
}

export default App;
