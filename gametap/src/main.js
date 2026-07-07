import Phaser from "phaser";
import "./style.css";
import { GameScene } from "./scenes/GameScene.js";
import { BACKGROUND_COLOR } from "./config/gameConfig";

const tg = window.Telegram?.WebApp;

tg?.ready();
tg?.expand();

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: BACKGROUND_COLOR,
  scene: [GameScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);