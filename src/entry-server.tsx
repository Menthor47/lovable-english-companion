
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { PassThrough } from 'node:stream';
import App from './App';
import './index.css';
import i18n from './i18n';

export { i18n };

export function render(url: string): Promise<{ html: string; helmetContext: Record<string, unknown> }> {
    return new Promise((resolve, reject) => {
        const helmetContext: Record<string, unknown> = {};
        const chunks: Buffer[] = [];

        const passThrough = new PassThrough();
        passThrough.on('data', (chunk: Buffer) => chunks.push(chunk));

        const { pipe } = renderToPipeableStream(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <App helmetContext={helmetContext} />
                </StaticRouter>
            </React.StrictMode>,
            {
                // onAllReady fires after ALL Suspense boundaries (including
                // React.lazy) have resolved — exactly what we need for
                // SEO prerendering.
                onAllReady() {
                    pipe(passThrough);
                    passThrough.on('end', () => {
                        const html = Buffer.concat(chunks).toString('utf-8');
                        resolve({ html, helmetContext });
                    });
                },
                onError(error: unknown) {
                    console.error('SSR render error:', error);
                    reject(error);
                },
            }
        );
    });
}
