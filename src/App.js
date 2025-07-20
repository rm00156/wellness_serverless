import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "error" : "info",
});

// Validation schemas
const modalFormSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(50, "Full name must be 50 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+44|0)[1-9]\d{1,4}\s?\d{3,4}\s?\d{3,4}$/,
      "Please enter a valid UK phone number"
    ),
  membership: z.string().min(1, "Please select a membership plan"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(250, "Message must be 250 characters or less"),
});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  
  body {
    font-family: 'DM Sans', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background: #1a1a1a;
    color: #ffffff;
    overflow-x: hidden;
    padding-top: 0; /* Remove padding-top to let navbar be visible */
  }
  
  html {
    scroll-behavior: smooth;
  }

  /* Prevent horizontal overflow */
  #root {
    width: 100%;
    overflow-x: hidden;
    max-width: 100vw;
  }

  /* Mobile-specific improvements */
  @media (max-width: 768px) {
    input, textarea, select {
      font-size: 16px !important; /* Prevents zoom on iOS */
    }
    
    /* Improve touch targets */
    button, a {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Better scrolling on mobile */
    body {
      -webkit-overflow-scrolling: touch;
      padding-top: 0; /* Remove padding-top to let navbar be visible */
    }
    
    /* Ensure no horizontal overflow on mobile */
    html, body, #root, section, div {
      overflow-x: hidden;
      width: 100%;
      max-width: 100vw;
    }
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  max-width: 100vw;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 24px;
  z-index: 9999;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  will-change: transform;
  animation: navbarFadeIn 0.5s ease-out;

  /* Enhanced backdrop for better readability */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(26, 26, 26, 0.99);
    z-index: -1;
  }

  /* Scroll effect - more opaque when scrolled */
  ${(props) =>
    props.$scrolled &&
    `
    background: rgba(26, 26, 26, 0.99);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  `}

  @media (max-width: 768px) {
    padding: 12px 16px;
    background: rgba(26, 26, 26, 0.99);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  @keyframes navbarFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  z-index: 10;

  img {
    height: 60px;
    width: auto;
    object-fit: contain;
    margin: 0;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;

    img {
      height: 50px;
      filter: brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;

    img {
      height: 45px;
      filter: brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }

  @media (max-width: 375px) {
    gap: 12px;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 375px) {
    font-size: 0.75rem;
  }

  &:hover {
    color: #d4c4b0;
  }
`;

const NavButton = styled.button`
  background: #d4c4b0;
  color: #1a1a1a;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 768px) {
    padding: 6px 16px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 5px 12px;
    font-size: 0.7rem;
  }

  @media (max-width: 375px) {
    padding: 4px 10px;
    font-size: 0.65rem;
  }

  &:hover {
    background: #e8d8c4;
  }
`;

const NAVBAR_HEIGHT = 56; // px
const HERO_MARGIN_MIN = 12; // px
const HERO_MARGIN_MAX = 32; // px

const Hero = styled.section`
  height: 100vh;
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 70px;
    height: calc(100vh - 70px);
    min-height: calc(100vh - 70px);
  }

  @media (max-width: 480px) {
    margin-top: 65px;
    height: calc(100vh - 65px);
    min-height: calc(100vh - 65px);
  }
`;

const HeroBackground = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.4) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
    text-align: center;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
    gap: 30px;
  }

  @media (max-width: 430px) {
    padding: 0 15px;
    gap: 25px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
    gap: 20px;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  text-align: right;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
  }
`;

const BusinessName = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #ffffff;
  font-family: "DM Sans", sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }

  @media (max-width: 430px) {
    font-size: 1.9rem;
  }

  @media (max-width: 375px) {
    font-size: 1.7rem;
  }
`;

const BusinessSubheading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 300;
  color: #d4c4b0;
  font-family: "DM Sans", sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
  text-transform: uppercase;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 430px) {
    font-size: 1.1rem;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #d4c4b0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CTAButton = styled.button`
  background: #d4c4b0;
  color: #1a1a1a;
  border: none;
  border-radius: 30px;
  padding: 14px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 10px 24px;
    font-size: 0.9rem;
  }

  @media (max-width: 430px) {
    padding: 9px 22px;
    font-size: 0.85rem;
  }

  &:hover {
    background: #e8d8c4;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  }
`;

const StayConnectedSection = styled.section`
  background: #ffffff;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.01) 100%
    );
    pointer-events: none;
  }
`;

const StayConnectedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 60px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 10px;
  }

  @media (max-width: 375px) {
    gap: 15px;
    padding: 0 8px;
  }
`;

const StayConnectedTitle = styled.h3`
  color: #1a1a1a;
  font-size: 1.8rem;
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const NewsletterForm = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const NewsletterInput = styled.input`
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
  color: #1a1a1a;
  font-size: 1rem;
  min-width: 250px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    min-width: 200px;
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: #1a1a1a;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const NewsletterCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 300;

  input[type="checkbox"] {
    margin: 0;
    width: 16px;
    height: 16px;
    accent-color: #1a1a1a;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
`;

const NewsletterButton = styled.button`
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
    width: 100%;
  }

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background: #f5f5f5;
  color: #333333;
  padding: 40px 20px 20px 20px;
  font-size: 1rem;
`;

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLink = styled.a`
  color: #333333;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #666666;
  }
`;

const FooterCopyright = styled.p`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #dddddd;
  font-size: 0.9rem;
  color: #666666;
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 8px;
  margin: 0;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    display: block;
    background: rgba(212, 196, 176, 0.1);
    border-radius: 8px;
    padding: 10px;
    transition: background 0.3s ease;
  }

  &:hover {
    @media (max-width: 768px) {
      background: rgba(212, 196, 176, 0.2);
    }
  }
