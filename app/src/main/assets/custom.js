window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// ===================== 麦克风调用功能（按要求调整） =====================
document.addEventListener('DOMContentLoaded', function() {
    // 1. 创建麦克风调用按钮
    const micButton = document.createElement('button');
    // 调整按钮样式：放在页面上方中间位置
    micButton.style.position = 'fixed';
    micButton.style.top = '20px';          // 距离顶部20px
    micButton.style.left = '50%';         // 水平居中第一步：左移50%
    micButton.style.transform = 'translateX(-50%)'; // 水平居中第二步：左移自身50%
    micButton.style.padding = '12px 24px';
    micButton.style.fontSize = '16px';
    micButton.style.backgroundColor = '#007bff';
    micButton.style.color = 'white';
    micButton.style.border = 'none';
    micButton.style.borderRadius = '8px';
    micButton.style.cursor = 'pointer';
    micButton.style.zIndex = '9999'; // 确保按钮在最上层
    micButton.textContent = '点击调用麦克风';

    // 2. 麦克风调用核心函数
    async function startMicrophone() {
        try {
            // 检查浏览器是否支持
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('你的浏览器不支持麦克风调用，请升级到最新版本！');
                return;
            }

            // 申请麦克风权限
            const micStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });

            // 调用成功：直接让按钮消失
            micButton.style.display = 'none';
            console.log('麦克风调用成功，按钮已隐藏', micStream);
            window.microphoneStream = micStream;

        } catch (error) {
            // 调用失败：给出提示，按钮保留（方便重试）
            micButton.textContent = '调用失败，点击重试 ❌';
            micButton.style.backgroundColor = '#dc3545';
            
            if (error.name === 'NotAllowedError') {
                alert('麦克风权限被拒绝！请在浏览器地址栏左侧的权限图标中，允许本网站使用麦克风。');
            } else if (error.name === 'NotFoundError') {
                alert('未检测到麦克风设备！请检查你的麦克风是否连接正常。');
            } else {
                alert(`麦克风调用失败：${error.message}`);
            }
            console.error('麦克风调用错误详情：', error);
        }
    }

    // 3. 绑定按钮点击事件
    micButton.addEventListener('click', startMicrophone);

    // 4. 将按钮添加到页面中
    document.body.appendChild(micButton);
});