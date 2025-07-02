# Natural State Staff Portal

A modern, responsive Angular-based staff portal application for Natural State organization, providing comprehensive HR and Financial services management.

## 🌟 Features

### 🏠 Dashboard
- **Personalized Welcome**: Dynamic greeting with user information
- **Service Cards**: Quick access to Finance, HR, Payroll, Procurement, Approval, Inventory, and Document services
- **Real-time Metrics**: Live dashboard showing approved leaves, pending requests, trainings, timesheets, and appraisals
- **Leave Balances**: Interactive table showing current leave balances with real-time updates
- **Finance Management**: Overview of imprest balances, approved requests, and expense claims

### 💰 Financial Services
- **Activity Requests**: Create, view, edit, and manage activity requests with full approval workflow
- **Travel Authorization/Imprest Requests**: Comprehensive travel and imprest management system
- **Fund Claims**: Submit and track fund claim requests with approver workflows
- **Purchase Requisitions**: Create and manage purchase requests with approval chains
- **Stores Requisitions**: Inventory and stores request management
- **Imprest Surrender**: Track and manage imprest surrenders

### 👥 HR Services
- **Leave Applications**: Submit, view, and manage leave requests with balance tracking
- **Leave Balances**: Real-time leave balance monitoring across all leave types
- **Leave Recall**: Manage leave cancellations and recalls
- **Timesheet Management**: Track and submit timesheets
- **Training Needs**: Submit training requirements and requests
- **Training Applications**: Apply for and track training programs

### 🔐 Authentication & Security
- **Secure Login**: Employee number and password authentication
- **CAPTCHA Protection**: Mathematical CAPTCHA for enhanced security
- **Password Reset**: Secure password reset with employee verification
- **Session Management**: Automatic session handling and token refresh

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices with touch-friendly interfaces
- **Tablet Support**: Seamless experience across tablet devices
- **Desktop Excellence**: Full-featured desktop experience
- **Adaptive Tables**: Smart table-to-card conversion on mobile devices
- **Hamburger Navigation**: Collapsible sidebar for mobile navigation

## 🛠 Technology Stack

### Frontend
- **Angular 20**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with CSS preprocessor
- **RxJS**: Reactive programming for data management
- **Angular Router**: Client-side routing and navigation

### Architecture
- **Standalone Components**: Modern Angular architecture
- **Service-Based**: Centralized data management with services
- **Reactive Forms**: Form handling with validation
- **Lazy Loading**: Optimized performance with code splitting
- **Modular Design**: Clean separation of concerns

### Development Tools
- **Angular CLI**: Project scaffolding and build tools
- **TypeScript Compiler**: Static type checking
- **SCSS Preprocessor**: Advanced CSS features
- **ESLint**: Code quality and consistency

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Angular CLI** (v20 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd natural-state-staff-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build:prod
# or
ng build --configuration production
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/           # Application components
│   │   ├── shared/          # Reusable components
│   │   │   ├── header/      # Header component
│   │   │   ├── sidebar/     # Navigation sidebar
│   │   │   ├── footer/      # Footer component
│   │   │   └── loading/     # Loading indicator
│   │   ├── dashboard/       # Dashboard page
│   │   ├── login/           # Authentication
│   │   ├── profile/         # User profile
│   │   ├── activity-requests/ # Financial services
│   │   ├── hr-services/     # HR management
│   │   └── ...              # Other feature components
│   ├── services/            # Application services
│   │   ├── auth.service.ts  # Authentication service
│   │   ├── data.service.ts  # Data management
│   │   ├── api.service.ts   # API communication
│   │   └── ...              # Other services
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── utils/               # Utility functions
│   └── app.routes.ts        # Application routing
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── global_styles.css        # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#214098` - Main brand color
- **Secondary Blue**: `#1a3480` - Hover states and accents
- **Accent Green**: `#68B14E` - Success states and highlights
- **Light Green**: `#7BC142` - Hover states for green elements
- **Background**: `#E5F0FF` - Light blue background
- **White**: `#ffffff` - Cards and content areas
- **Text Dark**: `#333333` - Primary text color
- **Text Light**: `#6c757d` - Secondary text color

### Typography
- **Font Family**: 'Poppins', sans-serif
- **Headings**: 600-700 font weight
- **Body Text**: 400-500 font weight
- **Small Text**: 300-400 font weight

### Responsive Breakpoints
- **Mobile**: `< 600px`
- **Tablet**: `600px - 900px`
- **Desktop Small**: `900px - 1200px`
- **Desktop Large**: `> 1200px`

## 🔧 Configuration

### Environment Variables
Configure the application in `src/environments/`:

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Natural State HR System',
  version: '1.0.0'
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.naturalstate.com/api',
  appName: 'Natural State HR System',
  version: '1.0.0'
};
```

### API Configuration
The application uses a service-based architecture for API communication:

```typescript
// Base API URL configuration
private baseUrl = environment.apiUrl;

