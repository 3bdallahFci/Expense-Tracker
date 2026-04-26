export function formatDate(dateValue = Date.now()) {
  const date = new Date(dateValue); 
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

