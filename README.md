# Team Pulse Dashboard

A comprehensive productivity monitoring tool for internal teams, built with React, Redux Toolkit, and Tailwind CSS.

## 🎯 Project Overview

Team Pulse Dashboard allows organizations to monitor team productivity in real-time. It provides different views for Team Leads and Team Members, enabling efficient task management and status tracking.

### Purpose
- Monitor team member statuses in real-time
- Assign and track task progress
- Visualize team productivity with charts
- Enable role-based access and functionality

## 🚀 Features

### Team Lead View
- **Status Monitor**: Real-time view of all team members with current status (Working, Break, Meeting, Offline)
- **Task Assignment**: Form to assign tasks with member selection, title, and due date
- **Filtering & Sorting**: Filter members by status and sort by name, status, or last active time
- **Analytics**: Visual charts showing team status distribution and activity trends
- **Team Overview**: Summary metrics and member count by status

### Team Member View
- **Status Updates**: Quick buttons to update personal status (Working, Break, Meeting, Offline)
- **Task Management**: View assigned tasks with progress tracking (0-100%)
- **Progress Control**: Adjust task progress in 10% increments
- **Personal Dashboard**: Focus on individual tasks and responsibilities

### Shared Features
- **Role Switching**: Toggle between Team Lead and Team Member views
- **Dark Mode**: Light/dark theme toggle
- **Auto-Reset**: Automatic status reset to "Offline" after 10 minutes of inactivity
- **Real-time Updates**: Live status updates using Redux state management
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with custom design tokens
- **Charts**: Recharts for data visualization
- **UI Components**: shadcn/ui component library
- **Build Tool**: Vite
- **Data Source**: RandomUser.me API for mock team data

## 📁 Project Structure

```
src/
├── app/
│   └── store.ts                 # Redux store configuration
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── Header.tsx               # App header with role toggle
│   ├── Sidebar.tsx              # Navigation sidebar
│   ├── DashboardContent.tsx     # Main dashboard layout
│   ├── MembersList.tsx          # Team members display
│   ├── TasksList.tsx            # Task management
│   ├── TaskModal.tsx            # Task assignment form
│   ├── MetricsCards.tsx         # Summary statistics
│   └── ChartsSection.tsx        # Data visualization
├── features/
│   ├── members/
│   │   └── membersSlice.ts      # Member state management
│   ├── tasks/
│   │   └── tasksSlice.ts        # Task state management
│   ├── role/
│   │   └── roleSlice.ts         # User role management
│   └── ui/
│       └── uiSlice.ts           # UI state (filters, theme, etc.)
├── hooks/
│   ├── useInactivityReset.ts    # Auto-reset to offline
│   └── useTheme.ts              # Dark mode toggle
└── pages/
    └── Dashboard.tsx            # Main dashboard page
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd team-pulse-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🎮 Usage

### Getting Started
1. **Role Selection**: Use the toggle in the header to switch between "Team Lead" and "Team Member" views
2. **Team Setup**: The app automatically fetches mock team data from RandomUser.me on first load
3. **Status Management**: Team members can update their status using the status buttons
4. **Task Assignment**: Team leads can assign tasks using the "Assign Task" button

### Team Lead Functions
- Monitor all team member statuses in real-time
- Filter members by status (Working, Break, Meeting, Offline, All)
- Sort members by name, status, or last active time
- Assign tasks to team members with titles and due dates
- View team analytics and productivity charts

### Team Member Functions
- Update personal status with one-click buttons
- View assigned tasks with progress tracking
- Adjust task progress in 10% increments
- Monitor personal productivity

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS:
- **Semantic tokens** for consistent theming
- **Professional blue/gray** color palette
- **Status-specific colors** for visual clarity
- **Responsive grid layouts** with clean cards
- **Dark mode support** with proper contrast ratios

## 🔧 State Management

Built with Redux Toolkit following best practices:
- **Normalized state** using `createEntityAdapter`
- **Async thunks** for API calls
- **Type-safe selectors** for derived state
- **Modular slice architecture** for maintainability

## 📊 Data Flow

1. **Initial Load**: Fetch team members from RandomUser.me API
2. **Status Updates**: Real-time status changes stored in Redux
3. **Task Management**: Task creation, assignment, and progress tracking
4. **Filtering/Sorting**: Client-side data manipulation using selectors
5. **Auto-reset**: Background monitoring for user inactivity

## 🎯 Bonus Features

- ✅ **Auto Reset**: Automatic offline status after 10 minutes of inactivity
- ✅ **Chart View**: Pie chart for status distribution and line chart for trends
- ✅ **Dark Mode**: Complete light/dark theme support
- ✅ **Advanced Filtering**: Multi-parameter filtering and sorting
- ✅ **Progress Tracking**: Visual progress bars with increment controls

## 🚀 Deployment

### Using Lovable (Recommended)
1. Open your [Lovable Project](https://lovable.dev/projects/7896fd5d-b2d2-4e12-a0d4-f4f9292d21e6)
2. Click "Share" → "Publish"
3. Your app will be deployed automatically

### Manual Deployment
The app can be deployed to any static hosting service:
- **Netlify**: Connect your repo for automatic deployments
- **Vercel**: Import project and deploy
- **GitHub Pages**: Use GitHub Actions for deployment

## 📝 Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Semantic component structure

### Performance
- Lazy loading for components
- Memoized selectors for Redux
- Optimized re-renders with proper state structure
- Responsive images and assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [RandomUser.me](https://randomuser.me/) for mock user data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Recharts](https://recharts.org/) for data visualization
- [Lucide React](https://lucide.dev/) for icons