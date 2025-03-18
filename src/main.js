/* global document, fetch, console */
import '/src/assets/css/index.css';

const loadIaData = async () => {
    try {
        const response = await fetch('/ia.json');
        const data = await response.json();
        //title
        document.title = data.siteName;
        const pageTitle = document.querySelector('#siteTitle');
        if (pageTitle) {
            pageTitle.textContent = data.siteName;
        }
        //가이드 정보
        // 테이블 바디 요소를 선택합니다.
        const tableBody = document.getElementById('info-table-body');
        if (tableBody) {
            // 사이트 이름과 시작일을 테이블에 추가합니다.
            const siteNameRow = document.createElement('tr');
            siteNameRow.innerHTML = '<th scope="row">프로젝트</th><td>' + data.siteName + '</td>';
            tableBody.appendChild(siteNameRow);

            const startDateRow = document.createElement('tr');
            startDateRow.innerHTML = '<th scope="row">기간</th><td>' + data.period + '</td>';
            tableBody.appendChild(startDateRow);

            const worker = document.createElement('tr');
            worker.innerHTML = '<th scope="row">가이드 작업자</th><td>' + data.worker + '</td>';
            tableBody.appendChild(worker);
            const email = document.createElement('tr');
            email.innerHTML = '<th scope="row">대표 이메일</th><td>' + data.email + '</td>';
            tableBody.appendChild(email);
        }
        //navigation
        const naviList = document.getElementById('naviList');
        if (naviList) {
            data.IaList.forEach(item => {
                const li = document.createElement('li');
                const link = document.createElement('a');

                link.textContent = item.Level1;
                link.setAttribute('href', item.path + item.link);

                li.appendChild(link);
                naviList.appendChild(li);
            });
        }
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        console.error('json 파일을 읽지 못했습니다.');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // eslint-disable-next-line no-unused-vars
    const data = await loadIaData();
});
