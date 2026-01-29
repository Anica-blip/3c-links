// script.js - Updated

  // QR code
  let url = window.location.href;
  QRCode.toCanvas(document.getElementById('qrCode'), url, {width:150}, function (error) {
    if (error) console.error(error);
  });
  // Show stats modal if needed
  document.getElementById('viewStats').onclick = showStatsModal;
  document.getElementById('closeModal').onclick = hideStatsModal;
};
// --- ANALYTICS: Per-link click count (local per-browser) ---
const links = document.querySelectorAll('.link-btn');
links.forEach(link => {
  link.addEventListener('click', function() {
    let key = 'linkstat_' + link.textContent.replace(/\s+/g,'').toLowerCase();
    let count = Number(localStorage.getItem(key) || 0) + 1;
    localStorage.setItem(key, count);
  });
});

// --- ANALYTICS: Modal display ---
function showStatsModal() {
  let statsList = document.getElementById('statsList');
  statsList.innerHTML = '';
  links.forEach(link => {
    let key = 'linkstat_' + link.textContent.replace(/\s+/g,'').toLowerCase();
    let count = Number(localStorage.getItem(key) || 0);
    let text = `${link.textContent}: ${count} clicks`;
    let li = document.createElement('li');
    li.textContent = text;
    statsList.appendChild(li);
  });
  document.getElementById('statsModal').style.display = 'block';
}
function hideStatsModal() {
  document.getElementById('statsModal').style.display = 'none';
}
window.onclick = function(event) {
  let modal = document.getElementById('statsModal');
  if (event.target == modal) modal.style.display = "none";
};

// --- NEWSLETTER: Just a subscribe confirmation for now ---
document.getElementById('newsletterForm').onsubmit = function(e) {
  alert('Thank you for subscribing! You will be contacted soon.');
};

// --- FOCUS: Accessibility for modal close ---
document.getElementById('closeModal').tabIndex = 0;
document.getElementById('closeModal').onkeydown = function(e) {
  if (e.key === "Enter" || e.key === " ") hideStatsModal();
};
