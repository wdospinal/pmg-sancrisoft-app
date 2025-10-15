export const VideoView = 'VideoView';

export const useVideoPlayer = jest.fn(() => ({
  play: jest.fn(),
  pause: jest.fn(),
  loop: true,
  muted: true,
}));

