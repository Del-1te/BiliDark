const toggleSwitch = document.getElementById('toggleSwitch');
const messageSpan = document.getElementById('message');


// 监听开关切换
toggleSwitch.addEventListener('change', (event) => {
  if (event.target.checked) {
    // 切到暗色
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'set-dark-vars' });
    });
    chrome.storage.local.set({ theme: 'dark' }, () => {});
    messageSpan.textContent = '暗色';
  } else {
    // 切回亮色
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'set-light-vars' });
    });
    chrome.storage.local.set({ theme: 'light' }, () => {});
    messageSpan.textContent = '亮色';
  }
});

// 加载时设置主题
chrome.storage.local.get('theme', (result) => {
  if (result.theme === 'dark') {
    toggleSwitch.checked = true;
    messageSpan.textContent = '暗色';
  } else {
    toggleSwitch.checked = false;
    messageSpan.textContent = '亮色';
  }
});

  