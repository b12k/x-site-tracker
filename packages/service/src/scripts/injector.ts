const serviceUrl = '{{SERVICE_URL}}';
const host = window.location.host;
const protocol = window.location.protocol;
const parentUrl = `${protocol}//${host}`;
const iframe = document.createElement('iframe');

window.addEventListener('message', (event) => {
  if (!event.origin.match(serviceUrl)) return;
  console.log(event.data);
  iframe.remove();
})

iframe.src = `${serviceUrl}/?t=${btoa(parentUrl)}`;
iframe.style.display = 'none';
document.body.appendChild(iframe);
