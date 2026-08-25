export type RecentWorkout = {
  id: string;
  date: string;
  focus: string;
  exercises: string;
  topSets: { name: string; value: string; color: "lime" | "blue" | "mint" }[];
  rpe?: number;
  notes: string;
};

export const progressSeries = [
  { date: "Aug 10", legPress: 70, chestPress: null, latPulldown: null },
  { date: "Aug 16", legPress: null, chestPress: 50, latPulldown: 55 },
  { date: "Aug 17", legPress: 70, chestPress: null, latPulldown: null },
  { date: "Aug 19", legPress: null, chestPress: 70, latPulldown: 70 },
  { date: "Aug 24", legPress: 90, chestPress: null, latPulldown: null },
  { date: "Aug 25", legPress: null, chestPress: 70, latPulldown: 70 },
];

export const initialRecentWorkouts: RecentWorkout[] = [
  {
    id: "2026-08-23-01",
    date: "Sun, Aug 23, 2026",
    focus: "Cardio",
    exercises: "Treadmill",
    topSets: [],
    notes: "25 min jog / walk",
  },
  {
    id: "2026-08-24-01",
    date: "Mon, Aug 24, 2026",
    focus: "Legs",
    exercises: "Leg Press, Leg Extension, Leg Curl",
    topSets: [{ name: "Leg Press", value: "90 kg", color: "lime" }],
    notes: "Controlled working sets",
  },
  {
    id: "2026-08-25-01",
    date: "Tue, Aug 25, 2026",
    focus: "Upper Push/Pull",
    exercises: "Chest Press Machine, Lat Pulldown, Shoulder Press",
    topSets: [
      { name: "Chest Press", value: "70 kg", color: "blue" },
      { name: "Lat Pulldown", value: "70 kg", color: "mint" },
    ],
    notes: "Solid, balanced session",
  },
];

export const dashboardSnapshot = {
  sessionsThisWeek: 3,
  weeklyGoal: 5,
  sessionsThisMonth: 9,
  averageRpe: 6.7,
  weekLabel: "Aug 22–28, 2026 (Sat–Fri)",
  monthLabel: "August 2026",
};
