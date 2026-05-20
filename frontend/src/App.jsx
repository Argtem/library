import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Books from '@/pages/Books/';
import Authors from '@/pages/Authors';
import { books, authors } from '@/pages/Books/data';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Books books={books} authors={authors} />} />
          <Route path="authors" element={<Authors authors={authors} books={books} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;