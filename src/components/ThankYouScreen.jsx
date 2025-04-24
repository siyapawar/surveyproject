/** @format */

import React from "react";

export function ThankYouScreen() {
	return (
		// Use standard CSS classes
		<div className="content-card fade-in">
			<h1 className="h1">Thank You!</h1>
			<p className="thank-you-text-primary">
				Your responses have been submitted successfully.
			</p>
			<p className="thank-you-text-secondary">
				We appreciate your time and feedback.
			</p>
			{/* Optional: Add a link back or further instructions */}
		</div>
	);
}
