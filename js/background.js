chrome.contextMenus.create({
    "id": "copyItems",
    "title": "Copiar informações do imóvel",
    "contexts": ["all"]
});

chrome.contextMenus.create({
    "id": "copyList",
    "title": "Copiar lista",
    "contexts": ["all"],
    // "contexts": ["page", "selection", "image", "link"],
});

chrome.contextMenus.create({
    "id": "searchMap",
    "title": "Obter localização do imóvel",
    "contexts": ["all"],
    // "contexts": ["page", "selection", "image", "link"],
});

chrome.contextMenus.onClicked.addListener(executeScript);

function executeScript(info, tab) {
    switch (info.menuItemId) {
        case "searchMap":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    getLocation();
                }
            });
            break;
        case "copyList":
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    copyList();
                }
            });
            break;
        default:
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    copyImovel();
                }
            });
            break;
    }
};
