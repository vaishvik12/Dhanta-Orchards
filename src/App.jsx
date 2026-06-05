import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import HarvestCalendarPage from './pages/HarvestCalendarPage';
import ProtectedRoute from './components/ProtectedRoute';
import MobileContactBar from './components/MobileContact';

function App() {
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let timeoutId;

    const finishLoading = () => {
      timeoutId = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => setIsBootLoading(false), 500);
      }, 900);
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener('load', finishLoading);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (isBootLoading) {
    return <LoadingScreen fading={isFadingOut} />;
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/harvest-calendar" element={<HarvestCalendarPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

export default App;
