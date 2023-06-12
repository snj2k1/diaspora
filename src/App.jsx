import styles from './App.module.css';
import { Header } from './layout/Header/Header';
import { Footer } from './layout/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { Search } from './pages/Search/Search';
import { Messenger } from './pages/Messenger/Messenger';
import { NotFound } from './pages/NotFound/NotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.js';

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route index element={<Home status={currentUser} />} />
          {currentUser ? (
            <>
              <Route path="profile/:id" element={<Profile />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="search" element={<Search />} />
              <Route path="messenger" element={<Messenger />} />
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
