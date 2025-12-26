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

// ========== 新增：横竖屏检测与提示功能 ==========
// 1. 创建竖屏提示层（样式可自定义）
function createPortraitTip() {
    // 避免重复创建提示层
    if (document.getElementById('portrait-tip')) return;

    const tip = document.createElement('div');
    tip.id = 'portrait-tip';
    // 提示层样式：全屏覆盖、居中显示提示文字、遮挡页面内容
    tip.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 9999; /* 确保覆盖所有页面内容 */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #333;
        text-align: center;
        padding: 0 20px;
    `;
    tip.innerHTML = `
        <div style="margin-bottom: 20px; font-size: 40px;">📱</div>
        <div>请将手机切换为横屏模式</div>
        <div style="margin-top: 10px; font-size: 14px; color: #666;">横屏后即可进入小镇</div>
    `;
    document.body.appendChild(tip);
}

// 2. 检测屏幕方向并处理
function checkScreenOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight; // 宽度>高度=横屏
    const tip = document.getElementById('portrait-tip');
    
    if (isLandscape) {
        // 横屏：隐藏提示层
        tip && (tip.style.display = 'none');
    } else {
        // 竖屏：创建并显示提示层
        createPortraitTip();
        tip && (tip.style.display = 'flex');
    }
}

// 3. 绑定事件：页面加载/尺寸变化/方向变化时检测
window.addEventListener('load', checkScreenOrientation); // 页面加载完成后检测
window.addEventListener('resize', checkScreenOrientation); // 窗口尺寸变化时检测
window.addEventListener('orientationchange', checkScreenOrientation); // 移动端方向变化时检测