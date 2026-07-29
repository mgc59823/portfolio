/* ==========================================================================
   Personality Test - Toast Notification Component
   ========================================================================== */

export function showToast(message) {
  const existing = document.querySelector('.toast-container');
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-container';
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2500);
}
