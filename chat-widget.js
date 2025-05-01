(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:5173"; // This URL will serve your chat interface
  iframe.style =
    "position:fixed;bottom:20px;right:20px;width:350px;height:500px;border:none;z-index:9999;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.2);";
  document.body.appendChild(iframe);
})();
