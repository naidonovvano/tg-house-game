export const BACKGROUND_COLOR = 0xb1efe0;
export const FONT_FAMILY = '"Baloo 2", sans-serif';

export const HUD_FONT_SIZE = 50;
export const HIT_FONT_SIZE = 70;
export const GAME_OVER_FONT_SIZE = 50;
export const SCORE_FONT_SIZE = 62;

export const FONT_STROKE_COLOR = "#2E5A35";
export const FONT_STROKE_SIZE = 10;

export const GAME_TIME = 30;

export const BUG_SIZE = 150;
export const FOOD_SIZE = 250;

export const MOBILE_MAX_WIDTH = 450;
export const MOBILE_MAX_HEIGHT = 950;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getResponsiveSizes = (width, height) => {
  const isSmallScreen =
    width <= MOBILE_MAX_WIDTH && height <= MOBILE_MAX_HEIGHT;

  const scale = isSmallScreen
    ? clamp(
        Math.min(width / MOBILE_MAX_WIDTH, height / MOBILE_MAX_HEIGHT),
        0.6,
        1,
      )
    : 1;

  return {
    hudFontSize: Math.round(HUD_FONT_SIZE * scale),
    gameOverFontSize: Math.round(GAME_OVER_FONT_SIZE * scale),
    fontStrokeSize: Math.max(1, Math.round(FONT_STROKE_SIZE * scale)),
    bugSize: Math.round(BUG_SIZE * scale),
    foodSize: Math.round(FOOD_SIZE * scale),
  };
};

export const TURN_DURATION = 250;

export const BUG_SPEED_MIN = 1000;
export const BUG_SPEED_MAX = 1800;

export const BUG_COLORS = [0xff4d4d, 0x4da6ff, 0xb84dff];

export const FOOD_COLORS = [0xffe14d, 0xff9933, 0x55dd55];
