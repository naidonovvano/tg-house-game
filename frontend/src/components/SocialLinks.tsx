import {
    FaYoutube,
    FaInstagram,
    FaTelegramPlane,
} from "react-icons/fa";

import logo from "../assets/logo.jpeg";

import "./SocialLinks.css";

export default function SocialLinks() {
    return (
        <div className="social-card">

            <div className="social-links">

                <a
                    href="http://www.youtube.com/@MonetManetCats"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaYoutube />
                    <span>YouTube: Monet & Manet Cats</span>
                </a>

                <a
                    href="https://www.instagram.com/monet_manet_cats?igsh=cG9yNGc5MWQ2Z20z"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaInstagram />
                    <span>Instagram: @monet_manet_cats</span>
                </a>

                <a
                    href="https://t.me/monet_manet"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaTelegramPlane />
                    <span>Telegram: @monet_manet</span>
                </a>

            </div>

            <div className="logo-container">
                <img
                    src={logo}
                    alt="Monet & Manet"
                />
            </div>

        </div>
    );
}