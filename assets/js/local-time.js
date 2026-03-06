// Convert UTC timestamps to local timezone
document.addEventListener('DOMContentLoaded', function() {
  const dateElements = document.querySelectorAll('.date[data-timestamp]');
  
  dateElements.forEach(function(el) {
    const timestamp = el.getAttribute('data-timestamp');
    const date = new Date(timestamp);
    
    // Format: "March 4, 2026 at 4:13 PM NZDT"
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    
    el.textContent = date.toLocaleString(undefined, options).replace(',', ' at');
  });
});
