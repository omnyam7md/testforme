function animateTabContent(targetPane) {
  const items = targetPane.querySelectorAll('.movecol');
  items.forEach((item, index) => {
    item.classList.remove('animate-in'); // reset
    setTimeout(() => {
      item.classList.add('animate-in');
    }, index * 150); // تأخير بسيط لكل عنصر
  });
}

document.querySelectorAll('#pills-tab button[data-bs-toggle="pill"]').forEach(tab => {
  tab.addEventListener('shown.bs.tab', function (e) {
    const targetPane = document.querySelector(e.target.getAttribute('data-bs-target'));
    animateTabContent(targetPane);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const firstActive = document.querySelector('.tab-pane.show.active');
  if (firstActive) {
    animateTabContent(firstActive);
  }
});
