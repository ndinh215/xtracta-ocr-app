import {render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Routing from './Routing';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();
const RoutingTest = () => (
    <QueryClientProvider client={queryClient}>
        <Routing/>
    </QueryClientProvider>
);

describe('Routing', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    it('default app rendering/navigating', async () => {
        render(<RoutingTest/>, {wrapper: BrowserRouter});

        // Verify page content for default route
        await waitFor(() => expect(screen.queryByTestId('file-upload')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId('image-preview')).toBeInTheDocument());
    });

    it('landing on a not found page', async () => {
        const notFoundRoute = '/notfound/route';

        // Use <MemoryRouter> when you want to manually control the history
        const {findByTestId, debug} = render(
            <MemoryRouter initialEntries={[notFoundRoute]}>
                <RoutingTest/>
            </MemoryRouter>,
        );

        jest.runAllTimers();

        // Verify navigation to "not found" route
        await waitFor(() => expect(screen.queryByTestId('not-found-message')).toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId('home-page-link')).toBeInTheDocument());
    });
});
