SIWARGA — Resident Information System

What it is:
SIWARGA is a web-based administration platform built for neighborhood associations (RT/RW) to digitize the day-to-day tasks that are normally handled on paper or scattered across WhatsApp groups — announcements, complaints, letter requests, dues collection, and resident feedback — all managed from a single, easy-to-use dashboard.

Core Features

For residents:

Dashboard overview — at a glance: current dues status, recent notifications, latest announcements, and the status of any complaints they've submitted
Personal records — residents can view their registered household data (ID number, family card number, address, etc.) without needing to visit the neighborhood office
Announcements feed — a running list of news and activities from the neighborhood committee
Complaint reporting — residents report issues (broken street lights, clogged drainage, etc.) and track progress until resolution, with direct responses from the committee
Digital letter requests — common administrative letters (certificate of domicile, business certificate, financial hardship letter, etc.) can be requested online instead of in person
Dues payment — a QRIS-based payment flow for monthly waste collection fees, with a verification step handled by the committee
Payment history — a full transaction log per resident, so there's never a dispute about what's been paid
Suggestions box — a direct feedback channel to the committee, with an option to submit anonymously

For the committee (admin side):

Publish and manage announcements
Review and verify incoming payments
Respond to and resolve resident complaints and suggestions
Full visibility into community-wide dues collection status
What it's built with
React 18 — for a fast, component-based interface that's easy to extend
Vite — modern build tooling, meaning quick load times and a lightweight production bundle
Custom CSS — no bloated UI framework, so the design stays lean and fully tailored to the brand

The current version runs on a working front-end with realistic sample data, ready to be connected to a live data source (we're integrating it with a cloud spreadsheet backend for real-time records) and deployed to production hosting.

How it works in practice
Residents log into their personal account to access dues info, submit complaints, request letters, or leave feedback
The committee logs into a separate admin view to manage everything coming in — approvals, responses, and announcements — from one place
Everything is accessible from a browser, on desktop or mobile, with no app installation required
