import './App.css';
import { ReactDOM } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import SecondPage from './Layouts/SecondPage';
import Genre from './Layouts/Genre';
import Review from './Layouts/Review';
import Book from './Layouts/Book';
import FourOhFour from './Layouts/FourOhFour';

// WHEN creating routes, make sure to place them 
// BEFORE the FourOhFour page
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />} >
          <Route index element={<HomePage />} />
          <Route path="secondpage" element={<SecondPage />}/>
          <Route path="genre" element={<Genre />} />
          <Route path="review" element={<Review />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
