
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { CareerPage } from './pages/CareerPage.tsx';
import { BusinessPage } from './pages/BusinessPage.tsx';
import { ProductivityPage } from './pages/ProductivityPage.tsx';
import { EducationPage } from './pages/EducationPage.tsx';
import { CreativityPage } from './pages/CreativityPage.tsx';
import { FinancePage } from './pages/FinancePage.tsx';
import { CodingPage } from './pages/CodingPage.tsx';
import { LifestylePage } from './pages/LifestylePage.tsx';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/productivity" element={<ProductivityPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/creativity" element={<CreativityPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/coding" element={<CodingPage />} />
        <Route path="/lifestyle" element={<LifestylePage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