`;

const HamburgerLines = styled.div`
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  span {
    display: block;
    height: 3px;
    width: 100%;
    background: #d4c4b0;
    border-radius: 2px;
    transition: 0.3s;
    margin: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    span {
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 24px;
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    padding: 24px 32px;
    z-index: 1200;
    gap: 24px;
    min-width: 180px;
    align-items: flex-start;
    border: 1px solid rgba(212, 196, 176, 0.2);
  }

  @media (max-width: 480px) {
    right: 16px;
    padding: 20px 24px;
    min-width: 160px;
  }

  @media (max-width: 375px) {
    right: 12px;
    padding: 16px 20px;
    min-width: 140px;
  }
`;

const DesktopNavLinks = styled(NavLinks)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ServicesSection = styled.section`
  padding: 40px 20px;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.6) 0%,
    rgba(26, 26, 26, 0.5) 100%
  );
  background-image: url("approach2.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 30px 15px;
    min-height: 700px;
  }

  @media (max-width: 480px) {
    padding: 25px 10px;
    min-height: 600px;
  }

  @media (max-width: 430px) {
    padding: 22px 12px;
    min-height: 650px;
  }

  @media (max-width: 375px) {
    padding: 20px 8px;
    min-height: 550px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(26, 26, 26, 0.4) 0%,
      rgba(26, 26, 26, 0.3) 100%
    );
    z-index: 1;
  }
`;

const ServicesTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }

  @media (max-width: 430px) {
    font-size: 1.6rem;
  }
`;

const LearnMoreButton = styled(CTAButton)`
  margin-top: 1.5rem;
  font-size: 1rem;
  padding: 10px 28px;
`;

const TeamSection = styled.section`
  padding: 40px 20px;
  background: #1a1a1a;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const TeamTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const TeamCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 12px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 15px;
  }
`;

const TeamCard = styled.div`
  background: rgba(26, 26, 26, 0.8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid rgba(212, 196, 176, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    border-color: rgba(212, 196, 176, 0.3);
  }

  @media (max-width: 768px) {
    min-height: 280px;
  }
`;

const CoachingCard = styled(TeamCard)`
  background: rgba(42, 42, 42, 0.9);
  padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(212, 196, 176, 0.2);
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    background: rgba(42, 42, 42, 0.95);
    border-color: rgba(212, 196, 176, 0.4);
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
    min-height: 280px;
  }
`;

const StaffImage = styled.div`
  width: 100%;
  height: 240px;
  background: rgba(212, 196, 176, 0.1);
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(212, 196, 176, 0.1) 0%,
      rgba(212, 196, 176, 0.05) 100%
    );
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const StaffName = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  margin: 12px 16px 4px 16px;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 10px 12px 3px 12px;
  }
`;

const StaffRole = styled.p`
  color: #d4c4b0;
  font-size: 0.9rem;
  margin: 0 16px 12px 16px;
  text-align: center;
  line-height: 1.4;
  font-weight: 300;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin: 0 12px 10px 12px;
  }
`;

const CoachingTitle = styled.h3`
  color: #ffffff;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const CoachingDesc = styled.p`
  color: #d4c4b0;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const PricingSection = styled.section`
  padding: 40px 20px;
  background: #2a2a2a;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const PricingTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const PricingDescription = styled.p`
  color: #d4c4b0;
  font-size: 1.15rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
  max-width: 600px;
`;

const PricingCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 15px;
  }

  @media (max-width: 375px) {
    gap: 12px;
    padding: 0 10px;
  }
`;

const PricingCard = styled.div`
  background: ${(props) =>
    props.plan === "starter"
      ? "#1a1a1a"
      : props.plan === "premium"
      ? "#2a2a2a"
      : props.plan === "ultimate"
      ? "#3a3a3a"
      : "#1a1a1a"};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 320px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const PlanName = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PlanPrice = styled.div`
  color: #d4c4b0;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PlanPeriod = styled.span`
  font-size: 1rem;
  color: #b8a898;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  width: 100%;
`;

const PlanFeature = styled.li`
  color: #d4c4b0;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 4px 0;
`;

const PlanButton = styled(CTAButton)`
  margin-top: auto;
  font-size: 1rem;
  padding: 12px 32px;
`;

const ContactSection = styled.section`
  padding: 40px 20px;
  background: #1a1a1a;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  min-height: 600px;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    gap: 24px;
    padding: 0 10px;
  }

  @media (max-width: 375px) {
    gap: 20px;
    padding: 0 8px;
  }
`;

const ContactImage = styled.div`
  width: 100%;
  height: 100%;
  background: #f3ede7;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c5c3e;
  font-size: 4rem;
  overflow: hidden;
  min-height: 400px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const ContactForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const ContactDescription = styled.p`
  color: #d4c4b0;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  background: #2a2a2a;
  transition: border-color 0.2s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #d4c4b0;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  background: #2a2a2a;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.95rem;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
    min-height: 80px;
  }

  &:focus {
    outline: none;
    border-color: #d4c4b0;
  }
`;

const ContactButton = styled(CTAButton)`
  align-self: flex-start;
  margin-top: 1rem;

  @media (max-width: 768px) {
    align-self: center;
    width: 100%;
    max-width: 200px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const TestimonialsSection = styled.section`
  padding: 60px 20px;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 15px;
    min-height: 400px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
    min-height: 350px;
  }
`;

const PartnersSection = styled.section`
  padding: 80px 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  position: relative;
  overflow: hidden;
`;

const PartnersBackground = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("nice.png");
  background-size: cover;
  background-position: center;
`;

const PartnersOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  z-index: 2;
`;

const PartnersContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 120px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 80px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
    text-align: center;
    gap: 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
    gap: 30px;
  }

  @media (max-width: 430px) {
    padding: 0 15px;
    gap: 25px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
    gap: 20px;
  }
`;

const PartnersLeft = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
  }
`;

const PartnersRight = styled.div`
  flex: 1;
  text-align: right;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    text-align: center;
  }
`;

const PartnersTitle = styled.h2`
  color: #1a1a1a;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  font-family: "DM Sans", sans-serif;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #1a1a1a, transparent);
  }

  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }

  @media (max-width: 430px) {
    font-size: 1.7rem;
  }

  @media (max-width: 375px) {
    font-size: 1.5rem;
  }
