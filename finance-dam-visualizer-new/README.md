# Financial Dam Visualizer

A React application that visualizes personal finances as a water dam system for the Capital One Hackathon. The application helps users understand their financial health through intuitive visualizations and provides personalized future scenarios based on their dream life goals.

## Key Features

- **Interactive Dam Visualization**: Visual representation of your financial health as a water dam
- **Questionnaire-Driven Experience**: Fill out a questionnaire to provide your financial information 
- **Dream Life Planning**: Describe your ideal future life and receive multiple scenarios to achieve it
- **Multiple Career Trajectories**: View different pathways with visual dam representations for each
- **Financial Insights**: Receive personalized financial insights based on your data
- **Firebase Integration**: Firebase Cloud Functions for calculations and Firestore for data synchronization

## Project Structure

The project follows a clean, component-based architecture:

```
src/
  ├── components/      # Reusable UI components
  │   ├── layout/      # Layout components (Navbar, Footer)
  │   ├── questionnaire/ # Questionnaire form components
  │   ├── scenarios/   # Future scenario visualization components
  │   ├── ui/          # Generic UI components
  │   └── visualizations/ # Dam visualization components
  ├── context/         # React context for global state management
  │   └── DataContext.js  # Financial data context
  ├── hooks/           # Custom React hooks
  ├── pages/           # Page components
  │   ├── HomePage.js            # Landing page
  │   ├── QuestionnairePage.js   # Financial questionnaire
  │   ├── DashboardPage.js       # User dashboard with current visualization
  │   ├── FutureScenarioPage.js  # Future scenarios page
  │   └── NotFoundPage.js        # 404 error page
  ├── services/        # External service integrations
  │   └── firebase.js  # Firebase configuration and utilities
  ├── utils/           # Utility functions
  ├── App.js           # Main application component
  └── index.js         # Application entry point
```

## Technology Stack

- **React**: Front-end framework
- **React Router**: Navigation and routing
- **Styled Components**: CSS-in-JS styling
- **Firebase**: Cloud Functions and Firestore database
- **Recharts**: Data visualization (for charts)

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm 7.x or higher
- Firebase project (for Cloud Functions and Firestore)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-dam-visualizer.git
cd finance-dam-visualizer
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Set up Firestore Database
   - Set up Cloud Functions (for scenario generation and financial insights)
   - Add your Firebase configuration to `src/services/firebase.js`

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Flow

1. **Questionnaire**: Users start directly with the financial questionnaire
2. **Questionnaire**: Users fill out their financial information and describe their dream life
3. **Dashboard**: Users see their current financial state visualized as a water dam
4. **Future Scenarios**: Users explore different career/financial scenarios that could help them achieve their dream life, each with its own dam visualization and detailed steps

## Customization

- **Styling**: The application uses CSS variables defined in `src/index.css` for easy theming
- **Firebase Config**: Update the Firebase configuration in `src/services/firebase.js` with your project details
- **Mock Data**: You can modify the mock scenarios in `src/pages/FutureScenarioPage.js`

## License

This project was created for the Capital One Hackathon and is not licensed for commercial use.

## Acknowledgments

- Capital One for providing the hackathon opportunity
- Financial visualization community for inspiration