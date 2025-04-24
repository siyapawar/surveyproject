/** @format */

import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { UserStatsDashboard } from "./components/UserStatsDashboard";
import { GrievanceDashboard } from "./components/GrievanceDashboard";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { SurveyForm } from "./components/SurveyForm";
import "./App.css"; // Ensure App.css is imported

function App() {
	return (
		<div className="app-container">
			{/* Use new CSS classes for the navigation bar */}
			<nav className="nav-bar">
				<NavLink
					to="/user-stats"
					className={({ isActive }) =>
						isActive ? "nav-link nav-link-active" : "nav-link"
					}>
					User Stats
				</NavLink>
				<NavLink
					to="/grievances"
					className={({ isActive }) =>
						isActive ? "nav-link nav-link-active" : "nav-link"
					}>
					Grievances
				</NavLink>
				<NavLink
					to="/analytics"
					className={({ isActive }) =>
						isActive ? "nav-link nav-link-active" : "nav-link"
					}>
					Analytics
				</NavLink>
				<NavLink
					to="/survey"
					className={({ isActive }) =>
						isActive ? "nav-link nav-link-active" : "nav-link"
					}>
					Survey Form
				</NavLink>
			</nav>

			<Routes>
				<Route path="/user-stats" element={<UserStatsDashboard />} />
				<Route path="/grievances" element={<GrievanceDashboard />} />
				<Route path="/analytics" element={<AnalyticsDashboard />} />
				<Route path="/survey" element={<SurveyForm />} />
				{/* Optional: Add a default route or redirect */}
				<Route path="/" element={<UserStatsDashboard />} />
			</Routes>
		</div>
	);
}

export default App;
