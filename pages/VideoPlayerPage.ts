import type { Locator, Page, Response } from '@playwright/test';

export class VideoPlayerPage {
  readonly player: Locator;
  readonly facade: Locator;
  readonly embed: Locator;
  readonly video: Locator;
  readonly iframes: Locator;

  constructor(readonly page: Page) {
    // Shared player inside the video-detail block (overlay /{lang}/library/video/{id}); no standalone DSR-557 video-player block on DEV.
    this.player = page.getByTestId('movie-detail-player');
    this.facade = page.getByTestId('movie-detail-player-facade');
    this.embed = page.getByTestId('movie-detail-player-embed');
    this.video = page.getByTestId('movie-detail-player-video'); // DAM movie
    this.iframes = page.locator('iframe');
  }

  goto(path: string): Promise<Response | null> {
    return this.page.goto(path);
  }

  iframeSrcs(): Promise<string[]> {
    return this.iframes.evaluateAll(frames => frames.map(f => (f as HTMLIFrameElement).src || f.getAttribute('data-src') || ''));
  }

  videosPaused(): Promise<boolean[]> {
    return this.page.locator('video').evaluateAll(videos => videos.map(v => (v as HTMLVideoElement).paused));
  }
}
