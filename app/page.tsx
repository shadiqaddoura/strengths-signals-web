"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Barbell,
  CalendarBlank,
  ChartBar,
  ChartLineUp,
  CheckCircle,
  ClipboardText,
  Gear,
  Pulse,
  Target,
  TrendUp,
  Warning,
  X,
} from "@phosphor-icons/react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dashboardSnapshot,
  initialRecentWorkouts,
  progressSeries,
  type RecentWorkout,
} from "../lib/workout-data";

const navItems = [
  { label: "Dashboard", icon: TrendUp },
  { label: "Workouts", icon: CalendarBlank },
  { label: "Exercises", icon: ChartBar },
  { label: "Progress", icon: ChartLineUp },
  { label: "History", icon: ClipboardText },
  { label: "Goals", icon: Target },
  { label: "Settings", icon: Gear },
];

const chartColors = {
  legPress: "#9ece6a",
  chestPress: "#7aa2f7",
  latPulldown: "#7dcfff",
};

function MetricCard({ icon: Icon, value, suffix, label, helper }: {
  icon: typeof CalendarBlank;
  value: string;
  suffix?: string;
  label: string;
  helper: string;
}) {
  return (
    <section className="metric-card">
      <Icon size={34} weight="bold" aria-hidden="true" />
      <div>
        <div className="metric-value">{value}{suffix && <span>{suffix}</span>}</div>
        <p className="metric-label">{label}</p>
        <p className="metric-helper">{helper}</p>
      </div>
    </section>
  );
}

