import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { FeedbackContextProvider } from './contexts/feedback-context';

test('renders github link', () => {
  const { getByText } = render(
    <FeedbackContextProvider>
      <App />
    </FeedbackContextProvider>
  );
  const linkElement = getByText(/github/i);
  expect(linkElement).toBeInTheDocument();
});
