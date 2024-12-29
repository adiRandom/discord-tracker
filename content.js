// The known part of the class name to search for
const KNOWN_CLASS_PART = "discriminator";

// Function to find the dynamic class that contains the known string
function findDynamicClassName() {
    const allElements = document.querySelectorAll('*');
    const classSet = new Set();

    // Gather all unique class names
    allElements.forEach(element => {
        if (element.className && typeof element.className === 'string') {
            element.className.split(' ').forEach(className => classSet.add(className));
        }
    });

    // Look for a class name containing the known string
    return Array.from(classSet).find(className => className.includes(KNOWN_CLASS_PART));
}

// Observe changes in the DOM
const observer = new MutationObserver(() => {
    const dynamicClassName = findDynamicClassName();

    if (dynamicClassName) {
        console.log(`Dynamic class found: ${dynamicClassName}`);
        // Use the dynamic class name to get the list of online users
        const onlineUsers = document.querySelectorAll(`.${dynamicClassName}`);
        const userNames = Array.from(onlineUsers).map(user => user.textContent);

        // Send the data to the background script
        chrome.runtime.sendMessage({ type: "onlineUsers", data: userNames });
    } else {
        console.warn("No matching class found yet.");
    }
});

// Start observing the DOM
observer.observe(document.body, { childList: true, subtree: true });