import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Car,
  Building2,
  ChevronDown,
  Settings,
  BarChart3,
} from 'lucide-react';
import { ChatWidget } from '@/components/chat/ChatWidget';
import type { TimeRange, Region } from '@/lib/types';

interface OEMLayoutProps {
  children: ReactNode;
}

export const OEMLayout = ({ children }: OEMLayoutProps) => {
  const location = useLocation();
  const [timeRange, setTimeRange] = useState<TimeRange>('30days');
  const [region, setRegion] = useState<Region>('All');

  const navItems = [
    { to: '/oem/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/oem/models', label: 'Models', icon: <Car className="w-5 h-5" /> },
    { to: '/oem/service-centers', label: 'Service Centers', icon: <Building2 className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-tesla-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/oem/dashboard" className="flex items-center gap-3 group">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-tesla-blue-600 to-blue-600 rounded-xl flex items-center justify-center shadow-glow-blue"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold gradient-text">OEM Control Center</span>
              </div>
            </Link>

            {/* Center - Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  <motion.div
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
                      isActive(item.to)
                        ? 'bg-tesla-blue-600 text-white shadow-glow-blue'
                        : 'glass-strong text-tesla-text-gray hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Right - Filters */}
            <div className="flex items-center gap-3">
              {/* Time Range Filter */}
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                  className="glass-strong px-4 py-2 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-tesla-blue-500 appearance-none pr-10 cursor-pointer"
                >
                  <option value="7days" className="bg-tesla-black">
                    7 Days
                  </option>
                  <option value="30days" className="bg-tesla-black">
                    30 Days
                  </option>
                  <option value="90days" className="bg-tesla-black">
                    90 Days
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tesla-text-gray pointer-events-none" />
              </div>

              {/* Region Filter */}
              <div className="relative">
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as Region)}
                  className="glass-strong px-4 py-2 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-tesla-blue-500 appearance-none pr-10 cursor-pointer"
                >
                  <option value="All" className="bg-tesla-black">
                    All Regions
                  </option>
                  <option value="North" className="bg-tesla-black">
                    North
                  </option>
                  <option value="South" className="bg-tesla-black">
                    South
                  </option>
                  <option value="East" className="bg-tesla-black">
                    East
                  </option>
                  <option value="West" className="bg-tesla-black">
                    West
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tesla-text-gray pointer-events-none" />
              </div>

              {/* Settings Icon */}
              <motion.button
                className="glass-strong w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Settings className="w-5 h-5 text-tesla-text-gray" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>

      {/* Chat Widget with context */}
      <ChatWidget
        title="OEM AI Assistant"
        context={{
          timeRange,
          region,
        }}
      />
    </div>
  );
};
