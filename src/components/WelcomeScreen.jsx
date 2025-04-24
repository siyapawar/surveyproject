/** @format */

import React from "react";

export function WelcomeScreen({ onStart }) {
	return (
		// Use standard CSS classes
		<div className="content-card fade-in">
			<h1 className="welcome-title">Welcome to the Survey</h1>
			<div className="welcome-text-container">
				<p className="welcome-text-primary">
					Thank you for participating. Your feedback is valuable.
				</p>
				<p className="welcome-text-secondary">
					Please answer the questions honestly.
				</p>
			</div>
			<button onClick={onStart} className="button button-primary button-start">
				Start Survey
			</button>
		</div>
	);
}
