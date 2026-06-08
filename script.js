document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 헤더 스크롤 효과 ---
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 2. 스크롤 감지 애니메이션 (Reveal on Scroll) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 한 번 애니메이션이 발생한 후에는 관찰을 중단하여 성능 최적화
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // 요소가 15% 이상 보일 때 작동
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 3. 네비게이션 링크 활성화 감지 ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3, // 섹션의 30%가 보일 때 활성화
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });


    // --- 4. 수강생 후기 슬라이더 ---
    const track = document.getElementById('slider-track');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    const dots = Array.from(dotsContainer.children);
    
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5초마다 자동 전환

    const updateSlider = (index) => {
        // 인덱스 범위 초과 방지
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;

        // 슬라이드 이동
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 인디케이터 도트 활성화 업데이트
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
        updateSlider(currentIndex + 1);
    };

    const prevSlide = () => {
        updateSlider(currentIndex - 1);
    };

    // 컨트롤 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // 인디케이터 도트 클릭 이벤트
    dotsContainer.addEventListener('click', (e) => {
        const targetDot = e.target.closest('.slider-dot');
        if (!targetDot) return;
        
        const targetIndex = parseInt(targetDot.getAttribute('data-index'));
        updateSlider(targetIndex);
        resetTimer();
    });

    // 자동 재생 설정 및 리셋
    const startTimer = () => {
        slideInterval = setInterval(nextSlide, slideDuration);
    };

    const stopTimer = () => {
        clearInterval(slideInterval);
    };

    const resetTimer = () => {
        stopTimer();
        startTimer();
    };

    // 슬라이더 마우스 호버 시 일시 정지
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', stopTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);

    // 슬라이더 초기 재생 시작
    startTimer();
});
