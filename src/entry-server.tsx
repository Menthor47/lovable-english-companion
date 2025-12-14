
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import './index.css';
import i18n from './i18n';

export { i18n };

export function render(url: string) {
    const helmetContext = {};

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <App helmetContext={helmetContext} />
            </StaticRouter>
        </React.StrictMode>
    );

    return { html, helmetContext };
}
