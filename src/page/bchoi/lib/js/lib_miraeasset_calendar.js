// Datepicker 초기화
export const initializeCalendar = (elementId, options) => {
    const elem = document.getElementById(elementId);
    if (!elem) return;

    const datepicker = new Datepicker(elem, {
        language: 'ko',
        format: 'yyyy-mm-dd',
        autohide: true,
        ...options,
    });

    // 날짜 포맷 함수
    const formatDisplayDate = (date) => dayjs(date).format('YYYY. MM. DD');
    const todayDisplayDate = formatDisplayDate(dayjs());

    elem.addEventListener('changeDate', (event) => {
        const selectedDate = event.detail.date;
        const displayDate = formatDisplayDate(selectedDate);
        const modal = elem.closest('.modal__wrap--bg');
        const displayElement = document.querySelector(
            `.today-date[modal-id=${modal.getAttribute('id')}]`
        );
        // 오늘 날짜 표시
        displayElement.innerText = displayDate === todayDisplayDate ? '오늘' : displayDate;
    });

    return datepicker;
};

// 일간 캘린터
export const dayCalendar = (containerId, option) => {
    if (!containerId) return;

    const container = document.querySelector(containerId);
    const todayDisplay = container.querySelector('.today-display');

    // 날짜 포맷 함수
    const formatDate = (date, type) => {
        if (type === 'YYYY') return date.format('YYYY년');
        if (type === 'YYYY-MM') return date.format('YYYY년 MM월');
        return date.format('YYYY년 MM월 DD일');
    };

    let currentDate = dayjs();
    let selectedMealType = '';

    const displayCalendar = (date) => {
        todayDisplay.innerText = formatDate(date, option.formatType);
    };

    const preButton = container.querySelector('.btn-prev');
    const nextButton = container.querySelector('.btn-next');

    preButton &&
        preButton.addEventListener('click', () => {
            currentDate = currentDate.subtract(1, 'day');
            displayCalendar(currentDate);
        });

    nextButton &&
        nextButton.addEventListener('click', () => {
            currentDate = currentDate.add(1, 'day');
            displayCalendar(currentDate);
        });

    if (option.mealType) {
        const mealTypes = document.querySelectorAll('.btn-meal-type');
        mealTypes.forEach((mealType) => {
            mealType.addEventListener('click', () => {
                const activeMealType = document.querySelector('.btn-meal-type.is-active');
                if (activeMealType) {
                    activeMealType.classList.remove('is-active');
                }
                mealType.classList.add('is-active');
                selectedMealType = mealType.innerText;
            });
        });
    }

    // 초기 날짜 표시
    displayCalendar(currentDate);
};
// 주간 캘린더
export const createWeeklyCalendar = (containerId, options = {}) => {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    const basicTemplate = `
        <div class="calendar__header">
            <div class="display-data"></div>
        </div>
        <div class="calendar__content">
            <ul class="weekly-cal__header"></ul>
            <div class="swiper calendar-swiper">
                <div class="swiper-wrapper"></div>
            </div>
        </div>
    `;
    container.innerHTML = basicTemplate;
    const calendarHeader = container.querySelector('.calendar__header');

    dayjs.locale('ko');
    // dayjs.extend(window.dayjs_plugin_isSameOrBefore);
    if (typeof dayjs_plugin_isSameOrBefore !== 'undefined') {
        dayjs.extend(dayjs_plugin_isSameOrBefore);
    }

    let currentDate = dayjs();

    // const displayWeeklyCalendar = (date) => {
    //     const displayData = container.querySelector('.display-data');
    //     const weeklyLabels = container.querySelector('.weekly-cal__header');
    //     const swipingContainer = container.querySelector('.swiper-wrapper');

    //     if (!displayData || !weeklyLabels || !swipingContainer) return;

    //     const startOfWeek = date.startOf('week');
    //     const endOfWeek = date.endOf('week');

    //     const titleType = options.displayDay;
    //     if (titleType === 'WeeklyRange') {
    //         displayData.textContent = `${startOfWeek.format('MM.DD')} - ${endOfWeek.format('MM.DD')}`;
    //     } else if (titleType === 'onlyMonthly') {
    //         displayData.textContent = date.format('YYYY.MM');
    //     } else {
    //         displayData.textContent = date.format('YYYY-MM-DD');
    //     }

    //     weeklyLabels.innerHTML = '';
    //     swipingContainer.innerHTML = '';

    //     [-1, 0, 1].forEach((weekOffset) => {
    //         const weekDate = date.add(weekOffset, 'week');
    //         const slideItem = document.createElement('div');
    //         slideItem.classList.add('swiper-slide');
    //         const dayListUl = document.createElement('ul');
    //         slideItem.appendChild(dayListUl);

    //         let dayIterator = weekDate.startOf('week');
    //         for (let i = 0; i < 7; i++) {
    //             if (weekOffset === 0) {
    //                 const weekLabel = document.createElement('li');
    //                 weekLabel.classList.add('label');
    //                 weekLabel.textContent = dayIterator.format('ddd');
    //                 if (dayIterator.day() === 0 || dayIterator.day() === 6)
    //                     weekLabel.classList.add('holiday');
    //                 if (dayIterator.isSame(dayjs(), 'day')) weekLabel.classList.add('today');
    //                 weeklyLabels.appendChild(weekLabel);
    //             }

    //             const listItem = document.createElement('li');
    //             const link = document.createElement('a');
    //             link.href = '#';

    //             const dayDiv = document.createElement('div');
    //             dayDiv.classList.add('day');
    //             dayDiv.textContent = dayIterator.format('D');
    //             link.appendChild(dayDiv);

    //             if (dayIterator.day() === 0 || dayIterator.day() === 6)
    //                 link.classList.add('holiday');
    //             if (dayIterator.isSame(dayjs(), 'day')) link.classList.add('today');

    //             if (
    //                 typeof options.addUserDataToWeeklyLink === 'function' &&
    //                 dayIterator.isSameOrBefore(dayjs())
    //             ) {
    //                 options.addUserDataToWeeklyLink(link);
    //             }

    //             ((d) => {
    //                 link.addEventListener('click', (e) => {
    //                     e.preventDefault();
    //                     if (typeof options.handleWeeklyLinkClick === 'function') {
    //                         options.handleWeeklyLinkClick(d);
    //                     }
    //                 });
    //             })(dayIterator);

    //             listItem.appendChild(link);
    //             dayListUl.appendChild(listItem);
    //             dayIterator = dayIterator.add(1, 'day');
    //         }
    //         swipingContainer.appendChild(slideItem);
    //     });
    // };

    const swiperOptions = {
        initialSlide: 1,
        loop: true,
        ...options.swiperOptions,
    };

    if (options.button || (options.swiperOptions && options.swiperOptions.navigation)) {
        const prevButton = document.createElement('button');
        prevButton.className = 'swiper-button-prev';
        calendarHeader.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.className = 'swiper-button-next';
        calendarHeader.appendChild(nextButton);

        swiperOptions.navigation = {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        };
    }

    const swiper = new Swiper(container.querySelector('.calendar-swiper'), swiperOptions);

    swiper.on('slideChangeTransitionEnd', () => {
        if (swiper.realIndex > swiper.previousIndex) {
            currentDate = currentDate.add(1, 'week');
        } else {
            currentDate = currentDate.subtract(1, 'week');
        }
        // displayWeeklyCalendar(currentDate);
        swiper.slideToLoop(1, 0, false);
    });

    // displayWeeklyCalendar(currentDate);
};
