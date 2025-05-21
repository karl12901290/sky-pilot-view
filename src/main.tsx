
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

document.title = "SkyLog Pro - Drone Flight Analytics";
// Update meta description
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
  metaDescription.setAttribute('content', 'Advanced flight log management and analytics for drone pilots');
}

createRoot(document.getElementById("root")!).render(<App />);
