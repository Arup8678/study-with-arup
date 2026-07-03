"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Search, Flame, Award, MapPin } from "lucide-react";
import { dbService } from "@/services/db";
import { LeaderboardUser } from "@/types";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);
  const [activePeriod, setActivePeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dbService.getLeaderboard(activePeriod).then(data => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, [activePeriod]);

  useEffect(() => {
    if (search.trim()) {
      const q = search.toLowerCase();
      setFilteredUsers(users.filter(
        u => u.name.toLowerCase().includes(q) || u.district.toLowerCase().includes(q)
      ));
    } else {
      setFilteredUsers(users);
    }
  }, [search, users]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-left">
      
      {/* Title */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
          <Trophy size={28} className="text-amber-500 fill-amber-500" />
          West Bengal State Leaderboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
          Track and compare your learning progress with aspirants state-wide. Unlock study XP daily to climb districts and state charts!
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
        
        {/* Period Filter Toggles */}
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activePeriod === period
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-650 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Search District/Username */}
        <div className="relative flex-grow max-w-xs">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search district or candidate..."
            className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-xl py-1.5 pl-8 pr-3 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
          />
        </div>

      </div>

      {/* Leaderboard Table list */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-750 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/30">
                <th className="py-3 px-6 text-center w-16">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-6 text-right">Practice XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-350">
              {filteredUsers.map((user) => {
                const isTop3 = user.rank <= 3;
                
                return (
                  <tr 
                    key={user.rank}
                    className={`hover:bg-slate-50/40 dark:hover:bg-slate-850/40 transition-colors ${
                      user.name === "Bengali Learner" // matches our default profile username
                        ? "bg-blue-50/50 dark:bg-blue-900/10 font-semibold"
                        : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-4 px-6 text-center">
                      {isTop3 ? (
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mx-auto ${
                          user.rank === 1 ? "bg-amber-100 text-amber-600 border border-amber-200" :
                          user.rank === 2 ? "bg-slate-100 text-slate-500 border border-slate-250" :
                          "bg-orange-100 text-orange-600 border border-orange-200"
                        }`}>
                          {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold">{user.rank}</span>
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-4 px-4 font-semibold text-slate-800 dark:text-slate-100">
                      {user.name}
                      {user.name === "Bengali Learner" && (
                        <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[8px] bg-blue-600 text-white font-bold tracking-wider uppercase">
                          You
                        </span>
                      )}
                    </td>

                    {/* District */}
                    <td className="py-4 px-4 text-xs text-slate-450 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {user.district}
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-0.5 text-xs text-orange-500 font-bold">
                        <Flame size={12} fill="currentColor" /> {user.streak}
                      </span>
                    </td>

                    {/* XP */}
                    <td className="py-4 px-6 text-right font-bold text-slate-800 dark:text-slate-200 font-mono text-xs">
                      {user.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
