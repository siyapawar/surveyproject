/** @format */

import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client

export function GrievanceDashboard() {
	const [grievances, setGrievances] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchGrievances() {
			setLoading(true);
			setError(null);
			try {
				// Fetch responses that have non-empty grievance text
				const { data, error: fetchError } = await supabase
					.from("survey_responses")
					.select("submission_id, created_at, grievance_text")
					// Use gt (greater than) empty string to filter out nulls and empty strings
					.gt("grievance_text", "")
					.order("created_at", { ascending: false }); // Show newest first

				if (fetchError) {
					// Log the specific Supabase error
					console.error("Supabase fetch error:", fetchError);
					throw fetchError;
				}

				setGrievances(data || []);
			} catch (err) {
				console.error("Error fetching grievances:", err);
				setError("Failed to load grievances. Please try again later.");
			} finally {
				setLoading(false);
			}
		}

		fetchGrievances();
	}, []);

	return (
		<div className="dashboard-container fade-in">
			<h1 className="dashboard-title">Grievance Dashboard</h1>
			{loading && <p className="dashboard-text">Loading grievances...</p>}
			{error && <p className="submit-error">{error}</p>}
			{!loading && !error && (
				<div>
					{grievances.length > 0 ? (
						<ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
							{grievances.map((g) => (
								<li
									key={g.submission_id} // Use submission_id for the key
									style={{
										borderBottom: "1px solid var(--color-brown-100)",
										padding: "1rem 0",
										marginBottom: "1rem",
									}}>
									<p className="text-sm">
										Received: {new Date(g.created_at).toLocaleString()}
									</p>
									<p className="p">{g.grievance_text}</p>
								</li>
							))}
						</ul>
					) : (
						<p className="dashboard-text">No grievances submitted yet.</p>
					)}
				</div>
			)}
		</div>
	);
}
