document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('urlToBlock');
  const blockButton = document.getElementById('blockButton');
  const blockedUrlsList = document.getElementById('blockedUrlsList');

  // Load and display blocked URLs when the popup opens
  loadBlockedUrls();

  // Event listener for the block button
  blockButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (url) {
      addBlockedUrl(url);
      urlInput.value = ''; // Clear the input field
    }
  });

  // Function to load blocked URLs from storage and display them
  function loadBlockedUrls() {
    chrome.storage.sync.get({ blockedUrls: [] }, data => {
      const blockedUrls = data.blockedUrls;
      displayBlockedUrls(blockedUrls);
    });
  }

  // Function to display blocked URLs in the popup UI
  function displayBlockedUrls(urls) {
    blockedUrlsList.innerHTML = ''; // Clear the current list
    urls.forEach((url, index) => {
      const li = document.createElement('li');
      li.textContent = url;
      const removeButton = document.createElement('span');
      removeButton.textContent = 'X';
      removeButton.classList.add('remove');
      removeButton.addEventListener('click', () => {
        removeBlockedUrl(url);
      });
      li.appendChild(removeButton);
      blockedUrlsList.appendChild(li);
    });
  }

  // Function to add a URL to the blocked list
  function addBlockedUrl(url) {
    chrome.storage.sync.get({ blockedUrls: [] }, data => {
      const blockedUrls = data.blockedUrls;
      if (!blockedUrls.includes(url)) {
        blockedUrls.push(url);
        chrome.storage.sync.set({ blockedUrls }, () => {
          // Send a message to the background script to update the blocking rules
          chrome.runtime.sendMessage({ action: 'updateRules' });
          displayBlockedUrls(blockedUrls); // Update the UI
        });
      }
    });
  }

  // Function to remove a URL from the blocked list
  function removeBlockedUrl(urlToRemove) {
    chrome.storage.sync.get({ blockedUrls: [] }, data => {
      let blockedUrls = data.blockedUrls;
      blockedUrls = blockedUrls.filter(url => url !== urlToRemove);
      chrome.storage.sync.set({ blockedUrls }, () => {
        // Send a message to the background script to update the blocking rules
        chrome.runtime.sendMessage({ action: 'updateRules' });
        displayBlockedUrls(blockedUrls); // Update the UI
      });
    });
  }
});
