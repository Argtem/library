import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Books from '@/pages/Books';
import Authors from '@/pages/Authors';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Books />} />
          <Route path="authors" element={<Authors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;