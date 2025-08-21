import { ForecastIcon } from '@/components/icons/ForecastIcon';
import { Bitcoin, Github, Twitter, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const links = {
    platform: [
      { name: 'Markets', href: '/markets' },
      { name: 'Create Market', href: '/create-market' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'FAQ', href: '/faq' }
    ],
    community: [
      { name: 'Discord', href: 'https://discord.gg/stacks', external: true },
      { name: 'Twitter', href: 'https://twitter.com/forecastbtc', external: true },
      { name: 'GitHub', href: 'https://github.com/forecastbtc', external: true },
      { name: 'Blog', href: '/blog' }
    ],
    ecosystem: [
      { name: 'Stacks Blockchain', href: 'https://stacks.co', external: true },
      { name: 'sBTC', href: 'https://sbtc.tech', external: true },
      { name: 'Bitcoin', href: 'https://bitcoin.org', external: true },
      { name: 'Clarity', href: 'https://clarity-lang.org', external: true }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Risk Disclosure', href: '/risks' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <ForecastIcon className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-bitcoin bg-clip-text text-transparent">
                ForecastBTC
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The world's first Bitcoin-native prediction market platform built on Stacks blockchain.
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Bitcoin className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Powered by Bitcoin</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {links.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {links.community.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center"
                    >
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  ) : (
                    <Link 
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h3 className="font-semibold mb-4">Ecosystem</h3>
            <ul className="space-y-2">
              {links.ecosystem.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 ForecastBTC. All rights reserved. Built on Stacks & Bitcoin.
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-muted-foreground">Secured by</div>
            <div className="flex items-center space-x-2">
              <img 
                src="https://stacks.co/favicon.ico" 
                alt="Stacks" 
                className="h-4 w-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-xs font-medium text-primary">Stacks</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}