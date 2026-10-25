# ADR 0006: Framework-free portfolio frontend

- Status: accepted
- Context: the app is a delivery-pipeline demonstration, not a frontend framework showcase.
- Decision: serve semantic HTML, CSS, and small vanilla JavaScript files from Express.
- Consequences: fewer dependencies and no build step; richer interactions can be added only when they support the project goal.
