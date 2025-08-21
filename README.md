# ForecastBTC 🚀

> **The premier Bitcoin-powered prediction market platform built on Stacks blockchain**

ForecastBTC enables users to trade predictions using Bitcoin (sBTC) on real-world events across politics, sports, economics, and technology. Built with cutting-edge blockchain technology and a sleek, professional interface.

![ForecastBTC Preview](./public/preview.png)

## 🌟 Features

### Core Functionality
- **🔮 Prediction Markets**: Trade on real-world events with Bitcoin
- **💰 sBTC Integration**: Native Bitcoin transactions via Stacks
- **📊 Real-time Analytics**: Live market data and price charts
- **👛 Wallet Integration**: Connect with Leather, Xverse, and other Stacks wallets
- **📱 Mobile Responsive**: Optimized for all devices

### Advanced Features
- **🎯 Market Creation**: Create custom prediction markets
- **📈 Portfolio Management**: Track positions and performance
- **🏆 Leaderboards**: Compete with top traders
- **🔧 User Settings**: Customize your trading experience
- **⚡ Real-time Updates**: Live market movements and notifications

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React

### Blockchain
- **Blockchain**: Stacks (Bitcoin Layer 2)
- **Smart Contracts**: Clarity language
- **Wallet Integration**: Stacks Connect
- **Bitcoin**: sBTC for native Bitcoin transactions

### Design
- **Font**: Space Grotesk (crypto-optimized typography)
- **Theme**: Dark-first with Bitcoin orange accents
- **Components**: Custom UI components with consistent design system
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/forecastbtc.git
   cd forecastbtc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
forecastbtc/
├── public/                 # Static assets
│   ├── forecast-btc-icon.svg
│   └── images/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── markets/       # Market-related components
│   │   ├── trading/       # Trading interface components
│   │   └── ui/            # Basic UI components
│   ├── pages/             # Page components
│   │   ├── HomePage.tsx
│   │   ├── MarketsPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── CreateMarketPage.tsx
│   ├── services/          # External services
│   │   └── walletService.ts
│   ├── store/             # Global state management
│   │   └── useAppStore.ts
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles & design tokens
├── tailwind.config.ts     # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Bitcoin Orange (`hsl(25, 100%, 60%)`)
- **Background**: Dark (`hsl(240, 10%, 4%)`)
- **Cards**: Dark Gray (`hsl(240, 6%, 10%)`)
- **Text**: High contrast whites and grays
- **Success**: Green (`hsl(142, 71%, 45%)`)
- **Destructive**: Red (`hsl(0, 84%, 60%)`)

### Typography
- **Font Family**: Space Grotesk (designed for crypto/fintech)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Fluid typography scaling

### Components
All components use semantic tokens from the design system:
- Consistent spacing with `--spacing-*` tokens
- Standardized border radius with `--radius-*` tokens
- Themed colors with CSS custom properties

## 🔗 Blockchain Integration

### Stacks Blockchain
ForecastBTC is built on Stacks, a Bitcoin Layer 2 that enables smart contracts while settling on Bitcoin.

**Key Benefits:**
- Native Bitcoin transactions via sBTC
- Decentralized and trustless
- Lower fees than Bitcoin mainnet
- Fast transaction finality

### Smart Contracts (Planned)
```clarity
;; Market Contract Structure
(define-map markets 
  { market-id: uint }
  { 
    title: (string-ascii 256),
    resolution-date: uint,
    total-yes-stake: uint,
    total-no-stake: uint,
    resolved: bool,
    outcome: (optional bool)
  }
)

;; Core Functions
- create-market
- place-stake  
- resolve-market
- claim-rewards
```

### Wallet Integration
Supports major Stacks wallets:
- **Leather Wallet** (Recommended)
- **Xverse Wallet**
- **Asigna Wallet**

## 📊 Market Categories

- **🏛 Politics**: Elections, policy outcomes, government decisions
- **⚽ Sports**: Match results, tournament winners, player performance
- **📈 Economics**: Market predictions, inflation, interest rates
- **🌡 Climate**: Weather events, environmental milestones
- **💻 Technology**: Product launches, adoption metrics, innovations

## 🎯 User Journey

1. **Discovery**: Browse trending markets on homepage
2. **Connection**: Connect Stacks wallet (Leather recommended)
3. **Trading**: Place predictions with sBTC
4. **Monitoring**: Track positions in dashboard
5. **Resolution**: Claim rewards when markets resolve

## ⚙️ Environment Setup

### Development Environment Variables
Create a `.env.local` file:
```env
VITE_STACKS_NETWORK=testnet
VITE_APP_URL=http://localhost:3000
VITE_STACKS_API_URL=https://stacks-node-api.testnet.stacks.co
```

### Production Environment Variables
```env
VITE_STACKS_NETWORK=mainnet
VITE_APP_URL=https://forecastbtc.com
VITE_STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co
```

## 🧪 Testing

### Testing Stack (Coming Soon)
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright
- **Blockchain Tests**: Clarinet for smart contract testing

```bash
# Run tests (when implemented)
npm run test
npm run test:e2e
npm run test:contracts
```

## 🚀 Deployment

### Frontend Deployment
Recommended platforms:
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**

### Smart Contract Deployment
```bash
# Deploy to Stacks testnet
clarinet deploy --network testnet

# Deploy to Stacks mainnet  
clarinet deploy --network mainnet
```

## 🔐 Security

### Frontend Security
- Input sanitization and validation
- XSS protection
- CSRF tokens
- Secure wallet connections

### Smart Contract Security
- Formal verification planned
- Access control patterns
- Reentrancy protection
- Input validation

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Maintain test coverage
- Follow the existing code style
- Update documentation as needed

## 📈 Roadmap

### Phase 1: MVP (Current)
- ✅ Core UI/UX implementation
- ✅ Wallet integration setup
- ✅ Market discovery interface
- 🔄 Smart contract development
- 🔄 Basic trading functionality

### Phase 2: Enhanced Features
- 📊 Advanced charting and analytics
- 🔔 Push notifications
- 📱 Mobile app (React Native)
- 🤖 AI-powered market insights
- 🏆 Advanced gamification

### Phase 3: Scaling
- 🌐 Multi-language support
- 📈 Institutional features
- 🔌 API for third-party integrations
- 🏢 White-label solutions
- 📊 Advanced analytics dashboard

## 🆘 Support & Community

### Getting Help
- **Documentation**: Comprehensive guides and API docs
- **Discord**: Join our community server
- **GitHub Issues**: Report bugs and request features
- **Email**: support@forecastbtc.com

### Community Links
- **Website**: https://forecastbtc.com
- **Twitter**: @ForecastBTC
- **Discord**: [Join our server]
- **Telegram**: @ForecastBTC
- **Medium**: Technical blog and updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stacks Foundation** for blockchain infrastructure
- **Bitcoin Community** for inspiration and innovation  
- **Open Source Contributors** who make projects like this possible
- **Design Community** for UI/UX inspiration

## 🔧 Troubleshooting

### Common Issues

**Wallet Connection Issues**
- Ensure you have a Stacks wallet installed
- Check that you're on the correct network (testnet/mainnet)
- Clear browser cache and try again

**Build Issues**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check for any TypeScript errors

**Performance Issues**
- Enable hardware acceleration in your browser
- Close unnecessary browser tabs
- Check your internet connection

### Getting Support
If you encounter issues not covered here, please:
1. Check existing GitHub issues
2. Join our Discord for community support
3. Create a detailed bug report with reproduction steps

---

**Built with ❤️ by the ForecastBTC team**

*Predict the future, powered by Bitcoin.*