// Authentication endpoints
AUTH: {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh'
}
```

## 📱 Mobile Features

### Responsive Tables
- **Desktop**: Full-featured data tables with sorting and pagination
- **Mobile**: Card-based layout with essential information
- **Touch-Friendly**: Large buttons and touch targets
- **Swipe Navigation**: Intuitive mobile gestures

### Mobile Navigation
- **Hamburger Menu**: Collapsible sidebar navigation
- **Touch Optimization**: Finger-friendly interface elements
- **Adaptive Layout**: Content adjusts to screen size
- **Performance**: Optimized for mobile performance

## 🔒 Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **Session Management**: Secure session handling
- **Route Guards**: Protected routes and permissions

### Data Protection
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery protection
- **Secure Headers**: Security-focused HTTP headers

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm run test

# End-to-end tests
npm run e2e

# Test coverage
npm run test:coverage
```

### Testing Strategy
- **Unit Tests**: Component and service testing
- **Integration Tests**: Feature workflow testing
- **E2E Tests**: Complete user journey testing
- **Accessibility Tests**: WCAG compliance testing

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build:prod

# Build with specific environment
ng build --configuration staging
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Container**: Docker deployment
- **Traditional**: Apache, Nginx hosting

## 📊 Performance

### Optimization Features
- **Lazy Loading**: Route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Compressed production builds
- **Caching**: Browser and service worker caching
- **Image Optimization**: Optimized asset delivery

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting consistency
- **Conventional Commits**: Standardized commit messages

### Component Guidelines
- **Standalone Components**: Use Angular standalone components
- **Single Responsibility**: One component per feature
- **Reusability**: Create reusable components in shared/
- **Performance**: Implement OnPush change detection where appropriate

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- **API Documentation**: Available at `/docs/api`
- **Component Library**: Storybook documentation
- **User Guide**: Available at `/docs/user-guide`

### Getting Help
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: technical@naturalstate.com
- **Documentation**: Comprehensive inline documentation

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release with full HR and Finance modules
- ✅ Responsive design implementation
- ✅ Authentication and security features
- ✅ Mobile-optimized interface
- ✅ Dashboard with real-time metrics

### Upcoming Features
- 🔄 Advanced reporting and analytics
- 🔄 Document management system
- 🔄 Mobile app (React Native)
- 🔄 Advanced workflow automation
- 🔄 Integration with external systems

## 👥 Team

**Development Team**
- Frontend Development: Angular/TypeScript specialists
- UI/UX Design: Modern, accessible design principles
- Backend Integration: RESTful API integration
- Quality Assurance: Comprehensive testing strategy

**Powered by**
[Systems Reengineered Ltd.](https://sysre.co.ke/) - Technology solutions and software development

---

**Natural State Staff Portal** - Empowering organizations with modern, efficient staff management solutions.