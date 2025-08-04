export function closeToast(id) {
    if (typeof window === 'undefined') return;

    const toast = document.getElementById(id);
    if (!toast) return;

    // 사라지는 애니메이션 적용
    toast.style.transition = 'opacity 0.6s ease'; // 0.6초 동안 부드럽게 투명해짐
    toast.style.opacity = 0; // 투명하게 변경

    const backupTimeout = setTimeout(() => {
        if (toast) {
            toast.classList.remove('show');
            toast.remove();
            adjustToast();
        }
    }, 600); // 0.6초 후 강제로 제거
}

export function adjustToast() {
    const toasts = document.querySelectorAll('.toast--wrap__msg.show'); // .show 클래스가 있는 토스트만 선택
    let bottom = 10; // 초기 bottom 값 설정 (화면 하단 간격)

    toasts.forEach((toast) => {
        toast.style.transition = 'bottom 0.6s ease';
        toast.style.bottom = `${bottom}px`;
        bottom += toast.offsetHeight + 10; // 각 토스트의 높이와 간격(10px)을 더함
    });
}

export function tooltipActive() {
    const toolIcons = document.querySelectorAll('.tooltip-wrap .tooltip-icon > i');
    if (!toolIcons) {
        return;
    }
    if (toolIcons) {
        toolIcons.forEach((icon) => {
            const toolBox = icon.parentElement.nextElementSibling;
            const showTooltip = () => {
                toolBox.classList.add('tool-active');
            };

            const hideTooltip = () => {
                const btnClose = toolBox.querySelector('.button-wrap--bubble-close');
                if (btnClose) {
                    btnClose.addEventListener('click', function () {
                        toolBox.classList.remove('tool-active');
                    });
                }
            };
            icon.addEventListener('click', function () {
                showTooltip();
                hideTooltip();
            });
        });
    }
}

// 토스트 팝업
export function openToast(id, tostMsg, Case = '') {
    // toast 요소 생성
    let toastContainer = document.querySelector('.toast--wrap');
    let innerContainer = document.querySelector('.toast__inner');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.classList.add('toast--wrap');

        document.body.appendChild(toastContainer);
    }

    if (!innerContainer) {
        innerContainer = document.createElement('div');
        innerContainer.classList.add('toast__inner');
        toastContainer.appendChild(innerContainer);
    }

    const tostTemplate = document.createElement('div');
    tostTemplate.className = 'toast--wrap__msg';

    tostTemplate.id = id;
    tostTemplate.innerHTML = `<i class="ico ico-check-or"></i>${tostMsg}`;

    // toast 컨테이너에 추가
    innerContainer.appendChild(tostTemplate);

    // 방금 생성한 toast를 가져옴
    const toast = document.getElementById(id);
    const toastIcon = toast.querySelector('.ico');

    if (Case) {
        if (Case === 'error') {
            toast.querySelector('i').classList.remove('ico-check-or');
            toast.querySelector('i').classList.add('is-error-or');
        } else if (Case === 'bottomCase') {
            toastContainer.classList.add('toast--wrap__btm');
        } else if (Case === 'info') {
            toast.querySelector('i').classList.add('ico-info-or16');
        } else if (Case === 'noIcon') {
            toastIcon.remove();
        }
    }

    if (!toast) return;

    // toast를 보이게 설정 (바로 애니메이션이 적용되지 않도록 미리 transition 제거)
    toast.style.opacity = 0;
    toast.style.transition = ''; // 기존 transition 제거
    toast.classList.add('show');

    // 위치 조정을 위해 기존 토스트들의 bottom 값을 다시 계산
    adjustToast();

    // 작은 딜레이 후에 나타나는 애니메이션 적용
    setTimeout(() => {
        toast.style.transition = 'opacity 0.6s ease';
        toast.style.opacity = 1;
    }, 10);

    // 일정 시간 후에 자동으로 토스트 닫기
    setTimeout(() => {
        closeToast(id);
    }, 2000);
}

// 모달 열기 2.
export const setModal = (target) => {
    // target : 모달 아이디
    target = document.getElementById(target);
    target.style.display = 'block';
    if (target.classList.contains('type-bottom')) {
        const modalHeadHeight = target.querySelector('.modal-header')
            ? target.querySelector('.modal-header').offsetHeight
            : 0;
        const modalFootHeight = target.querySelector('.modal-footer')
            ? target.querySelector('.modal-footer').offsetHeight
            : 0;

        let modalHeight = modalHeadHeight + modalFootHeight + 50;

        target.querySelector('.modal-cont').style = `--modal-cont-height:${modalHeight}px`;
    }

    setTimeout(() => {
        target.classList.add('is-active');
        document.body.classList.add('modal-open');
    }, 300);
};

// 모달 열기 1.
export const openModal = (event, type) => {
    const btn = event.currentTarget;
    const modalId = btn.getAttribute('modal-id');
    const target = document.getElementById(modalId);

    if (target) {
        setModal(modalId); // ID =`${modal-id}` 에 해당되는 모달 열기
    }
};

// 모달 외부 클릭 이벤트 핸들러
document.addEventListener('click', function (e) {
    const modalBg = e.target.closest('.modal__wrap--bg');
    if (modalBg) {
        const modalWrap = modalBg.querySelector('.modal__wrap');
        console.log(modalWrap, e.target);
        if (modalWrap.classList.contains('type-alert')) {
            if (!e.target.classList.contains('type-alert')) {
                return;
            }
        } else if (!e.target.closest('.modal__wrap')) {
            setTimeout(() => {
                modalBg.classList.remove('is-active');
                document.body.classList.remove('modal-open');
            }, 300);
            modalBg.style.display = 'none';
        } else {
            return;
        }
    }
});

//모달창 닫기
export const closeModal = (event, openButton) => {
    const btn = event.currentTarget;
    const activeModal = btn.closest('.modal__wrap--bg');
    if (activeModal) {
        activeModal.classList.remove('is-active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            activeModal.style.display = 'none';
        }, 300);
    }
};

// Helper function for graph (dummy implementation)
const circleGraphType0 = (svgElement, min, max, value) => {
    const radius = svgElement.querySelector('.circle-progress').r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const progress = value / (max - min);
    const dashoffset = circumference * (1 - progress);
    const circleProgress = svgElement.querySelector('.circle-progress');
    if (circleProgress) {
        circleProgress.style.strokeDashoffset = dashoffset;
    }
};

// User data function from the original file
export const addUserDataToWeeklyLink = (link) => {
    const userData = document.createElement('div');
    userData.classList.add('health-data-wrap');
    userData.innerHTML = `
        <svg width="33" height="33" viewBox="0 0 140 140" class="circlebar-type1 calro-bar circlebar-js1custom">
            <circle r="60" cx="70" cy="70" class="circle-border"></circle>
            <circle r="60" cx="70" cy="70" class="circle-progress"></circle>
        </svg>
    `;
    link.parentElement.appendChild(userData);
    const svgElement = link.parentElement.querySelector('.circlebar-js1custom');
    if (svgElement) {
        // Example with 75% progress
        circleGraphType0(svgElement, 0, 100, 75);
    }
};

// Click handler from the original file
export const handleWeeklyLinkClick = (day) => {
    const selectedDay = day.format('YYYY-MM-DD');
    console.log('Clicked on:', selectedDay);
    // Example action: alert the selected day
    alert('You clicked on: ' + selectedDay);
};

document.addEventListener('DOMContentLoaded', () => {
    window.openToast = openToast;
    window.closeToast = closeToast;
    window.closeToast = adjustToast;
    window.setModal = setModal;
    window.openModal = openModal;
    window.closeModal = closeModal;
});
