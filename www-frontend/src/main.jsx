import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Pagination } from '@mui/material';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const BeerReviewsWithPagination = ({ beerId }) => {
  const [page, setPage] = useState(1);

  // Modifica el estado y las llamadas API para soportar paginación.
  return (
    <div>
      {/* Renderizado de las evaluaciones */}
      <Pagination count={totalPages} page={page} onChange={(e, newPage) => setPage(newPage)} />
    </div>
  );
};