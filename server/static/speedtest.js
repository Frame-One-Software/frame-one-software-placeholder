async function speedtest() {

	// get all of the elements
	const pingEle = document.getElementById("ping");
	const downEle = document.getElementById("down");
	const uploadEle = document.getElementById("upload");

	// grab original html to reset on error
	const originalPing = pingEle.innerHTML;
	const originalDown = downEle.innerHTML;
	const orginalUpload = uploadEle.innerHTML;

	// set the download icon
	const downloadIcon = `<object class="f1-spinner" type="image/svg+xml" data="static/frame-one-loader.svg"></object>`;
	pingEle.innerHTML = downloadIcon;
	downEle.innerHTML = downloadIcon;
	uploadEle.innerHTML = downloadIcon;

	try {
		const response = await fetch("/speedtest");
		const {ping, download, upload} = await response.json();
		console.log({ping, download, upload});
		pingEle.innerHTML = `<code>${ping} ms</code>`;
		downEle.innerHTML = `<code>${download} mb/s</code>`;
		uploadEle.innerHTML = `<code>${upload} mb/s</code>`;
	} catch (err) {
		console.error(err);
		alert("There was an error performing a speed test, check the browser console for the error returned");
		pingEle.innerHTML = originalPing;
		downEle.innerHTML = originalDown;
		uploadEle.innerHTML = orginalUpload;
	}

}