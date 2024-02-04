const target = new URLSearchParams(window.location.search).get('t')
if (target) {
  let uuid = localStorage.getItem('u');
  if (!uuid) {
    uuid = btoa(crypto.randomUUID());
    localStorage.setItem('u', uuid);
  }
  window.parent.postMessage(atob(uuid), atob(target));
}
