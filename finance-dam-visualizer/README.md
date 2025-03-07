# Financial Dam Visualizer

A React application that visualizes personal finances as a water dam system for the Capital One Hackathon.

## Concept

This application uses the metaphor of a water dam to represent personal finances:

- **The Dam**: Represents your financial structure
- **Water Level**: Represents your net worth (assets minus liabilities)
- **Water Flow**: Represents your cash flow (income minus expenses)
- **Dam Gates**: Represents your control over spending and saving

## Features

- **Interactive Dam Visualization**: Visual representation of financial health
- **Flow Rate Control**: Simulate different income/expense scenarios
- **Spending Category Breakdown**: View spending distribution with interactive charts
- **Transaction History**: Track and filter transaction history
- **Financial Insights**: Receive personalized financial insights based on your data

## Technology Stack

- **React**: Front-end framework
- **Styled Components**: CSS styling
- **Recharts**: Data visualization
- **Axios**: API requests

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

This application integrates with the Capital One Hackathon API using the provided API key. The API service is configured in `src/services/api.js`.

## Project Structure

- `src/components/`: React components
  - `DamVisualization.js`: Main dam visualization component
  - `SpendingCategoryChart.js`: Pie chart for spending categories
  - `TransactionHistory.js`: Table of transaction history
  - `FinancialInsights.js`: Financial insights and recommendations
- `src/services/`: API and data services
  - `api.js`: Capital One API integration

## Future Enhancements

- Real-time data updates
- Financial goal tracking
- Predictive analytics for financial forecasting
- Mobile app version with notifications
- Integration with other financial institutions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## License

This project was created for the Capital One Hackathon and is not licensed for commercial use.

## Acknowledgments

- Capital One for providing the API and hackathon opportunity
- Financial visualization community for inspiration