`;

const PartnersSubtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 0;
  font-weight: 300;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PartnersButton = styled(CTAButton)`
  background: #1a1a1a;
  color: #ffffff;

  &:hover {
    background: #333;
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 10px;
  }

  @media (max-width: 375px) {
    gap: 20px;
    padding: 0 8px;
  }
`;

const PartnerLogo = styled.div`
  color: #666;
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  padding: 30px 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: transparent;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.05),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    color: #1a1a1a;
    border-color: #1a1a1a;
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }
`;

const TestimonialDivider = styled.div`
  width: 80px;
  height: 1px;
  background: #d4c4b0;
  margin: 0 auto 3rem auto;
  opacity: 0.6;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#d4c4b0" : "#444")};
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
  }

  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }

  &:hover {
    background: #d4c4b0;
    transform: scale(1.2);
  }
`;

const TestimonialsLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const TestimonialsTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const TestimonialCarousel = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: visible;

  @media (max-width: 768px) {
    min-height: 200px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
  }
`;

const TestimonialCard = styled.div`
  background: transparent;
  padding: 30px 40px;
  display: ${(props) => (props.$active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 25px 30px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const TestimonialText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: normal;
  font-weight: 300;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.2rem;
  }
`;

const TestimonialAuthor = styled.h4`
  color: #d4c4b0;
  font-size: 1rem;
  margin-bottom: 0;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 10px;
  right: 10px;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    left: 5px;
    right: 5px;
  }

  @media (max-width: 480px) {
    left: 2px;
    right: 2px;
  }
`;

const CarouselButton = styled.button`
  background: transparent;
  color: #d4c4b0;
  border: 1px solid #d4c4b0;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.3rem;
  backdrop-filter: blur(10px);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }

  &:hover {
    background: #d4c4b0;
    color: #1a1a1a;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1a1a1a;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: ${(props) => (props.$show ? "2000" : "-1")};
  transform: ${(props) =>
    props.$show ? "translateY(0)" : "translateY(-100%)"};
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.3s ease-in-out;
  pointer-events: ${(props) => (props.$show ? "auto" : "none")};
  opacity: ${(props) => (props.$show ? "1" : "0")};
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  padding: 40px 20px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 15px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: 25px 10px;
  }
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  font-family: "DM Sans", sans-serif;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const ModalForm = styled.div`
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ModalFormGroup = styled.div`
  margin-bottom: 1rem;
`;

const ModalFormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const ModalFormInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  background: #2a2a2a;
  transition: border-color 0.2s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #d4c4b0;
  }
`;

const ModalFormSelect = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  background: #2a2a2a;
  transition: border-color 0.2s;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #d4c4b0;
  }
`;

const ModalFormTextarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
  background: #2a2a2a;
  height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.95rem;
    height: 100px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 0.9rem;
    height: 80px;
  }

  &:focus {
    outline: none;
    border-color: #d4c4b0;
  }
