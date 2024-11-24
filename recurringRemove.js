const TARGET_SITE = "youtube.com";


async function clearSiteData() {
    const removalOptions = {
        origins: [`https://${TARGET_SITE}`]
    };

    chrome.browsingData.remove(removalOptions, {
        cookies: true,
        localStorage: true,
        cache: true
    }, () => {
        console.log(`Cleared data for ${TARGET_SITE} at ${new Date().toLocaleTimeString()}`);
    });
}

function startClearing(intervalInMinutes = 4) {
    const intervalInMilliseconds = intervalInMinutes * 60 * 1000;

    async function recursiveClear() {
        await clearSiteData();
        setTimeout(recursiveClear, intervalInMilliseconds);
    }

    recursiveClear();
}


chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed, starting to auto-clear!");
    startClearing(); // Default 
});
