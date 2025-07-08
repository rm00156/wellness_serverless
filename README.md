# Reign Ivy Wellness Landing Page

A modern, responsive landing page for Reign Ivy Wellness - a premium fitness and wellness center located in Purley, Surrey. This React-based application showcases the facility's services, team, pricing plans, and provides seamless contact forms with reCAPTCHA protection.

## 🏋️ Features

### Core Functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling navigation with mobile hamburger menu
- **Modal Forms**: Contact forms with validation and reCAPTCHA v3 protection
- **Service Worker**: PWA capabilities for offline functionality
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Sections
- **Hero Section**: Video background with call-to-action
- **Services**: Personal training, yoga & meditation, massage therapy
- **Pricing Plans**: Three-tier membership structure (Starter, Premium, Ultimate)
- **Team**: Staff profiles and coaching information
- **Testimonials**: Customer reviews with carousel navigation
- **Contact Form**: Integrated contact form with EmailJS
- **FAQ**: Expandable frequently asked questions
- **Footer**: Contact information and social media links

### Forms & Validation
- **React Hook Form**: Form state management and validation
- **Zod Schema**: Type-safe form validation
- **reCAPTCHA v3**: Invisible bot protection
- **EmailJS Integration**: Serverless email sending
- **Error Handling**: Comprehensive error messages and user feedback

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **Styled Components**: CSS-in-JS styling
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **Pino**: Structured logging

### External Services
- **EmailJS**: Email service integration
- **reCAPTCHA v3**: Bot protection
- **Google Fonts**: DM Sans typography

### Development Tools
- **Create React App**: Development environment
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🧪 Testing

The project includes comprehensive unit tests using Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run tests for specific file
npm test -- src/App.test.js

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- Component rendering
- Form validation
- Modal interactions
- Accessibility features
- Error handling

## 📱 PWA Features

The application includes Progressive Web App capabilities:
- Service worker for offline functionality
- Caching strategies for improved performance
- Installable on mobile devices
- Background sync capabilities

## 🎨 Design System

### Color Palette
- **Primary**: #7c5c3e (Warm brown)
- **Secondary**: #bfa382 (Light brown)
- **Background**: #f8f5f2 (Soft cream)
- **Text**: #3e2c1c (Dark brown)
- **Accent**: #a68a6d (Muted brown)

### Typography
- **Primary Font**: DM Sans
- **Fallbacks**: Segoe UI, Roboto, system fonts

### Design Principles
- Soft, beige and cream backgrounds
- Muted wood tones
- Accessible color contrast ratios
- Mobile-first responsive design

## 📋 Form Validation

### Modal Form Schema
- **Name**: Required, max 50 characters
- **Email**: Required, valid email format
- **Phone**: Required, UK phone number format
- **Membership**: Required selection
- **Message**: Required, 10-250 characters

### Contact Form
- Same validation as modal form
- Defaults to "consultation" membership type
- reCAPTCHA v3 protection

## 🔒 Security Features

- **reCAPTCHA v3**: Invisible bot protection
- **Form Validation**: Client-side and server-side validation
- **Environment Variables**: Secure configuration management
- **HTTPS**: Production-ready security

## 📊 Performance

- **Lazy Loading**: Optimized image and video loading
- **Service Worker**: Caching for offline functionality
- **Code Splitting**: Efficient bundle sizes
- **Optimized Assets**: Compressed images and videos

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop build folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build folder to S3 bucket
- **Firebase Hosting**: Use Firebase CLI

## 📝 Logging

The application uses Pino for structured logging:
- **Development**: Info and error level logs
- **Production**: Error level logs only
- **Service Worker**: Registration and update logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions about this project:
- **Email**: info@reignivy.com
- **Phone**: (555) 123-4567
- **Address**: 123 Wellness Avenue, Purley, Surrey CR8 1AB, United Kingdom

---

Built with ❤️ for Reign Ivy Wellness 