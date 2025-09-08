// 等待 DOM 內容完全載入後再執行我們的程式碼
document.addEventListener('DOMContentLoaded', () => {

    // 1. 選取我們要填充內容的目標容器
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // 2. 使用 async/await 語法定義一個非同步函數來獲取數據
    async function fetchProjects() {
        try {
            // 使用 fetch API 讀取本地的 JSON 檔案
            const response = await fetch('projects.json');

            // 檢查請求是否成功 (HTTP 狀態碼 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 將回應的 body 解析為 JSON
            const projects = await response.json();

            // 3. 渲染專案卡片
            renderProjects(projects);

        } catch (error) {
            console.error("無法獲取專案數據:", error);
            // 可以在此處向使用者顯示錯誤訊息
            portfolioGrid.innerHTML = '<p>無法載入作品集，請稍後再試。</p>';
        }
    }

    // 4. 定義渲染函數，將數據轉換為 HTML
    function renderProjects(projects) {
        // 如果沒有專案數據，就顯示提示訊息
        if (!projects || projects.length === 0) {
            portfolioGrid.innerHTML = '<p>目前尚無作品。</p>';
            return;
        }

        // 使用 map 將每個專案物件轉換為 HTML 字串，然後用 join 組合起來
        const portfolioHTML = projects.map(project => {
            // 為每個專案的 tags 陣列生成對應的 HTML
            const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

            // 使用模板字串 (template literal) 建立卡片的 HTML 結構
            return `
                <div class="card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tags-container">
                        ${tagsHTML}
                    </div>
                </div>
            `;
        }).join('');

        // 5. 將生成的 HTML 注入到容器中
        portfolioGrid.innerHTML = portfolioHTML;
    }

    // 6. 執行 fetch 函數
    fetchProjects();
});