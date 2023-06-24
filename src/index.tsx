import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import 'shared/config/i18n';

import 'app/styles/index.scss';
import { StoreProvider } from 'app/providers/storeProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
);
