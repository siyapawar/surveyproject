/** @format */

import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client

export function AnalyticsDashboard() {
	const [totalResponses, setTotalResponses] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchAnalyticsData() {
			setLoading(true);
			setError(null);
			try {
				// Fetch total count of responses
				const { count, error: countError } = await supabase
					.from("survey_responses")
					.select("*", { count: "exact", head: true }); // Use head:true for count only

				if (countError) throw countError;

				setTotalResponses(count || 0);
			} catch (err) {
				console.error("Error fetching analytics data:", err);
				setError("Failed to load analytics data. Please try again later.");
			} finally {
				setLoading(false);
			}
		}

		fetchAnalyticsData();
	}, []);

	return (
		<div className="dashboard-container fade-in">
			<h1 className="dashboard-title">Analytics Dashboard</h1>
			{loading && <p className="dashboard-text">Loading analytics...</p>}
			{error && <p className="submit-error">{error}</p>}
			{!loading && !error && (
				<div>
					<p className="dashboard-text">
						Total survey responses recorded: <strong>{totalResponses}</strong>
					</p>
					{/* More analytics components can be added here */}
					{/* e.g., charts for response distribution, average scores */}
				</div>
			)}
		</div>
	);
}
