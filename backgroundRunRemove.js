const TARGET_SITE = "youtube.com";


chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("clearDataAlarm", { periodInMinutes: 4 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "clearDataAlarm") {
        clearSiteData();
    }
});

function clearSiteData() {
    const removalOptions = {
        origins: [`https://${TARGET_SITE}`]
    };

    chrome.browsingData.remove(removalOptions, {
        cookies: true,
        localStorage: true,
        cache: true
    }, () => {
        console.log(`Cleared data for ${TARGET_SITE}`);
    });
}
