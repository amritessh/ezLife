A simple and effective Chrome extension that allows users to block specific URLs dynamically through a user-friendly popup interface.

## Features

* **Dynamic Blocking:** Easily add URLs to a blocked list directly from the extension's popup.
* **Instant Blocking:** Websites are blocked using Chrome's `declarativeNetRequest` API for efficient and immediate effect.
* **Persistence:** Your list of blocked URLs is saved and automatically loaded when your browser starts.
* **Sync:** Blocked URLs are synced across your signed-in Chrome browsers using `chrome.storage.sync`.
* **Easy Management:** View the list of blocked URLs in the popup and remove them individually.

## Installation

Please install it by loading the unpacked source code in Developer Mode.

1.  **Download the Code:**
    * Clone this repository to your local machine using Git:
      ```bash
      git clone [https://github.com/amritessh/ezLife.git](https://github.com/amritessh/ezLife.git)
      ```
    * Or, download the zip file of the repository by clicking the "Code" button on the repository page and selecting "Download ZIP". Extract the zip file.

2.  **Load in Chrome:**
    * Open your Chrome browser.
    * Go to `chrome://extensions/` in the address bar.
    * Enable "Developer mode" by toggling the switch in the top right corner.
    * Click the "Load unpacked" button in the top left.
    * Navigate to and select the folder containing the extension's files that you downloaded/cloned (the folder that contains `manifest.json`, `popup.html`, etc.).

The extension should now appear in your list of extensions, and its icon will be in your browser toolbar.

**Note:** Extensions loaded this way will show a warning banner in Chrome. This is normal for unpacked extensions and indicates it wasn't installed from the Web Store. You will also need to manually update the extension by downloading the latest code and reloading it on the `chrome://extensions/` page.

## How to Use

1.  Click the "ezLife" icon in your Chrome toolbar.
2.  A small popup window will appear.
3.  In the input field labeled "Enter URL to block", type or paste the full URL of the website you want to block (e.g., `https://www.reddit.com/`).
4.  Click the "Add to Block List" button.
5.  The URL will be added to the "Blocked URLs" list shown in the popup and will be immediately blocked.
6.  To remove a URL from the blocked list, click the "X" next to the URL in the list within the popup.

## Privacy

This extension respects your privacy.

* It **only** stores the URLs you explicitly add to the block list.
* The list of blocked URLs is stored locally in your Chrome browser using `chrome.storage.sync`, which syncs the list across your signed-in browsers.
* This extension **does not** collect, track, or transmit any Browse data or blocked URLs to any external servers.

## Contributing

Contributions are welcome! If you find a bug or have an idea for an improvement, please feel free to:

1.  Open an [Issue](https://github.com/amritessh/ezLife/issues) to report bugs or suggest features.
2.  Fork the repository and submit a [Pull Request](https://github.com/amritessh/ezLife/pulls) with your changes.

Please ensure your code adheres to the project's style and that your contributions are licensed under the project's license.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.