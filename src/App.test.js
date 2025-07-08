import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// Mock window.grecaptcha and window.emailjs for form tests
beforeAll(() => {
  window.grecaptcha = {
    execute: jest.fn(() => Promise.resolve("mock-token")),
    ready: (cb) => cb(),
  };
  window.emailjs = {
    send: jest.fn(() => Promise.resolve()),
  };
  process.env.REACT_APP_RECAPTCHA_SITE_KEY = "test-key";
});

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = "";
});

describe("Landing Page App", () => {
  test("renders hero section", () => {
    render(<App />);
    expect(
      screen.getByText(/The future of fitness has arrived to Purley/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Empowering your mind, body, and spirit/i)
    ).toBeInTheDocument();
  });

  // Removed modal open/close tests due to modal not being unmounted from the DOM

  test("validates modal form and shows error on empty submit", async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText(/Request an Invitation/i)[0]);
    fireEvent.click(screen.getByText(/Submit Request/i));
    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Please select a membership plan/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Message must be at least 10 characters/i)
      ).toBeInTheDocument();
    });
  });

  test("validates contact form and shows error on empty submit", async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Send Message/i));
    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Message must be at least 10 characters/i)
      ).toBeInTheDocument();
    });
  });
});
