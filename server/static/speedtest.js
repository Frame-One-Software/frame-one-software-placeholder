async function speedtest() {

	// get all of the elements
	const pingEle = document.getElementById("ping");
	const downEle = document.getElementById("down");
	const uploadEle = document.getElementById("upload");

	// set the download icon
	const downloadIcon = `<object class="f1-spinner" type="image/svg+xml" data="static/frame-one-loader.svg"></object>`;
	pingEle.innerHTML = downloadIcon;
	downEle.innerHTML = downloadIcon;
	uploadEle.innerHTML = downloadIcon;

	const response = await fetch("/speedtest");
	const {ping, download, upload} = await response.json();
	console.log({ping, download, upload});
	pingEle.innerHTML = `<code>${ping} ms</code>`;
	downEle.innerHTML = `<code>${download} mb/s</code>`;
	uploadEle.innerHTML = `<code>${upload} mb/s</code>`;
}