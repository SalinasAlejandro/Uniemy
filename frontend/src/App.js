import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import Navigation from './components/Navigation';
import AppRouter from './routes/appRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navigation />
          <AppRouter />
        </AuthProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;