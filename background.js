chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "onlineUsers") {
        fetch("http://localhost:3000/online-users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ users: message.data })
        })
            .then(response => console.log('API Call Successful:', response))
            .catch(error => console.error('Error:', error));
    }
});