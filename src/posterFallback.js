export function posterFallback(title) {
  const initials = encodeURIComponent((title || '?').slice(0, 1).toUpperCase());
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect width='300' height='450' fill='%23241D15'/%3E%3Ctext x='150' y='240' font-size='80' fill='%23A69B87' text-anchor='middle' font-family='serif'%3E${initials}%3C/text%3E%3C/svg%3E`;
}
