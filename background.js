// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateRules') {
    updateDeclarativeNetRequestRules();
  }
});

// Function to update the declarativeNetRequest rules based on the blocked URLs in storage
function updateDeclarativeNetRequestRules() {
  chrome.storage.sync.get({ blockedUrls: [] }, data => {
    const blockedUrls = data.blockedUrls;
    const rules = blockedUrls.map((url, index) => ({
      id: index + 1, // Rule IDs must be unique positive integers
      priority: 1,
      action: { type: 'block' },
      condition: { urlFilter: url, resourceTypes: ['main_frame'] } // Block only main frame requests
    }));

    // Get the current dynamic rules
    chrome.declarativeNetRequest.getDynamicRules(currentRules => {
      const currentRuleIds = currentRules.map(rule => rule.id);
      const newRuleIds = rules.map(rule => rule.id);

      // Determine rules to remove (those currently active but not in the new list)
      const rulesToRemove = currentRuleIds.filter(
        id => !newRuleIds.includes(id)
      );

      // Update the dynamic rules
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: rulesToRemove,
          addRules: rules
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              'Failed to update declarativeNetRequest rules:',
              chrome.runtime.lastError
            );
          } else {
            console.log('DeclarativeNetRequest rules updated successfully.');
          }
        }
      );
    });
  });
}

// Initial setup: Update rules when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  updateDeclarativeNetRequestRules();
});

// Also update rules when Chrome starts
chrome.runtime.onStartup.addListener(() => {
  updateDeclarativeNetRequestRules();
});
