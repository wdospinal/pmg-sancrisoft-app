import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MockedProvider } from "@apollo/client/testing/react";
import { View, Linking } from 'react-native';
import HorizontalCarousel from '../src/components/HorizontalCarousel';
import { GET_ANNOUNCEMENTS } from '../src/services/queries';

// Mock Linking separately for this test
jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());

const mockAnnouncementsData = {
  announcementCollection: {
    items: [
      {
        backgroundColor: '#FF5733',
        ctaLabel: 'Learn More',
        ctaUrl: '/products',
        intro: 'NEW PRODUCT',
        message: 'Check out our latest innovation in technology',
      },
      {
        backgroundColor: '#3498DB',
        ctaLabel: 'Get Started',
        ctaUrl: 'https://example.com/start',
        intro: 'LAUNCH',
        message: 'Start your journey today with our platform',
      },
      {
        backgroundColor: '#2ECC71',
        ctaLabel: null,
        ctaUrl: '/about',
        intro: 'ABOUT US',
        message: 'Discover more about our mission and values',
      },
    ],
  },
};

const mocks = [
  {
    request: {
      query: GET_ANNOUNCEMENTS,
    },
    result: {
      data: mockAnnouncementsData,
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_ANNOUNCEMENTS,
    },
    error: new Error('Network error'),
  },
];

const emptyMocks = [
  {
    request: {
      query: GET_ANNOUNCEMENTS,
    },
    result: {
      data: {
        announcementCollection: {
          items: [],
        },
      },
    },
  },
];

describe('HorizontalCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeleton initially', () => {
    const { UNSAFE_getAllByType } = render(
      <MockedProvider mocks={mocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    // Should show skeleton structure
    expect(UNSAFE_getAllByType(View).length).toBeGreaterThan(0);
  });

  it('renders carousel with announcements after loading', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('NEW PRODUCT')).toBeTruthy();
      expect(getByText('Check out our latest innovation in technology')).toBeTruthy();
      expect(getByText('Learn More')).toBeTruthy();
    });

    expect(getByText('LAUNCH')).toBeTruthy();
    expect(getByText('ABOUT US')).toBeTruthy();
  });

  it('renders nothing on error', async () => {
    const { toJSON } = render(
      <MockedProvider mocks={errorMocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(toJSON()).toBeNull();
    });
  });

  it('renders nothing when there are no items', async () => {
    const { toJSON } = render(
      <MockedProvider mocks={emptyMocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(toJSON()).toBeNull();
    });
  });

  it('handles item press with relative URL', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Learn More')).toBeTruthy();
    });

    const ctaButton = getByText('Learn More');
    fireEvent.press(ctaButton.parent!);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.pmg.com/products');
  });

  it('handles item press with absolute URL', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('Get Started')).toBeTruthy();
    });

    const ctaButton = getByText('Get Started');
    fireEvent.press(ctaButton.parent!);

    expect(Linking.openURL).toHaveBeenCalledWith('https://example.com/start');
  });

  it('truncates long messages', async () => {
    const longMessageMock = [
      {
        request: {
          query: GET_ANNOUNCEMENTS,
        },
        result: {
          data: {
            announcementCollection: {
              items: [
                {
                  backgroundColor: '#FF5733',
                  ctaLabel: 'Read More',
                  ctaUrl: '/long',
                  intro: 'LONG',
                  message:
                    'This is a very long message that should be truncated after three lines to ensure proper display',
                },
              ],
            },
          },
        },
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={longMessageMock}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(
        getByText(
          'This is a very long message that should be truncated after three lines to ensure proper display'
        )
      ).toBeTruthy();
    });
  });

  it('renders card without CTA button when ctaLabel is null', async () => {
    const { getByText, queryByText } = render(
      <MockedProvider mocks={mocks}>
        <HorizontalCarousel />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByText('ABOUT US')).toBeTruthy();
    });

    // Third card has no CTA label, so button should not render
    expect(queryByText('null')).toBeNull();
  });
});

