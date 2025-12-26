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

// 新增：麦克风权限请求逻辑
async function requestMicrophonePermission() {
    try {
        // 检查浏览器是否支持媒体设备API
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('您的浏览器不支持麦克风权限请求，请升级浏览器！');
            return false;
        }

        // 请求麦克风权限（视频设为false，只请求音频）
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: false 
        });

        // 权限获取成功，关闭媒体流（避免占用麦克风）
        stream.getTracks().forEach(track => track.stop());
        console.log('麦克风权限已成功获取！');
        alert('麦克风权限已授予成功！');
        return true;

    } catch (error) {
        // 处理权限拒绝或其他错误
        console.error('麦克风权限请求失败：', error);
        if (error.name === 'NotAllowedError') {
            alert('您拒绝了麦克风权限请求，请手动在浏览器设置中开启权限！');
        } else if (error.name === 'NotFoundError') {
            alert('未检测到麦克风设备，请检查设备连接！');
        } else {
            alert('麦克风权限请求出错：' + error.message);
        }
        return false;
    }
}

// 页面加载完成后创建权限请求按钮
window.addEventListener('DOMContentLoaded', () => {
    // 创建请求权限的按钮
    const micBtn = document.createElement('button');
    micBtn.innerText = '允许麦克风权限';
    // 核心修改：调整按钮样式（琥珀黄色、更小尺寸、顶部居中）
    micBtn.style.cssText = `
        position: fixed;
        top: 10px;          /* 顶部位置，距离顶部10px */
        left: 50%;          /* 水平居中 */
        transform: translateX(-50%); /* 仅水平居中，取消垂直居中 */
        padding: 8px 16px;  /* 更小的内边距，按钮整体变小 */
        font-size: 14px;    /* 更小的字体 */
        background: #ffc107;/* 琥珀黄色（标准琥珀色值） */
        color: #333;        /* 深色文字更适配琥珀色背景 */
        border: none;
        border-radius: 6px; /* 更小的圆角 */
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 轻微阴影提升质感 */
    `;

    // 点击按钮触发权限请求
    micBtn.addEventListener('click', async () => {
        const success = await requestMicrophonePermission();
        if (success) {
            micBtn.remove(); // 权限获取成功后移除按钮
        }
    });

    // 将按钮添加到页面
    document.body.appendChild(micBtn);
});