function ProgressMetric() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const progress = dashboardSnapshot.sessionsThisWeek / dashboardSnapshot.weeklyGoal;
  const ringData = [{ name: "Done", value: progress * 100 }, { name: "Remaining", value: 100 - progress * 100 }];
  return (
    <section className="metric-card progress-metric">
      <div className="progress-ring" aria-label="60 percent of weekly workout goal complete">
        {mounted ? <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={ringData} dataKey="value" innerRadius={25} outerRadius={34} startAngle={90} endAngle={-270} stroke="none" fill="#9ece6a" isAnimationActive={false}>
              {ringData.map((_, index) => <Cell key={index} fill={index === 0 ? "#9ece6a" : "#292e42"} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer> : <span className="ring-fallback" />}
      </div>
      <div>
        <div className="metric-value">{dashboardSnapshot.sessionsThisWeek}<span> / {dashboardSnapshot.weeklyGoal}</span></div>
        <p className="metric-label">Workouts This Week</p>
        <p className="metric-helper">{dashboardSnapshot.weekLabel}</p>
      </div>
    </section>
  );
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((entry) => <span key={entry.name} style={{ color: entry.color }}>{entry.name}: {entry.value} kg</span>)}
    </div>
  );
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isModalOpen, setModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState<RecentWorkout[]>(initialRecentWorkouts);
  const [successMessage, setSuccessMessage] = useState("");

  const stats = useMemo(() => ({
    ...dashboardSnapshot,
    sessionsThisWeek: dashboardSnapshot.sessionsThisWeek + Math.max(0, workouts.length - initialRecentWorkouts.length),
    sessionsThisMonth: dashboardSnapshot.sessionsThisMonth + Math.max(0, workouts.length - initialRecentWorkouts.length),
  }), [workouts.length]);

  function submitWorkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const focus = String(form.get("focus"));
    const notes = String(form.get("notes") || "Workout logged from dashboard");
    setWorkouts((current) => [{
      id: `local-${Date.now()}`,
      date: "Wed, Aug 26, 2026",
      focus,
      exercises: "New workout",
      topSets: [],
      notes,
    }, ...current]);
    setModalOpen(false);
    setSuccessMessage("Workout added to this UI preview.");
    setTimeout(() => setSuccessMessage(""), 3500);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Barbell size={58} weight="bold" aria-hidden="true" />
          <div><span>Strength</span><strong>Signals</strong></div>
        </div>
        <nav aria-label="Main navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={activeNav === label ? "active" : ""} onClick={() => setActiveNav(label)}>
              <Icon size={25} weight={activeNav === label ? "bold" : "regular"} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-date">
          <CalendarBlank size={26} weight="bold" aria-hidden="true" />
          <strong>Wed, Aug 26, 2026</strong>
          <span>Week: Aug 22–28, 2026</span>
          <span>(Sat–Fri)</span>
        </div>
      </aside>

      <section className="dashboard-canvas">
        <header className="dashboard-header">
          <div className="mobile-brand"><Barbell size={28} weight="bold" /><strong>Strength Signals</strong></div>
          <div className="metrics-row">
            <ProgressMetric />
            <MetricCard icon={CalendarBlank} value={String(stats.sessionsThisMonth)} label="Sessions in August" helper={dashboardSnapshot.monthLabel} />
            <MetricCard icon={Pulse} value={String(dashboardSnapshot.averageRpe)} label="Average Logged RPE" helper="All logged sessions" />
          </div>
          <button className="primary-button" onClick={() => setModalOpen(true)}>Log workout</button>
        </header>

        <section className="chart-section">
          <div className="section-heading">
            <div><h1>Progression Overview <span>(kg)</span></h1><p>Logged working weights over time</p></div>
            {activeNav !== "Dashboard" && <span className="view-pill">Previewing {activeNav}</span>}
          </div>
          <div className="chart-wrap" role="img" aria-label="Line chart showing Leg Press increasing from 70 to 90 kilograms, Chest Press from 50 to 70, and Lat Pulldown from 55 to 70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressSeries} margin={{ top: 18, right: 28, bottom: 4, left: -8 }}>
                <CartesianGrid stroke="#292e42" strokeDasharray="5 6" vertical />
                <XAxis dataKey="date" stroke="#565f89" tick={{ fill: "#c0caf5", fontSize: 13 }} axisLine={{ stroke: "#3b4261" }} tickLine={false} />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} stroke="#565f89" tick={{ fill: "#c0caf5", fontSize: 13 }} axisLine={{ stroke: "#3b4261" }} tickLine={false} unit="" />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#565f89", strokeDasharray: "4 4" }} />
                <Legend verticalAlign="top" align="right" height={48} iconType="plainline" wrapperStyle={{ color: "#c0caf5", fontSize: 13 }} />
                <Line name="Leg Press" dataKey="legPress" connectNulls stroke={chartColors.legPress} strokeWidth={3} dot={{ r: 5, fill: chartColors.legPress, strokeWidth: 0 }} activeDot={{ r: 7 }} />
                <Line name="Chest Press Machine" dataKey="chestPress" connectNulls stroke={chartColors.chestPress} strokeWidth={3} dot={{ r: 5, fill: chartColors.chestPress, strokeWidth: 0 }} activeDot={{ r: 7 }} />
                <Line name="Lat Pulldown" dataKey="latPulldown" connectNulls stroke={chartColors.latPulldown} strokeWidth={3} dot={{ r: 5, fill: chartColors.latPulldown, strokeWidth: 0 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="recent-section">
          <div className="recent-heading"><div><h2>Recent Workouts</h2><p>Your newest logged sessions</p></div><span>{workouts.length} shown</span></div>
          <div className="workout-table" role="table" aria-label="Recent workouts">
            <div className="table-row table-head" role="row">
              <span>Date</span><span>Focus</span><span>Exercises</span><span>Top Set (kg)</span><span>Notes</span>
            </div>
            {workouts.slice(0, 4).map((workout) => (
              <div className="table-row" role="row" key={workout.id}>
                <span data-label="Date">{workout.date}</span>
                <strong data-label="Focus">{workout.focus}</strong>
                <span data-label="Exercises">{workout.exercises}</span>
                <span data-label="Top Set" className="top-sets">{workout.topSets.length ? workout.topSets.map((set) => <em key={set.name} className={set.color}>{set.name} {set.value}</em>) : "—"}</span>
                <span data-label="Notes">{workout.notes}</span>
              </div>
            ))}
          </div>
          <div className="sync-alert" role="status"><Warning size={23} weight="bold" /><span>Goal count needs sync: 4 shown, 3 logged.</span></div>
        </section>
      </section>

      {successMessage && <div className="toast"><CheckCircle size={22} weight="fill" />{successMessage}</div>}

      {isModalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="log-title">
            <button className="close-button" onClick={() => setModalOpen(false)} aria-label="Close dialog"><X size={22} /></button>
            <span className="eyebrow">UI preview</span>
            <h2 id="log-title">Log today’s workout</h2>
            <p>This stays in the browser for now. A database can replace the mock data layer later.</p>
            <form onSubmit={submitWorkout}>
              <label>Workout focus<select name="focus" defaultValue="Upper"><option>Upper</option><option>Lower</option><option>Cardio</option><option>Mobility</option><option>Rest / Recovery</option></select></label>
              <label>Notes<textarea name="notes" placeholder="How did the session feel?" rows={3} /></label>
              <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setModalOpen(false)}>Cancel</button><button className="primary-button" type="submit">Save workout</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
