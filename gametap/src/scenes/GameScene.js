import Phaser from "phaser";

import {
  FONT_FAMILY,
  HUD_FONT_SIZE,
  HIT_FONT_SIZE,
  GAME_OVER_FONT_SIZE,
  SCORE_FONT_SIZE,
  FONT_STROKE_COLOR,
  FONT_STROKE_SIZE,
  GAME_TIME,
  BUG_SIZE,
  FOOD_SIZE,
  BUG_SPEED_MIN,
  BUG_SPEED_MAX,
  BUG_COLORS,
  FOOD_COLORS,
} from "../config/gameConfig";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.hasShownStartScreen = false;
    this.isGameStarted = false;
    this.isGameOver = false;
    this.score = 0;
    this.timeLeft = GAME_TIME;
    this.activeBug = null;
  }
  preload() {
  this.load.image("grass", "/gametap/assets/images/background.png");

  this.load.image(
    "carabid",
    "/gametap/assets/images/bugs/beetle1_carabid.png",
  );

  this.load.image(
    "rosechafer",
    "/gametap/assets/images/bugs/beetle2_rosechafer.png",
  );

  this.load.image(
    "longhorn",
    "/gametap/assets/images/bugs/beetle3_longhorn.png",
  );

  this.load.image(
    "ladybug",
    "/gametap/assets/images/bugs/beetle4_ladybug.png",
  );

  this.load.image(
    "chicken",
    "/gametap/assets/images/food/food1_chicken.png",
  );

  this.load.image(
    "beef",
    "/gametap/assets/images/food/food2_beef.png",
  );

  this.load.image(
    "fish",
    "/gametap/assets/images/food/food3_fish.png",
  );
}

  create() {
    this.score = 0;
    this.timeLeft = GAME_TIME;
    this.isGameStarted = false;
    this.isGameOver = false;

    const width = this.scale.width;
    const height = this.scale.height;

    this.add
      .image(0, 0, "grass")
      .setOrigin(0)
      .setDisplaySize(width, height)
      .setScrollFactor(0);

    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: `${HUD_FONT_SIZE}px`,
      color: "#ffffff",
      fontFamily: FONT_FAMILY,
      stroke: FONT_STROKE_COLOR,
      strokeThickness: FONT_STROKE_SIZE,
    });

    this.timerText = this.add.text(20, 80, `Time: ${GAME_TIME}`, {
      fontSize: `${HUD_FONT_SIZE}px`,
      color: "#ffffff",
      fontFamily: FONT_FAMILY,
      stroke: FONT_STROKE_COLOR,
      strokeThickness: FONT_STROKE_SIZE,
    });

    if (this.hasShownStartScreen) {
      this.startGame();
    } else {
      this.showStartScreen();
    }
  }

  spawnBug() {
    if (this.timeLeft <= 0 || this.isGameOver || !this.isGameStarted) return;

    const width = this.scale.width;
    const height = this.scale.height;

    const bugTextures = ["carabid", "rosechafer", "longhorn", "ladybug"];
    const bugTexture = Phaser.Utils.Array.GetRandom(bugTextures);

    const startPoint = this.getRandomOutsidePoint();

    const bug = this.add
      .image(startPoint.x, startPoint.y, bugTexture)
      .setOrigin(0.5)
      .setDisplaySize(BUG_SIZE, BUG_SIZE);

    bug.setInteractive({ useHandCursor: true });

    bug.on("pointerdown", () => {
      this.showTapEffect(bug.x, bug.y, 1);
      this.score += 1;
      this.scoreText.setText("Score: " + this.score);
      bug.destroy();

      this.time.delayedCall(400, () => {
        this.spawnBug();
      });
    });

    this.activeBug = bug;

    const points = [];

    for (let i = 0; i < 4; i++) {
      points.push({
        x: Phaser.Math.Between(40, width - 40),
        y: Phaser.Math.Between(100, height - 60),
      });
    }

    points.push(this.getRandomOutsidePoint());

    this.moveBugByPoints(bug, points, 0);
  }

  moveBugByPoints(bug, points, index) {
  if (!bug.active || index >= points.length) {
    if (bug.active) {
      bug.destroy();
    }

    this.time.delayedCall(500, () => {
      this.spawnBug();
    });

    return;
  }

  const nextPoint = points[index];

  const angle = Phaser.Math.Angle.Between(
    bug.x,
    bug.y,
    nextPoint.x,
    nextPoint.y,
  );

  // PNG жука изначально смотрит головой вверх.
  // Добавляем 90°, чтобы голова всегда была направлена по движению.
  bug.setRotation(angle + Math.PI / 2);

  this.tweens.add({
    targets: bug,
    x: nextPoint.x,
    y: nextPoint.y,

    // Увеличиваем duration в 2 раза → скорость уменьшается в 2 раза.
    duration: Phaser.Math.Between(
      BUG_SPEED_MIN * 2,
      BUG_SPEED_MAX * 2,
    ),

    ease: "Sine.easeInOut",

    onComplete: () => {
      this.moveBugByPoints(
        bug,
        points,
        index + 1,
      );
    },
  });
}

  getRandomOutsidePoint() {
    const width = this.scale.width;
    const height = this.scale.height;
    const side = Phaser.Math.Between(0, 3);

    if (side === 0) {
      return { x: -80, y: Phaser.Math.Between(80, height - 80) };
    }

    if (side === 1) {
      return { x: width + 80, y: Phaser.Math.Between(80, height - 80) };
    }

    if (side === 2) {
      return { x: Phaser.Math.Between(50, width - 50), y: -80 };
    }

    return { x: Phaser.Math.Between(50, width - 50), y: height + 80 };
  }

  spawnFood() {
    if (this.timeLeft <= 0 || this.isGameOver || !this.isGameStarted) return;

    const width = this.scale.width;
    const height = this.scale.height;

    const foodTextures = ["chicken", "beef", "fish"];
    const foodTexture =
    Phaser.Utils.Array.GetRandom(foodTextures);

    const food = this.add
    .image(
      Phaser.Math.Between(50, width - 50),
      Phaser.Math.Between(100, height - 80),
      foodTexture
    )
    .setOrigin(0.5)
    .setDisplaySize(FOOD_SIZE, FOOD_SIZE);

    food.setInteractive({ useHandCursor: true });

    food.on("pointerdown", () => {
      this.showTapEffect(food.x, food.y, 2);
      this.score += 2;
      this.scoreText.setText("Score: " + this.score);
      food.destroy();
    });

    this.time.delayedCall(2500, () => {
      if (food.active) food.destroy();
    });
  }
  showTapEffect(x, y, points) {
    const color = Phaser.Utils.Array.GetRandom(
      points === 1 ? BUG_COLORS : FOOD_COLORS,
    );

    const textColor = "#" + color.toString(16).padStart(6, "0");

    // +1 / +2
    const text = this.add
      .text(x, y - 20, `+${points}`, {
        fontSize: `${HIT_FONT_SIZE}px`,
        fontFamily: FONT_FAMILY,
        color: textColor,
        fontStyle: "bold",
        stroke: "#000",
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    text.setDepth(1000);

    this.tweens.add({
      targets: text,
      y: y - 75,
      alpha: 0,
      scale: 1.5,
      duration: 600,
      ease: "Cubic.easeOut",
      onComplete: () => text.destroy(),
    });

    // лучи
    for (let i = 0; i < 14; i++) {
      const angle = ((Math.PI * 2) / 14) * i;
      const length = Phaser.Math.Between(35, 75);

      const ray = this.add.rectangle(x, y, length, 4, color, 0.9);
      ray.setOrigin(0, 0.5);
      ray.setRotation(angle);
      ray.setDepth(999);

      this.tweens.add({
        targets: ray,
        alpha: 0,
        scaleX: 1.6,
        scaleY: 0.2,
        duration: 450,
        ease: "Cubic.easeOut",
        onComplete: () => ray.destroy(),
      });
    }

    // частицы
    for (let i = 0; i < 24; i++) {
      const particle = this.add.circle(
        x,
        y,
        Phaser.Math.Between(4, 8),
        color,
        1,
      );
      particle.setDepth(999);

      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const distance = Phaser.Math.Between(45, 110);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0,
        duration: Phaser.Math.Between(450, 700),
        ease: "Cubic.easeOut",
        onComplete: () => particle.destroy(),
      });
    }
  }

  showStartScreen() {
    const width = this.scale.width;
    const height = this.scale.height;

    const overlay = this.add
      .rectangle(width / 2, height / 2, width, height, 0x000000, 0.65)
      .setDepth(2000);

    const title = this.add
      .text(width / 2, height / 2 - 75, "<TAP TO DEBUG^.^>", {
        fontSize: `${GAME_OVER_FONT_SIZE}px`,
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        stroke: FONT_STROKE_COLOR,
        strokeThickness: FONT_STROKE_SIZE,
      })
      .setOrigin(0.5)
      .setDepth(2001);

    const startText = this.add
      .text(width / 2, height / 2 + 50, "Start", {
        fontSize: `${SCORE_FONT_SIZE}px`,
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        stroke: FONT_STROKE_COLOR,
        strokeThickness: FONT_STROKE_SIZE,
      })
      .setOrigin(0.5)
      .setDepth(2001);

    startText.setInteractive({ useHandCursor: true });

    startText.on("pointerdown", () => {
      this.hasShownStartScreen = true;
      overlay.destroy();
      title.destroy();
      startText.destroy();

      this.startGame();
    });
  }

  startGame() {
    this.isGameStarted = true;
    this.isGameOver = false;

    this.spawnBug();

    this.foodTimer = this.time.addEvent({
      delay: 3000,
      callback: this.spawnFood,
      callbackScope: this,
      loop: true,
    });

    this.gameTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.isGameOver || !this.isGameStarted) return;

        this.timeLeft--;
        this.timerText.setText("Time: " + this.timeLeft);

        if (this.timeLeft <= 0) {
          this.endGame();
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  endGame() {
    if (this.isGameOver) return;

    this.isGameOver = true;

    const width = this.scale.width;
    const height = this.scale.height;

    if (this.activeBug?.active) {
      this.activeBug.destroy();
    }

    this.tweens.killAll();

    this.add
      .rectangle(width / 2, height / 2, width, height, 0x000000, 0.65)
      .setDepth(2000);

    this.add
      .text(width / 2, height / 2 - 90, "GAME OVER", {
        fontSize: `${GAME_OVER_FONT_SIZE}px`,
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        stroke: FONT_STROKE_COLOR,
        strokeThickness: FONT_STROKE_SIZE,
      })
      .setOrigin(0.5)
      .setDepth(2001);

    this.add
      .text(width / 2, height / 2 - 20, "Score: " + this.score, {
        fontSize: `${SCORE_FONT_SIZE}px`,
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        stroke: FONT_STROKE_COLOR,
        strokeThickness: FONT_STROKE_SIZE,
      })
      .setOrigin(0.5)
      .setDepth(2001);

    const restartText = this.add
      .text(width / 2, height / 2 + 80, "Tap to restart", {
        fontSize: `${HUD_FONT_SIZE}px`,
        color: "#ffffff",
        fontFamily: FONT_FAMILY,
        stroke: FONT_STROKE_COLOR,
        strokeThickness: FONT_STROKE_SIZE,
      })
      .setOrigin(0.5)
      .setDepth(2001);

    restartText.setInteractive({ useHandCursor: true });

    restartText.on("pointerdown", () => {
      this.scene.restart();
    });
  }
}
