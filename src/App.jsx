import React from 'react';
import { App } from 'antd';
import { HashRouter } from 'react-router-dom';
import RouteLoading from '@/routes/RouteLoading.jsx';
import { Routes } from '@/routes/RouteRules.jsx';
import RouteGuard from '@/routes/RouteGuard.jsx';

const MainApp = () => {
  return (
    <App>
      <HashRouter>
        <React.Suspense fallback={<RouteLoading />}>
          <RouteGuard>
            <Routes />
          </RouteGuard>
        </React.Suspense>
      </HashRouter>
    </App>
  );
};

export default MainApp;