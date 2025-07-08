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
  body {
    margin: 0;
    font-family: 'DM Sans', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background: #f8f5f2;
    color: #3e2c1c;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  background: rgba(248, 245, 242, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(191, 163, 130, 0.2);
  padding: 16px 24px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(126, 94, 60, 0.08);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #7c5c3e;
  display: flex;
  align-items: center;

  img {
    height: 90px;
    width: auto;
    object-fit: contain;
    margin: -15px 0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavLink = styled.a`
  color: #7c5c3e;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #a68a6d;
  }
`;

const NavButton = styled.button`
  background: #bfa382;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #a68a6d;
  }
`;

const NAVBAR_HEIGHT = 56; // px
const HERO_MARGIN_MIN = 12; // px
const HERO_MARGIN_MAX = 32; // px

const Hero = styled.section`
  // Responsive margin using clamp
  --hero-margin: clamp(${HERO_MARGIN_MIN}px, 4vw, ${HERO_MARGIN_MAX}px);
  height: calc(100vh - (3 * var(--hero-margin)) - ${NAVBAR_HEIGHT}px);
  min-height: calc(100vh - (3 * var(--hero-margin)) - ${NAVBAR_HEIGHT}px);
  margin: var(--hero-margin) var(--hero-margin) var(--hero-margin)
    var(--hero-margin);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(248, 245, 242, 0.6) 0%,
    rgba(233, 227, 215, 0.7) 100%
  );
  border-radius: 24px;
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  max-width: 800px;
  width: 100%;
`;

const BusinessName = styled.h1`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #7c5c3e;
  font-family: "DM Sans", sans-serif;
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #5e4631;
`;

const CTAButton = styled.button`
  background: #bfa382;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 14px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(126, 94, 60, 0.08);
  transition: background 0.2s;
  &:hover {
    background: #a68a6d;
  }
`;

const Footer = styled.footer`
  background: #1a1a1a;
  color: #ffffff;
  text-align: center;
  padding: 40px 0 20px 0;
  font-size: 1rem;
  margin-top: auto;
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerLines = styled.div`
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    display: block;
    height: 3px;
    width: 100%;
    background: #7c5c3e;
    border-radius: 2px;
    transition: 0.3s;
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
    background: #f8f5f2;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(126, 94, 60, 0.12);
    padding: 24px 32px;
    z-index: 1200;
    gap: 24px;
    min-width: 180px;
    align-items: flex-start;
  }
`;

const DesktopNavLinks = styled(NavLinks)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ServicesSection = styled.section`
  padding: 40px 20px;
  background: #e9e3d7;
  box-shadow: 0 2px 16px rgba(126, 94, 60, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const ServicesTitle = styled.h2`
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
`;

const LearnMoreButton = styled(CTAButton)`
  margin-top: 1.5rem;
  font-size: 1rem;
  padding: 10px 28px;
`;

const TeamSection = styled.section`
  padding: 40px 20px;
  background: #e9e3d7;
  box-shadow: 0 2px 16px rgba(126, 94, 60, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const TeamTitle = styled.h2`
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
`;

const TeamCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background: #f8f5f2;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 280px;
  position: relative;
  overflow: hidden;
`;

const CoachingCard = styled(TeamCard)`
  background: #f3ede7;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
`;

const StaffImage = styled.div`
  width: 100%;
  height: 100%;
  background: #e9e3d7;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const StaffName = styled.h3`
  color: #fff;
  font-size: 1.25rem;
  margin: 0 0 8px 0;
  position: absolute;
  bottom: 32px;
  left: 16px;
  right: 16px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const StaffRole = styled.p`
  color: #fff;
  font-size: 0.9rem;
  margin: 0;
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const CoachingTitle = styled.h3`
  color: #7c5c3e;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const CoachingDesc = styled.p`
  color: #5e4631;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const PricingSection = styled.section`
  padding: 40px 20px;
  background: #f5f1ed;
  box-shadow: 0 2px 16px rgba(126, 94, 60, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const PricingTitle = styled.h2`
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
`;

const PricingDescription = styled.p`
  color: #a68a6d;
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
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div`
  background: ${(props) =>
    props.plan === "starter"
      ? "#f8f5f2"
      : props.plan === "premium"
      ? "#f3ede7"
      : props.plan === "ultimate"
      ? "#f0e8e0"
      : "#f8f5f2"};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 320px;
`;

const PlanName = styled.h3`
  color: #7c5c3e;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PlanPrice = styled.div`
  color: #bfa382;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PlanPeriod = styled.span`
  font-size: 1rem;
  color: #a68a6d;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  width: 100%;
`;

const PlanFeature = styled.li`
  color: #5e4631;
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
  background: #e9e3d7;
  box-shadow: 0 2px 16px rgba(126, 94, 60, 0.06);
  display: flex;
  align-items: center;
  min-height: 600px;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
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
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
`;

const ContactDescription = styled.p`
  color: #a68a6d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: #7c5c3e;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  font-size: 1rem;
  color: #5e4631;
  background: #fff;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #bfa382;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  font-size: 1rem;
  color: #5e4631;
  background: #fff;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #bfa382;
  }
`;

const ContactButton = styled(CTAButton)`
  align-self: flex-start;
  margin-top: 1rem;
`;

const TestimonialsSection = styled.section`
  padding: 40px 20px;
  background: #f5f1ed;
  box-shadow: 0 2px 16px rgba(126, 94, 60, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 600px;
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
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
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
`;

const TestimonialCarousel = styled.div`
  width: 100%;
  max-width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TestimonialCard = styled.div`
  background: #f8f5f2;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  padding: 32px 24px 80px 24px;
  display: ${(props) => (props.$active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

const TestimonialText = styled.p`
  color: #5e4631;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.h4`
  color: #7c5c3e;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const TestimonialRole = styled.p`
  color: #a68a6d;
  font-size: 0.9rem;
  margin: 0;
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
`;

const CarouselButton = styled.button`
  background: #bfa382;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1.2rem;

  &:hover {
    background: #a68a6d;
  }

  &:disabled {
    background: #d4c4b0;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f8f5f2;
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
  background: #f8f5f2;
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
`;

const ModalTitle = styled.h2`
  color: #7c5c3e;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: "DM Sans", sans-serif;
`;

const ModalForm = styled.div`
  width: 100%;
  max-width: 500px;
`;

const ModalFormGroup = styled.div`
  margin-bottom: 1rem;
`;

const ModalFormLabel = styled.label`
  display: block;
  color: #7c5c3e;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const ModalFormInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  font-size: 1rem;
  color: #5e4631;
  background: #fff;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #bfa382;
  }
`;

const ModalFormSelect = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  font-size: 1rem;
  color: #5e4631;
  background: #fff;
  transition: border-color 0.2s;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #bfa382;
  }
`;

const ModalFormTextarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  font-size: 1rem;
  color: #5e4631;
  background: #fff;
  height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #bfa382;
  }
`;

const ModalButton = styled.button`
  background: #bfa382;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0 12px;

  &:hover {
    background: #a68a6d;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #7c5c3e;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: rgba(126, 94, 60, 0.1);
  }
`;

const TestimonialsRight = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
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
  padding: 40px 20px;
  background: #f5f1ed;
  box-shadow: 0 2px 16px rgba(126, 60, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const FAQTitle = styled.h2`
  color: #7c5c3e;
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
`;

const FAQDescription = styled.p`
  color: #a68a6d;
  font-size: 1.15rem;
  margin: 0 auto 3rem auto;
  text-align: center;
  max-width: 600px;
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  border: 2px solid #e9e3d7;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);

  &:hover {
    border-color: #bfa382;
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 20px 24px;
  background: #f8f5f2;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #7c5c3e;
  transition: background-color 0.2s;

  &:hover {
    background: #f3ede7;
  }
`;

const FAQAnswer = styled.div`
  padding: ${(props) => (props.$isOpen ? "20px 24px" : "0 24px")};
  background: #fff;
  color: #5e4631;
  line-height: 1.6;
  max-height: ${(props) => (props.$isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
`;

const ExpandIcon = styled.span`
  font-size: 1.5rem;
  color: #bfa382;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(45deg)" : "rotate(0deg)")};
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 110px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #bfa382;
  color: #fff;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #a68a6d;
    transform: translateY(-2px);
  }
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Tile = styled.div`
  background: #f8f5f2;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(126, 94, 60, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 400px;
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
  color: #7c5c3e;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TileDesc = styled.p`
  color: #5e4631;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
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
      <Navbar>
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
            <NavLink onClick={() => scrollToSection("team")}>Team</NavLink>
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
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <HamburgerLines>
              <span />
              <span />
              <span />
            </HamburgerLines>
          </Hamburger>
          <MobileMenu open={menuOpen}>
            <NavLink onClick={() => scrollToSection("services")}>
              Services
            </NavLink>
            <NavLink onClick={() => scrollToSection("pricing")}>
              Pricing
            </NavLink>
            <NavLink onClick={() => scrollToSection("team")}>Team</NavLink>
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
        <VideoBackground>
          <Video autoPlay muted loop playsInline>
            <source src="intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
          <Overlay />
        </VideoBackground>
        <HeroContent>
          <BusinessName>
            The future of fitness has arrived to Purley
          </BusinessName>
          <Tagline>Empowering your mind, body, and spirit</Tagline>
          <CTAButton onClick={() => openModal("invitation")}>
            Request an Invitation
          </CTAButton>
        </HeroContent>
      </Hero>
      <ServicesSection id="services">
        <ServicesTitle>Our Services</ServicesTitle>
        <Tiles>
          <Tile>
            <TileImage>
              <img src="personal_training.png" alt="Personal Training" />
            </TileImage>
            <TileContent>
              <TileTitle>Personal Training</TileTitle>
              <TileDesc>
                Customized fitness programs and one-on-one coaching to help you
                reach your goals.
              </TileDesc>
            </TileContent>
          </Tile>
          <Tile>
            <TileImage>
              <img src="yoga.png" alt="Yoga & Meditation" />
            </TileImage>
            <TileContent>
              <TileTitle>Yoga & Meditation</TileTitle>
              <TileDesc>
                Group and private sessions to enhance flexibility, mindfulness,
                and inner calm.
              </TileDesc>
            </TileContent>
          </Tile>
          <Tile>
            <TileImage>
              <img src="massage.png" alt="Massage Therapy" />
            </TileImage>
            <TileContent>
              <TileTitle>Massage Therapy</TileTitle>
              <TileDesc>
                Relax and rejuvenate with therapeutic massages tailored to your
                needs.
              </TileDesc>
            </TileContent>
          </Tile>
        </Tiles>
      </ServicesSection>
      <PricingSection id="pricing">
        <PricingTitle>Membership Plans</PricingTitle>
        <PricingDescription>
          Choose the perfect plan for your wellness journey. All plans include
          access to our facilities and basic amenities.
        </PricingDescription>
        <PricingCards>
          <PricingCard plan="starter">
            <PlanName>Starter Plan</PlanName>
            <PlanPrice>
              £49<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Access to gym facilities</PlanFeature>
              <PlanFeature>✓ Group fitness classes</PlanFeature>
              <PlanFeature>✓ Basic wellness consultation</PlanFeature>
              <PlanFeature>✓ Locker room access</PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Get Started
            </PlanButton>
          </PricingCard>
          <PricingCard plan="premium">
            <PlanName>Premium Plan</PlanName>
            <PlanPrice>
              £89<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Everything in Starter</PlanFeature>
              <PlanFeature>✓ Personal training sessions</PlanFeature>
              <PlanFeature>✓ Yoga & meditation classes</PlanFeature>
              <PlanFeature>✓ Monthly wellness assessment</PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Choose Premium
            </PlanButton>
          </PricingCard>
          <PricingCard plan="ultimate">
            <PlanName>Ultimate Plan</PlanName>
            <PlanPrice>
              £149<PlanPeriod>/month</PlanPeriod>
            </PlanPrice>
            <PlanFeatures>
              <PlanFeature>✓ Everything in Premium</PlanFeature>
              <PlanFeature>✓ Unlimited personal training</PlanFeature>
              <PlanFeature>✓ Massage therapy sessions</PlanFeature>
              <PlanFeature>✓ Priority booking & exclusive events</PlanFeature>
            </PlanFeatures>
            <PlanButton onClick={() => openModal("invitation")}>
              Choose Ultimate
            </PlanButton>
          </PricingCard>
        </PricingCards>
      </PricingSection>
      <TeamSection id="team">
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamCards>
          <CoachingCard>
            <CoachingTitle>Personalized Coaching</CoachingTitle>
            <CoachingDesc>
              Our expert coaches work one-on-one with you to create customized
              wellness programs that fit your unique needs and goals.
            </CoachingDesc>
            <LearnMoreButton>Learn More</LearnMoreButton>
          </CoachingCard>
          <TeamCard>
            <StaffImage>
              <img src="profile.png" alt="Sarah Johnson" />
            </StaffImage>
            <StaffName>Sarah Johnson</StaffName>
            <StaffRole>Lead Wellness Coach</StaffRole>
          </TeamCard>
          <TeamCard>
            <StaffImage>
              <img src="profile.png" alt="Michael Chen" />
            </StaffImage>
            <StaffName>Michael Chen</StaffName>
            <StaffRole>Yoga & Meditation Instructor</StaffRole>
          </TeamCard>
          <TeamCard>
            <StaffImage>
              <img src="profile.png" alt="Emma Rodriguez" />
            </StaffImage>
            <StaffName>Emma Rodriguez</StaffName>
            <StaffRole>Massage Therapist</StaffRole>
          </TeamCard>
        </TeamCards>
      </TeamSection>

      <TestimonialsSection id="testimonials">
        <TestimonialsTitle>Testimonials</TestimonialsTitle>
        <TestimonialsContainer>
          <TestimonialsLeft>
            <TestimonialCarousel>
              <TestimonialCard $active={currentTestimonial === 0}>
                <TestimonialText>
                  "The personalized coaching at {BUSINESS_NAME} has completely
                  transformed my approach to fitness. The attention to detail
                  and expert guidance has helped me achieve goals I never
                  thought possible."
                </TestimonialText>
                <TestimonialAuthor>Sarah Mitchell</TestimonialAuthor>
                <TestimonialRole>Member since 2022</TestimonialRole>
                <CarouselControls>
                  <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
                  <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
                </CarouselControls>
              </TestimonialCard>
              <TestimonialCard $active={currentTestimonial === 1}>
                <TestimonialText>
                  "The yoga classes here are incredible. The instructors are
                  knowledgeable and the atmosphere is so peaceful. I've found a
                  sense of calm I never had before."
                </TestimonialText>
                <TestimonialAuthor>David Thompson</TestimonialAuthor>
                <TestimonialRole>Member since 2023</TestimonialRole>
                <CarouselControls>
                  <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
                  <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
                </CarouselControls>
              </TestimonialCard>
              <TestimonialCard $active={currentTestimonial === 2}>
                <TestimonialText>
                  "The massage therapy sessions are absolutely rejuvenating. The
                  therapists are skilled and the whole experience leaves me
                  feeling refreshed and ready to tackle anything."
                </TestimonialText>
                <TestimonialAuthor>Emma Rodriguez</TestimonialAuthor>
                <TestimonialRole>Member since 2021</TestimonialRole>
                <CarouselControls>
                  <CarouselButton onClick={prevTestimonial}>←</CarouselButton>
                  <CarouselButton onClick={nextTestimonial}>→</CarouselButton>
                </CarouselControls>
              </TestimonialCard>
            </TestimonialCarousel>
          </TestimonialsLeft>
          <TestimonialsRight>
            <TestimonialImage>
              <img src="luxury.png" alt="Wellness community" />
            </TestimonialImage>
          </TestimonialsRight>
        </TestimonialsContainer>
      </TestimonialsSection>
      <ContactSection id="contact">
        <ContactContainer>
          <ContactImage>
            <img src="sauna.png" alt="Wellness consultation" />
          </ContactImage>
          <ContactForm as="form" onSubmit={handleContactSubmit}>
            <ContactTitle>Get in Touch</ContactTitle>
            <ContactDescription>
              Ready to start your wellness journey? Contact us today to schedule
              a consultation or ask any questions about our services.
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
                placeholder="Tell us about your wellness goals and how we can help you..."
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
                {contactSending ? "Sending..." : "Send Message"}
              </ContactButton>
            </div>
          </ContactForm>
        </ContactContainer>
      </ContactSection>
      <FAQSection id="faq">
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQDescription>
          Find answers to common questions about our wellness services and
          programs.
        </FAQDescription>
        <FAQContainer>
          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}>
              What should I bring to my first session?
              <ExpandIcon $isOpen={faqOpen === 1}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 1}>
              Please bring comfortable workout clothes, a water bottle, and any
              medical information we should be aware of. We'll provide all
              necessary equipment for your session.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}>
              How do I schedule a consultation?
              <ExpandIcon $isOpen={faqOpen === 2}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 2}>
              You can schedule a consultation by calling us at (555) 123-4567,
              using our contact form above, or booking online through our
              website. We offer both in-person and virtual consultations.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}>
              What if I have physical limitations?
              <ExpandIcon $isOpen={faqOpen === 3}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 3}>
              Our certified trainers and therapists are experienced in working
              with clients who have physical limitations. We'll create a
              personalized program that accommodates your specific needs and
              goals.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 4 ? null : 4)}>
              Can I cancel or reschedule my appointment?
              <ExpandIcon $isOpen={faqOpen === 4}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 4}>
              Yes, we understand that life happens. You can cancel or reschedule
              your appointment up to 24 hours before your scheduled time without
              any fees. Late cancellations may incur a small fee.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion onClick={() => setFaqOpen(faqOpen === 5 ? null : 5)}>
              Do you offer group classes?
              <ExpandIcon $isOpen={faqOpen === 5}>+</ExpandIcon>
            </FAQQuestion>
            <FAQAnswer $isOpen={faqOpen === 5}>
              Yes! We offer various group classes including yoga, meditation,
              and fitness classes. Check our schedule for current offerings and
              class times. Group classes are included in most of our membership
              plans.
            </FAQAnswer>
          </FAQItem>
        </FAQContainer>
      </FAQSection>
      <Footer>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <div>
              <img
                src={BUSINESS_LOGO}
                alt={BUSINESS_NAME}
                style={{
                  height: "120px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </div>
            <div
              style={{ opacity: "0.8", lineHeight: "1.6", color: "#ffffff" }}
            >
              <h4
                style={{
                  margin: "0 0 15px 0",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Contact Info
              </h4>
              <p style={{ margin: "0 0 8px 0", color: "#ffffff" }}>
                {BUSINESS_ADDRESS}
                <br />
                {BUSINESS_CITY}
                <br />
                {BUSINESS_COUNTRY}
              </p>
              <p style={{ margin: "0 0 8px 0", color: "#ffffff" }}>
                <strong>Phone:</strong> {BUSINESS_PHONE}
                <br />
                <strong>Email:</strong> {BUSINESS_EMAIL}
              </p>
            </div>
          </div>

          <div>
            <h4
              style={{
                margin: "0 0 15px 0",
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              Connect With Us
            </h4>
            <div
              style={{ opacity: "0.8", lineHeight: "1.8", color: "#ffffff" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "20px",
                  justifyContent: "center",
                }}
              >
                <a
                  href="#"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
              <p style={{ margin: "0 0 8px 0", fontSize: "0.9rem" }}>
                Follow us on social media
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #333",
            marginTop: "40px",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.9rem", opacity: "0.6", margin: "0" }}>
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved. |
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                opacity: 0.6,
                textDecoration: "none",
                marginLeft: "10px",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
              onClick={() => setShowPrivacyModal(true)}
            >
              Privacy Policy
            </button>{" "}
            |
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#ffffff",
                opacity: 0.6,
                textDecoration: "none",
                marginLeft: "10px",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
              onClick={() => setShowTermsModal(true)}
            >
              Terms of Service
            </button>
          </p>
        </div>
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
                <option value="">Select a membership plan</option>
                <option value="starter">Starter Plan - £49/month</option>
                <option value="premium">Premium Plan - £89/month</option>
                <option value="ultimate">Ultimate Plan - £149/month</option>
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
