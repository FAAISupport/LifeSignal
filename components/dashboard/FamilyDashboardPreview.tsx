"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Activity, TrendingUp } from "lucide-react";

export default function FamilyDashboardPreview() {
  const stats = [
    {
      label: "Check-ins Today",
      value: "14",
      sub: "All completed",
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Alerts",
      value: "2",
      sub: "Need follow-up",
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Response Rate",
      value: "96%",
      sub: "Last 30 days",
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border border-white/10">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-400">
            Live System
          </p>
          <h2 className="text-3xl font-bold mt-1">
            Family Safety Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Real-time monitoring of your loved one’s wellbeing
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-green-400 font-medium">
            All Systems Healthy
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`rounded-2xl p-5 border border-white/10 ${stat.bg} backdrop-blur`}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <Activity className="w-4 h-4 text-white/20" />
            </div>

            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className="text-xs mt-1 text-gray-500">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

        <div className="space-y-4">
          {[
            { time: "9:02 AM", text: "Check-in confirmed (SMS)" },
            { time: "Yesterday", text: "Voice check-in completed" },
            { time: "2 days ago", text: "Missed check-in → auto follow-up sent" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
              <div>
                <div className="text-sm">{item.text}</div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emotional reassurance footer */}
      <div className="mt-6 text-center text-sm text-gray-400">
        You’re connected. You’ll know if anything changes.
      </div>
    </div>
  );
}


