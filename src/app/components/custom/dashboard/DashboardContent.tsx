'use client'

import { useAuth } from '@/contexts/AuthContext'

export function DashboardContent() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Welcome back, {user?.user_metadata.full_name}
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Carbon Footprint</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">2.4 tCO₂</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Energy Usage</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">450 kWh</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Water Usage</h3>
          <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">2,500 L</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reduced carbon footprint by 15%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Installed solar panels
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 week ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reduced water usage by 20%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 