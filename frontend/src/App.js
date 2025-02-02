import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Books from './pages/Books';
import Book from './pages/Book';
import Authors from './pages/Authors';
import Author from './pages/Author';
import Publishers from './pages/Publishers';
import Publisher from './pages/Publisher';
import NewBook from './pages/NewBook';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<Layout />}>
        <Route index element={<Books />} />
        <Route path='new-book' element={<NewBook />} />
        <Route path='books' element={<Books />} />
        <Route path='books/:bookId' element={<Book />} />
        <Route path='authors' element={<Authors />} />
        <Route path='authors/:authorId' element={<Author />} />
        <Route path='publishers' element={<Publishers />} />
        <Route path='publishers/:publisherId' element={<Publisher />} /> 
      </Route>
    </Routes>
  );
}

export default App;
