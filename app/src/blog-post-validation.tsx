import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BlogPostValidationPage } from './BlogPostValidationPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogPostValidationPage />
  </StrictMode>,
);