`;

const ModalButton = styled.button`
  background: #d4c4b0;
  color: #1a1a1a;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 12px;

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
    margin: 0 8px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
    margin: 0 4px;
  }

  &:hover {
    background: #e8d8c4;
    transform: translateY(-2px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #ffffff;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: background 0.2s;

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
    font-size: 1.8rem;
    padding: 10px;
  }

  @media (max-width: 480px) {
    top: 15px;
    right: 15px;
    font-size: 1.6rem;
    padding: 8px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TestimonialImage = styled.div`
  width: 100%;
  height: 100%;
  background: #f3ede7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7c5c3e;
  font-size: 4rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FAQSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 700px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23ffffff" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
    min-height: 600px;
  }
`;

const FAQTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4c4b0, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const FAQDescription = styled.p`
  color: #d4c4b0;
  font-size: 1.2rem;
  margin: 0 auto 4rem auto;
  text-align: center;
  max-width: 700px;
  line-height: 1.6;
  font-weight: 300;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }
`;

const FAQContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
`;

const FAQItem = styled.div`
  border: 1px solid rgba(212, 196, 176, 0.2);
  border-radius: 16px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  background: rgba(26, 26, 26, 0.6);
  backdrop-filter: blur(20px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(212, 196, 176, 0.3),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: rgba(212, 196, 176, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
    border-radius: 12px;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 24px 28px;
  background: rgba(26, 26, 26, 0.8);
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.15rem;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.3s ease;
  position: relative;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    padding: 20px 24px;
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    padding: 18px 20px;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(42, 42, 42, 0.9);
    color: #d4c4b0;
  }

  &:focus {
    outline: none;
    background: rgba(42, 42, 42, 0.95);
  }
`;

const FAQAnswer = styled.div`
  padding: ${(props) => (props.$isOpen ? "28px 28px 32px 28px" : "0 28px")};
  background: rgba(42, 42, 42, 0.4);
  color: #d4c4b0;
  line-height: 1.7;
  max-height: ${(props) => (props.$isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  font-size: 1.05rem;
  font-weight: 300;
  border-top: ${(props) =>
    props.$isOpen ? "1px solid rgba(212, 196, 176, 0.1)" : "none"};

  @media (max-width: 768px) {
    padding: ${(props) => (props.$isOpen ? "24px 24px 28px 24px" : "0 24px")};
    font-size: 1rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    padding: ${(props) => (props.$isOpen ? "20px 20px 24px 20px" : "0 20px")};
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ExpandIcon = styled.span`
  font-size: 1.8rem;
  color: #d4c4b0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) => (props.$isOpen ? "rotate(45deg)" : "rotate(0deg)")};
  font-weight: 300;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #d4c4b0;
  color: #1a1a1a;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  &:hover {
    background: #e8d8c4;
    transform: translateY(-2px);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  width: 100%;
  padding: 0 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    padding: 0 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 15px;
  }

  @media (max-width: 430px) {
    gap: 18px;
    padding: 0 12px;
  }

  @media (max-width: 375px) {
    gap: 15px;
    padding: 0 10px;
  }
`;

const ServiceCard = styled.div`
  background: rgba(26, 26, 26, 0.4);
  padding: 50px 40px;
  text-align: left;
  position: relative;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  min-height: 400px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);

  @media (max-width: 768px) {
    padding: 40px 30px;
    min-height: 350px;
  }

  @media (max-width: 480px) {
    padding: 30px 20px;
    min-height: 300px;
  }

  @media (max-width: 430px) {
    padding: 28px 18px;
    min-height: 320px;
  }

  @media (max-width: 375px) {
    padding: 25px 15px;
    min-height: 280px;
  }

  &:hover {
    transform: translateY(-8px);
    background: rgba(26, 26, 26, 0.6);
    border-color: rgba(212, 196, 176, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border-radius: 20px;
    z-index: -1;
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 2rem;
  display: block;
  opacity: 0.8;
  text-align: left;
  color: #d4c4b0;
  transition: all 0.3s ease;

  svg {
    width: 32px;
    height: 32px;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const ServiceTitle = styled.h3`
  color: #ffffff;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const ServiceDesc = styled.p`
  color: #b8a898;
  font-size: 0.9rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 300;
  text-align: left;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.7;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.6;
  }
`;

const Tile = styled.div`
  background: #2a2a2a;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TileImage = styled.div`
  width: 100%;
  height: 200px;
  background: #e9e3d7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TileContent = styled.div`
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

const TileTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const TileDesc = styled.p`
  color: #d4c4b0;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 3px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-top: 2px;
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #7c5c3e;
  color: #fff;
  padding: 18px 36px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  z-index: 3000;
  opacity: 0.98;
  transition: opacity 0.3s;
  max-width: 90vw;
  text-align: center;

  @media (max-width: 768px) {
    top: 20px;
    padding: 16px 24px;
    font-size: 1rem;
    max-width: 95vw;
  }

  @media (max-width: 480px) {
    top: 15px;
    padding: 14px 20px;
    font-size: 0.9rem;
    max-width: 98vw;
  }
`;

// Business configuration from environment variables
const BUSINESS_NAME = process.env.REACT_APP_BUSINESS_NAME;
const BUSINESS_LOGO = process.env.REACT_APP_BUSINESS_LOGO;
const BUSINESS_EMAIL = process.env.REACT_APP_BUSINESS_EMAIL;
const BUSINESS_PHONE = process.env.REACT_APP_BUSINESS_PHONE;
const BUSINESS_ADDRESS = process.env.REACT_APP_BUSINESS_ADDRESS;
const BUSINESS_CITY = process.env.REACT_APP_BUSINESS_CITY;
const BUSINESS_COUNTRY = process.env.REACT_APP_BUSINESS_COUNTRY;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [sending, setSending] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Modal form
  const modalForm = useForm({
    resolver: zodResolver(modalFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  // Contact form, default membership to 'consultation'
  const contactForm = useForm({
    resolver: zodResolver(modalFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      membership: "consultation",
    },
  });
  const [contactSending, setContactSending] = useState(false);
  const [contactCaptchaToken, setContactCaptchaToken] = useState(null);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    modalForm.clearErrors("root");

    // Always trigger validation for all fields
    const isValid = await modalForm.trigger(undefined, { shouldFocus: false });

    if (!isValid) {
      logger.info("Form validation failed");
      return;
    }

    setSending(true);

    try {
      // 1. Run reCAPTCHA v3
      if (!window.grecaptcha || !process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
        throw new Error("reCAPTCHA not loaded");
      }
      const token = await window.grecaptcha.execute(
        process.env.REACT_APP_RECAPTCHA_SITE_KEY,
        { action: "submit_modal" }
      );

      if (!token) {
        modalForm.setError("root", {
          type: "manual",
          message: "reCAPTCHA verification failed. Please try again.",
        });
        setSending(false);
        return;
      }

      // 2. Optionally: send the token to your server for verification here

      // 3. Proceed with EmailJS send
      const data = modalForm.getValues();
      await window.emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          membership: data.membership,
          message: data.message,
          "g-recaptcha-response": token, // Optionally include the token in the email
        }
      );
      modalForm.reset();
      closeModal();
      setToast({
        show: true,
        message:
          "Your request was sent successfully! You should hear from us soon.",
      });
      setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 10000);
    } catch (error) {
      logger.error("Error submitting form:", error);
      modalForm.setError("root", {
        type: "manual",
        message: "There was a problem sending your request. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  // Reload reCAPTCHA v3 token every time the contact form is visible (page load)
  useEffect(() => {
    if (window.grecaptcha && process.env.REACT_APP_RECAPTCHA_SITE_KEY) {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, {
            action: "submit_contact",
          })
          .then((token) => {
            setContactCaptchaToken(token);
          });
      });
    }
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    contactForm.clearErrors("root");
    const isValid = await contactForm.trigger(undefined, {
      shouldFocus: false,
    });
    if (!isValid) return;
    setContactSending(true);
    try {
      let token = contactCaptchaToken;
      if (
        !token &&
        window.grecaptcha &&
        process.env.REACT_APP_RECAPTCHA_SITE_KEY
      ) {
        token = await window.grecaptcha.execute(
          process.env.REACT_APP_RECAPTCHA_SITE_KEY,
          { action: "submit_contact" }
        );
        setContactCaptchaToken(token);
      }
      if (!token) {
        contactForm.setError("root", {
          type: "manual",
          message: "reCAPTCHA verification failed. Please try again.",
        });
        setContactSending(false);
        return;
      }
      const data = contactForm.getValues();
      await window.emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          membership: data.membership, // now always 'consultation' for contact form
          message: data.message,
          "g-recaptcha-response": token,
        }
      );
      contactForm.reset();
      setContactCaptchaToken(null);
      setToast({
        show: true,
        message:
          "Your message was sent successfully! You should hear from us soon.",
      });
      setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 10000);
    } catch (error) {
      contactForm.setError("root", {
        type: "manual",
        message: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setContactSending(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 60; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % 3);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + 3) % 3);
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    modalForm.reset();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      setShowScrollButton(scrollY > viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when screen size changes to desktop
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".hamburger")
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    // Debug: Check if reCAPTCHA is loaded
    logger.info("reCAPTCHA loaded:", !!window.grecaptcha);
    if (window.grecaptcha) {
      logger.info("reCAPTCHA version:", window.grecaptcha.getResponse);
    }
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      {toast.show && <Toast>{toast.message}</Toast>}
      <Navbar $scrolled={showScrollButton}>
        <NavContainer>
          <Logo>
            <img src={BUSINESS_LOGO} alt={BUSINESS_NAME} />
          </Logo>
          <DesktopNavLinks>
            <NavLink onClick={() => scrollToSection("services")}>
              Services
            </NavLink>
            <NavLink onClick={() => scrollToSection("pricing")}>
              Pricing
            </NavLink>
            <NavLink onClick={() => scrollToSection("team")}>
              Experience
            </NavLink>
            <NavLink onClick={() => scrollToSection("testimonials")}>
              Testimonials
            </NavLink>
            <NavLink onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
            <NavLink onClick={() => scrollToSection("faq")}>FAQs</NavLink>
            <NavButton onClick={() => openModal("invitation")}>
              Request an Invitation
            </NavButton>
          </DesktopNavLinks>
          <Hamburger
            className="hamburger"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerLines>
              <span />
              <span />
              <span />
            </HamburgerLines>
          </Hamburger>
          <MobileMenu className="mobile-menu" open={menuOpen}>
            <NavLink onClick={() => scrollToSection("services")}>
              Services
            </NavLink>
            <NavLink onClick={() => scrollToSection("pricing")}>
              Pricing
            </NavLink>
            <NavLink onClick={() => scrollToSection("team")}>
              Experience
            </NavLink>
            <NavLink onClick={() => scrollToSection("testimonials")}>
              Testimonials
            </NavLink>
            <NavLink onClick={() => scrollToSection("contact")}>
              Contact
            </NavLink>
            <NavLink onClick={() => scrollToSection("faq")}>FAQs</NavLink>
            <NavButton
              style={{ width: "100%" }}
              onClick={() => {
                setMenuOpen(false);
                openModal("invitation");
              }}
            >
              Request an Invitation
            </NavButton>
          </MobileMenu>
        </NavContainer>
      </Navbar>
      <Hero>
        <HeroBackground>
          <Overlay />
        </HeroBackground>
        <HeroContent>
          <HeroLeft>
            <BusinessSubheading>Welcome to {BUSINESS_NAME}</BusinessSubheading>
            <BusinessName>A sanctuary reserved for the few</BusinessName>
          </HeroLeft>
          <HeroRight>
            <CTAButton onClick={() => openModal("invitation")}>
              Book Your Private Tour
            </CTAButton>
          </HeroRight>
        </HeroContent>
      </Hero>
      <ServicesSection id="services">
        <ServicesTitle>Our Approach</ServicesTitle>
        <ServicesGrid>
          <ServiceCard>
            <ServiceIcon>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </ServiceIcon>
            <ServiceTitle>Discreet Luxury</ServiceTitle>
            <ServiceDesc>
              Our spaces speak softly. Every element from scent to lighting to
              sound is designed for calm, privacy, and a sense of sanctuary.
              This is wellness without spectacle, for those who don't need to
              prove anything.
            </ServiceDesc>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
                <path d="M3.6 3.6l4.2 4.2m8.4 8.4l4.2 4.2" />
                <path d="M18.4 5.6l-4.2 4.2m-8.4 8.4l-4.2 4.2" />
              </svg>
            </ServiceIcon>
            <ServiceTitle>Curated Wellness</ServiceTitle>
            <ServiceDesc>
              We don't offer workouts. We offer a crafted path to holistic
              health. Every program, every treatment, every touchpoint is
              personalised to an uncompromising standard of care.
            </ServiceDesc>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
              </svg>
            </ServiceIcon>
            <ServiceTitle>Innovation with Intention</ServiceTitle>
            <ServiceDesc>
              We embrace cutting-edge technologies but only where they serve
              genuine impact. From bio-optimisation to recovery suites, our
              methods are leading-edge, never gimmick.
            </ServiceDesc>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </ServiceIcon>
            <ServiceTitle>Timeless Design & Detail</ServiceTitle>
            <ServiceDesc>
              Our aesthetic is warm minimalism, grounded, natural and deeply
              intentional. We invest in design because environments shape
              habits. And beautiful ones elevate lives.
            </ServiceDesc>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>
      <PricingSection id="pricing">
        <PricingTitle>Membership Tiers</PricingTitle>
        <PricingDescription>
          Select the experience that aligns with your wellness journey. Each
          tier offers a curated approach to holistic wellness, designed for
          those who seek excellence.
        </PricingDescription>
        <PricingCards>
          <PricingCard plan="starter">
            <PlanName>Foundation</PlanName>
            <PlanPrice>
              £299<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Private wellness consultation</PlanFeature>
              <PlanFeature>✓ Access to curated facilities</PlanFeature>
              <PlanFeature>✓ Personalized wellness assessment</PlanFeature>
              <PlanFeature>✓ Monthly progress reviews</PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Begin Your Journey
            </PlanButton>
          </PricingCard>
          <PricingCard plan="premium">
            <PlanName>Curated</PlanName>
            <PlanPrice>
              £599<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Everything in Foundation</PlanFeature>
              <PlanFeature>✓ Bespoke wellness programs</PlanFeature>
              <PlanFeature>✓ Private training sessions</PlanFeature>
              <PlanFeature>
                ✓ Priority scheduling & exclusive access
              </PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Elevate Your Experience
            </PlanButton>
          </PricingCard>
          <PricingCard plan="ultimate">
            <PlanName>Bespoke</PlanName>
            <PlanPrice>
              £1,299<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Everything in Curated</PlanFeature>
              <PlanFeature>✓ Unlimited private sessions</PlanFeature>
              <PlanFeature>✓ Exclusive wellness therapies</PlanFeature>
              <PlanFeature>✓ Dedicated wellness concierge</PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Experience Excellence
            </PlanButton>
          </PricingCard>
        </PricingCards>
      </PricingSection>
      <PartnersSection id="partners">
        <PartnersBackground>
          <PartnersOverlay />
        </PartnersBackground>
        <PartnersContent>
          <PartnersLeft>
            <PartnersTitle>Wellness</PartnersTitle>
            <PartnersSubtitle>
              Experience the pinnacle of luxury wellness, where every detail is
              crafted for your transformation.
            </PartnersSubtitle>
          </PartnersLeft>
          <PartnersRight>
            <PartnersButton onClick={() => openModal("invitation")}>
              Book Your Session
            </PartnersButton>
          </PartnersRight>
        </PartnersContent>
      </PartnersSection>
      <TeamSection id="team">
        <TeamTitle>Exclusive Experience</TeamTitle>
        <TeamCards>
          <TeamCard>
            <StaffImage>
              <img src="luxury.png" alt="Expert-Led Programs" />
            </StaffImage>
            <StaffName>Expert-Led Programs</StaffName>
            <StaffRole>
              World-class specialists create bespoke wellness journeys tailored
              to your unique needs
            </StaffRole>
          </TeamCard>
          <TeamCard>
            <StaffImage>
              <img src="massage.png" alt="Personalized Approach" />
            </StaffImage>
            <StaffName>Personalized Approach</StaffName>
            <StaffRole>
              Every program designed by experts who understand wellness as both
              art and science
            </StaffRole>
          </TeamCard>
          <TeamCard>
            <StaffImage>
              <img src="yoga.png" alt="Specialized Therapies" />
            </StaffImage>
            <StaffName>Specialized Therapies</StaffName>
            <StaffRole>
              Advanced treatment methods and cutting-edge wellness technologies
            </StaffRole>
          </TeamCard>
          <TeamCard>
            <StaffImage>
              <img src="personal_training.png" alt="Holistic Wellness" />
            </StaffImage>
            <StaffName>Holistic Wellness</StaffName>
            <StaffRole>
              Mind-body integration through comprehensive wellness programs
            </StaffRole>
          </TeamCard>
        </TeamCards>
      </TeamSection>
      <TestimonialsSection id="testimonials">
        <TestimonialsTitle>Strengthen</TestimonialsTitle>
        <TestimonialDivider />
        <TestimonialCarousel>
          <TestimonialCard $active={currentTestimonial === 0}>
            <TestimonialText>
              "Joining {BUSINESS_NAME} has been a transformative experience. The
              attention to detail and personalized approach have truly exceeded
              my expectations."
            </TestimonialText>
            <TestimonialAuthor>Sarah M.</TestimonialAuthor>
            <CarouselControls>
              <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
              <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
            </CarouselControls>
            <CarouselDots>
              <Dot
                $active={currentTestimonial === 0}
                onClick={() => setCurrentTestimonial(0)}
              />
              <Dot
                $active={currentTestimonial === 1}
                onClick={() => setCurrentTestimonial(1)}
              />
              <Dot
                $active={currentTestimonial === 2}
                onClick={() => setCurrentTestimonial(2)}
              />
            </CarouselDots>
          </TestimonialCard>
          <TestimonialCard $active={currentTestimonial === 1}>
            <TestimonialText>
              "The personalized approach and attention to every detail has
              created an experience that truly exceeds expectations."
            </TestimonialText>
            <TestimonialAuthor>Michael T.</TestimonialAuthor>
            <CarouselControls>
              <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
              <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
            </CarouselControls>
            <CarouselDots>
              <Dot
                $active={currentTestimonial === 0}
                onClick={() => setCurrentTestimonial(0)}
              />
              <Dot
                $active={currentTestimonial === 1}
                onClick={() => setCurrentTestimonial(1)}
              />
              <Dot
                $active={currentTestimonial === 2}
                onClick={() => setCurrentTestimonial(2)}
              />
            </CarouselDots>
          </TestimonialCard>
          <TestimonialCard $active={currentTestimonial === 2}>
            <TestimonialText>
              "Every element has been thoughtfully designed to create a
              sanctuary that truly transforms your wellness journey."
            </TestimonialText>
            <TestimonialAuthor>Emma R.</TestimonialAuthor>
            <CarouselControls>
              <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
              <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
            </CarouselControls>
            <CarouselDots>
              <Dot
                $active={currentTestimonial === 0}
                onClick={() => setCurrentTestimonial(0)}
              />
              <Dot
                $active={currentTestimonial === 1}
                onClick={() => setCurrentTestimonial(1)}
              />
              <Dot
                $active={currentTestimonial === 2}
                onClick={() => setCurrentTestimonial(2)}
              />
            </CarouselDots>
          </TestimonialCard>
        </TestimonialCarousel>
      </TestimonialsSection>
      <ContactSection id="contact">
        <ContactContainer>
          <ContactImage>
            <img src="sauna.png" alt="Wellness consultation" />
          </ContactImage>
          <ContactForm as="form" onSubmit={handleContactSubmit}>
            <ContactTitle>Begin Your Transformation</ContactTitle>
            <ContactDescription>
              Ready to experience bespoke wellness? Our concierge team is here
              to create your personalized journey. Schedule a private
              consultation to discover how we can elevate your wellness
              experience.
            </ContactDescription>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                placeholder="Your full name"
                {...contactForm.register("name")}
              />
              {contactForm.formState.errors.name && (
                <ErrorMessage>
                  {contactForm.formState.errors.name.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                placeholder="your.email@example.com"
                {...contactForm.register("email")}
              />
              {contactForm.formState.errors.email && (
                <ErrorMessage>
                  {contactForm.formState.errors.email.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                placeholder="+44 20 7946 0958"
                {...contactForm.register("phone")}
              />
              {contactForm.formState.errors.phone && (
                <ErrorMessage>
                  {contactForm.formState.errors.phone.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea
                name="message"
                placeholder="Tell us about your wellness aspirations and how we can create your bespoke experience..."
                {...contactForm.register("message")}
              />
              {contactForm.formState.errors.message && (
                <ErrorMessage>
                  {contactForm.formState.errors.message.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <FormGroup style={{ display: "none" }}>
              <input
                type="hidden"
                name="membership"
                value="consultation"
                {...contactForm.register("membership")}
              />
            </FormGroup>
            <FormGroup>
              {/* reCAPTCHA v3 is invisible, but we add a badge for compliance */}
              <div style={{ textAlign: "center", margin: "16px 0 0 0" }}>
                <a
                  href="https://www.google.com/recaptcha/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    opacity: 0.7,
                    fontSize: "0.85rem",
                    color: "#a68a6d",
                    textDecoration: "none",
                    marginBottom: 0,
                  }}
                >
                  Protected by reCAPTCHA v3
                </a>
              </div>
              {contactForm.formState.errors.root && (
                <ErrorMessage style={{ textAlign: "center", marginTop: "8px" }}>
                  {contactForm.formState.errors.root.message}
                </ErrorMessage>
              )}
            </FormGroup>
            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <ContactButton type="submit" disabled={contactSending}>
                {contactSending ? "Sending..." : "Schedule Consultation"}
              </ContactButton>
            </div>
          </ContactForm>
        </ContactContainer>
      </ContactSection>
      <FAQSection id="faq">
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQDescription>
          Discover everything you need to know about our exclusive wellness
          experiences and bespoke programs.
        </FAQDescription>
        <FAQContainer>
          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}>
              What makes your wellness programs unique?
              <ExpandIcon $isOpen={faqOpen === 1}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 1}>
              Our programs are crafted with unparalleled attention to detail,
              combining cutting-edge wellness science with bespoke
              personalization. Each journey is designed around your unique
              physiology, lifestyle, and aspirations. We offer exclusive access
              to world-class specialists and therapies that are typically
              reserved for the most discerning clients.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}>
              How do you ensure privacy and exclusivity?
              <ExpandIcon $isOpen={faqOpen === 2}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 2}>
              Privacy and exclusivity are fundamental to our philosophy. We
              maintain strict confidentiality protocols, offer private sessions
              in dedicated spaces, and limit our membership to ensure
              personalized attention. Our facilities are designed for complete
              discretion, and all client information is handled with the utmost
              care and security.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}>
              What is included in the consultation process?
              <ExpandIcon $isOpen={faqOpen === 3}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 3}>
              Your initial consultation is a comprehensive 90-minute session
              where we assess your current wellness status, discuss your goals,
              and create a personalized roadmap. This includes detailed health
              analysis, lifestyle assessment, and the development of your
              bespoke wellness strategy. We also provide a detailed program
              proposal tailored to your specific needs.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 4 ? null : 4)}>
              Can you accommodate specific health conditions?
              <ExpandIcon $isOpen={faqOpen === 4}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 4}>
              Absolutely. Our team includes specialists trained in working with
              various health conditions. We conduct thorough assessments and
              work closely with your healthcare providers to ensure safe,
              effective programs. Every session is monitored and adjusted as
              needed to support your health journey while respecting any medical
              considerations.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 5 ? null : 5)}>
              What is your cancellation and rescheduling policy?
              <ExpandIcon $isOpen={faqOpen === 5}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 5}>
              We understand that life requires flexibility. You may reschedule
              or cancel appointments up to 48 hours in advance without any fees.
              For changes within 48 hours, we offer a courtesy reschedule
              option. We prioritize your wellness journey and work with you to
              find suitable alternatives when needed.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 6 ? null : 6)}>
              Do you offer international client services?
              <ExpandIcon $isOpen={faqOpen === 6}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 6}>
              Yes, we welcome international clients and offer comprehensive
              support for your wellness journey. This includes travel
              coordination, accommodation recommendations, and extended session
              packages for visiting clients. We also provide virtual
              consultation services for ongoing support between in-person
              visits.
            </FAQAnswer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>
      <StayConnectedSection>
        <StayConnectedContent>
          <StayConnectedTitle>Stay Connected</StayConnectedTitle>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Email *" />
            <NewsletterCheckbox>
              <input type="checkbox" id="newsletter" />
              <label htmlFor="newsletter">
                Yes, subscribe me to your newsletter *
              </label>
            </NewsletterCheckbox>
            <NewsletterButton>Subscribe</NewsletterButton>
          </NewsletterForm>
        </StayConnectedContent>
      </StayConnectedSection>

      <Footer>
        <FooterNav>
          <FooterColumn>
            <FooterLink>HOME</FooterLink>
            <FooterLink>BENEFITS</FooterLink>
            <FooterLink>REVIEWS</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterLink>SHIPPING & RETURNS</FooterLink>
            <FooterLink>STORE POLICY</FooterLink>
            <FooterLink>PAYMENT METHODS</FooterLink>
            <FooterLink>FAQ</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterLink>INSTAGRAM</FooterLink>
            <FooterLink>YOUTUBE</FooterLink>
            <FooterLink>TWITTER</FooterLink>
          </FooterColumn>
        </FooterNav>
        <FooterCopyright>
          ©2035 by {BUSINESS_NAME}. Powered and secured by Wix.
        </FooterCopyright>
      </Footer>
      <ScrollToTopButton $visible={showScrollButton} onClick={scrollToTop}>
        ↑
      </ScrollToTopButton>
      <ModalOverlay $show={showModal}>
        <ModalContent>
          <CloseButton onClick={closeModal}>×</CloseButton>
          <ModalTitle>
            {modalType === "invitation"
              ? "Request an Invitation"
              : "Explore Membership"}
          </ModalTitle>
          <ModalForm onSubmit={handleModalSubmit}>
            <ModalFormGroup>
              <ModalFormLabel>Name</ModalFormLabel>
              <ModalFormInput
                type="text"
                name="name"
                placeholder="Your full name"
                {...modalForm.register("name")}
              />
              {modalForm.formState.errors.name && (
                <ErrorMessage>
                  {modalForm.formState.errors.name.message}
                </ErrorMessage>
              )}
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Email</ModalFormLabel>
              <ModalFormInput
                type="email"
                name="email"
                placeholder="your.email@example.com"
                {...modalForm.register("email")}
              />
              {modalForm.formState.errors.email && (
                <ErrorMessage>
                  {modalForm.formState.errors.email.message}
                </ErrorMessage>
              )}
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Phone</ModalFormLabel>
              <ModalFormInput
                type="tel"
                name="phone"
                placeholder="+44 20 7946 0958"
                {...modalForm.register("phone")}
              />
              {modalForm.formState.errors.phone && (
                <ErrorMessage>
                  {modalForm.formState.errors.phone.message}
                </ErrorMessage>
              )}
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Membership Interest</ModalFormLabel>
              <ModalFormSelect
                name="membership"
                {...modalForm.register("membership")}
              >
                <option value="">Select a membership tier</option>
                <option value="foundation">Foundation - £299/month</option>
                <option value="curated">Curated - £599/month</option>
                <option value="bespoke">Bespoke - £1,299/month</option>
                <option value="consultation">Just a consultation</option>
              </ModalFormSelect>
              {modalForm.formState.errors.membership && (
                <ErrorMessage>
                  {modalForm.formState.errors.membership.message}
                </ErrorMessage>
              )}
            </ModalFormGroup>
            <ModalFormGroup>
              <ModalFormLabel>Message</ModalFormLabel>
              <ModalFormTextarea
                name="message"
                placeholder="Tell us about your wellness goals and how we can help you..."
                {...modalForm.register("message")}
              />
              {modalForm.formState.errors.message && (
                <ErrorMessage>
                  {modalForm.formState.errors.message.message}
                </ErrorMessage>
              )}
            </ModalFormGroup>
            <ModalFormGroup>
              {/* reCAPTCHA v3 is invisible, but we add a badge for compliance */}
              <div style={{ textAlign: "center", margin: "16px 0 0 0" }}>
                <a
                  href="https://www.google.com/recaptcha/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    opacity: 0.7,
                    fontSize: "0.85rem",
                    color: "#a68a6d",
                    textDecoration: "none",
                    marginBottom: 0,
                  }}
                >
                  Protected by reCAPTCHA v3
                </a>
              </div>
            </ModalFormGroup>
            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <ModalButton
                type="button"
                onClick={handleModalSubmit}
                disabled={sending}
              >
                {sending ? "Sending..." : "Submit Request"}
              </ModalButton>
            </div>
          </ModalForm>
        </ModalContent>
      </ModalOverlay>
      <ModalOverlay $show={showPrivacyModal}>
        <ModalContent>
          <CloseButton onClick={() => setShowPrivacyModal(false)}>
            ×
          </CloseButton>
          <ModalTitle>Privacy Policy</ModalTitle>
          <div
            style={{
              maxWidth: 500,
              margin: "0 auto",
              color: "#5e4631",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            <p>
              <strong>Privacy Policy</strong>
            </p>
            <p>
              Your privacy is important to us. This policy explains how Reign
              Ivy Wellness collects, uses, and protects your personal
              information.
            </p>
            <p>
              <strong>Information We Collect:</strong>
              <br />
              We may collect your name, email, phone number, and any information
              you provide through our forms for the purpose of providing our
              services and responding to your inquiries.
            </p>
            <p>
              <strong>How We Use Your Information:</strong>
              <br />
              We use your information to communicate with you, process your
              requests, and improve our services. We do not sell or share your
              information with third parties except as required by law or to
              provide our services (e.g., email delivery providers).
            </p>
            <p>
              <strong>Data Security:</strong>
              <br />
              We implement reasonable security measures to protect your data.
              However, no method of transmission over the Internet is 100%
              secure.
            </p>
            <p>
              <strong>Your Rights:</strong>
              <br />
              You may request to access, update, or delete your personal
              information by contacting us at {BUSINESS_EMAIL}
            </p>
            <p>
              <strong>Contact:</strong>
              <br />
              For any privacy-related questions, please contact us at{" "}
              {BUSINESS_EMAIL}
            </p>
            <p>
              This policy may be updated from time to time. Please review it
              periodically.
            </p>
          </div>
        </ModalContent>
      </ModalOverlay>
      <ModalOverlay $show={showTermsModal}>
        <ModalContent>
          <CloseButton
            onClick={() => setShowTermsModal(false)}
            aria-label="close"
          >
            ×
          </CloseButton>
          <ModalTitle>Terms of Service</ModalTitle>
          <div
            style={{
              maxWidth: 500,
              margin: "0 auto",
              color: "#5e4631",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            <p>
              <strong>Terms of Service</strong>
            </p>
            <p>
              By using the {BUSINESS_NAME} Wellness website and services, you
              agree to the following terms and conditions. Please read them
              carefully.
            </p>
            <p>
              <strong>Use of Services:</strong>
              <br />
              Our services are provided for your personal, non-commercial use.
              You agree not to misuse our services or use them for any unlawful
              purpose.
            </p>
            <p>
              <strong>Intellectual Property:</strong>
              <br />
              All content, trademarks, and data on this site are the property of{" "}
              {BUSINESS_NAME} Wellness or its licensors. You may not reproduce,
              distribute, or create derivative works without our written
              permission.
            </p>
            <p>
              <strong>Limitation of Liability:</strong>
              <br />
              We are not liable for any damages arising from your use of our
              website or services. Our services are provided "as is" without
              warranties of any kind.
            </p>
            <p>
              <strong>Changes to Terms:</strong>
              <br />
              We may update these terms from time to time. Continued use of our
              services constitutes acceptance of the new terms.
            </p>
            <p>
              <strong>Contact:</strong>
              <br />
              For questions about these terms, please contact us at{" "}
              {BUSINESS_EMAIL}
            </p>
          </div>
        </ModalContent>
      </ModalOverlay>
    </Wrapper>
  );
}

export default App;
