/** @format */

import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client

export function UserStatsDashboard() {
	const [uniqueUsers, setUniqueUsers] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchUserStats() {
			setLoading(true);
			setError(null);
			try {
				// Fetch the count of distinct users who submitted responses
				// Note: Supabase count on distinct columns directly can be tricky.
				// A common workaround is fetching distinct values and counting client-side,
				// or using an RPC function if performance is critical for large datasets.
				// Here, we fetch distinct submission_ids.
				const { data, error: fetchError } = await supabase
					.from("survey_responses")
					.select("submission_id"); // Select the correct column

				if (fetchError) throw fetchError;

				// Calculate unique users from the fetched data
				const submissionIds = data
					? data.map((item) => item.submission_id)
					: []; // Use submission_id
				const uniqueUserCount = new Set(submissionIds).size;
				setUniqueUsers(uniqueUserCount);

				// If you have an RPC function like 'get_distinct_user_count':
				// const { data, error: rpcError } = await supabase.rpc('get_distinct_user_count');
				// if (rpcError) throw rpcError;
				// setUniqueUsers(data || 0);
			} catch (err) {
				console.error("Error fetching user stats:", err);
				setError("Failed to load user statistics. Please try again later.");
			} finally {
				setLoading(false);
			}
		}

		fetchUserStats();
	}, []);

	return (
		<div className="dashboard-container fade-in">
			<h1 className="dashboard-title">User Statistics Dashboard</h1>
			{loading && <p className="dashboard-text">Loading user stats...</p>}
			{error && <p className="submit-error">{error}</p>}
			{!loading && !error && (
				<div>
					<p className="dashboard-text">
						Number of unique survey submissions:
						<strong> {uniqueUsers}</strong>
					</p>
					{/* More user stats can be added here */}
				</div>
			)}
		</div>
	);
}
