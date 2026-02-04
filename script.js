const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.item');
const dotsContainer = document.querySelector('.carousel-dots');
const itemWidth = 240; 
const slidersIndex = {};

let index = 0;
let dots = [];
let isTransitioning = false;

// 1.  وعدم وجود فراغ
items.forEach(item => {
    let clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

// 2. إنشاء النقاط (9 نقاط فقط)
function createDots() {
    items.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            index = i;
            updateCarousel();
            resetTimer();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
}

// 3. دالة التحريك
function updateCarousel(isInstant = false) {
    if (isInstant) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.8s ease';
        isTransitioning = true;
    }
        carousel.style.transform = `translateX(${index * itemWidth}px)`;

    // تحديث النقطة النشطة
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index % items.length]) {
        dots[index % items.length].classList.add('active');
    }
    if (!isInstant) {
        setTimeout(() => { isTransitioning = false; }, 800);
    }
}

// 4. الحركة التلقائية  
function moveNext() {
    if (isTransitioning) return;
    index++;
    updateCarousel();
    if (index === items.length) {
        setTimeout(() => {
            index = 0;
            updateCarousel(true);
        }, 800);
    }
}

// 5. الضغط على الصور للتحريك
document.querySelectorAll('.item').forEach((item, i) => {
    item.addEventListener('click', () => {
        if (isTransitioning) return;
        index = i % items.length; 
        updateCarousel();
        resetTimer();
    });
});

// تشغيل وتوقيت
createDots();
updateCarousel();
let autoSlide = setInterval(moveNext, 3000);
function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(moveNext, 3000);
}

/* 🔴 عناصر النوافذ 🔴 */
const authOverlay = document.getElementById('authOverlay');
const otpOverlay = document.getElementById('otpOverlay');
const loginForm = document.getElementById('loginForm');
const otpForm = document.getElementById('otpForm');
const authTitle = document.getElementById('authTitle');
const phoneGroup = document.getElementById('phoneGroup');
const authInput = document.getElementById('authInput');
const emailInput = document.getElementById('emailInput');
const switchAuth = document.getElementById('switchAuth');

let mode = 'phone';

function openAuth() {
  authOverlay.style.display = 'flex';
  mode = 'phone';
  authTitle.textContent = 'تسجيل الدخول برقم الجوال';
  phoneGroup.style.display = 'flex';
  emailInput.style.display = 'none';
  authInput.focus();
}

function closeAuth() {
  authOverlay.style.display = 'none';
  otpOverlay.style.display = 'none';
}

switchAuth.addEventListener('click', e => {
  e.preventDefault();
  if (mode === 'phone') {
    mode = 'email';
    authTitle.textContent = 'تسجيل الدخول بالبريد الإلكتروني';
    phoneGroup.style.display = 'none';
    emailInput.style.display = 'block';
    emailInput.focus();
  } else {
    mode = 'phone';
    authTitle.textContent = 'تسجيل الدخول برقم الجوال';
    phoneGroup.style.display = 'flex';
    emailInput.style.display = 'none';
    authInput.focus();
  }
});

/*   المربعات الأربعة للرمز  */
const otpInputs = document.querySelectorAll('.otp-input-box');
otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const targetValue = mode === 'phone' ? authInput.value : emailInput.value;
    
    // محاكاة نجاح الطلب بدون الحاجة لملف PHP
    const code = Math.floor(1000 + Math.random() * 9000);
    alert("نموذج تجريبي - رمز التحقق لمتجر BS هو: " + code); 
    sessionStorage.setItem('validOTP', code.toString());
    
    document.getElementById('displayTarget').textContent = targetValue;
    authOverlay.style.display = 'none';
    otpOverlay.style.display = 'flex';
    otpInputs[0].focus();
});

/*  التحقق من الرمز   */
otpForm.addEventListener('submit', e => {
  e.preventDefault();
  let enteredCode = "";
  otpInputs.forEach(input => enteredCode += input.value);
  
  if (enteredCode === sessionStorage.getItem('validOTP')) {
    alert('أهلاً بك! تم التحقق بنجاح');
    window.location.reload();
  } else {
    alert('الرمز غير صحيح، حاول مرة أخرى');
  }
});
function changeSlide(category, id, direction) {
    const sliderId = `slider-${category}-${id}`;
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const slides = slider.children.length;

    if (!slidersIndex[sliderId]) {
        slidersIndex[sliderId] = 0;
    }

    slidersIndex[sliderId] += direction;

    if (slidersIndex[sliderId] < 0) {
        slidersIndex[sliderId] = slides - 1;
    }

    if (slidersIndex[sliderId] >= slides) {
        slidersIndex[sliderId] = 0;
    }

    slider.style.transform =
        `translateX(+${slidersIndex[sliderId] * 100}%)`;
}
// إضافة القائمة الجانبية والأزرار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    
    // إضافة القائمة الجانبية
    const menuHTML = `
        <div class="menu-overlay" id="menuOverlay" onclick="closeMenu()"></div>
        <div class="side-menu" id="sideMenu">
            <div class="menu-header">
                <h3>القائمة</h3>
                <button class="menu-close" onclick="closeMenu()">×</button>
            </div>
            <ul class="menu-items">
                <li><a href="#home-section" onclick="closeMenu()">الرئيسية</a></li>
                <li><a href="#categories-container" onclick="closeMenu()">التصنيفات</a></li>
                <li><a href="category.php">المنتجات</a></li>
                <li><a href="contact.php">تواصل معنا</a></li>
            </ul>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
    
    // إضافة وظيفة فتح القائمة لزر القائمة
    const header = document.querySelector('.header');
    if (header && window.innerWidth <= 768) {
        header.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX < 70) { // إذا كان الضغط على الجزء الأيسر (زر القائمة)
                openMenu();
            }
        });
        
        // إضافة أزرار التمرير للكاروسيل
        const containere = document.querySelector('.containere');
        if (containere) {
            const navButtons = `
                <button class="carousel-prev" onclick="moveCarousel('prev')">
                    <svg viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button class="carousel-next" onclick="moveCarousel('next')">
                    <svg viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            `;
            containere.insertAdjacentHTML('beforeend', navButtons);
        }
    }
});

// فتح القائمة
function openMenu() {
    document.getElementById('sideMenu').classList.add('active');
    document.getElementById('menuOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// إغلاق القائمة
function closeMenu() {
    document.getElementById('sideMenu').classList.remove('active');
    document.getElementById('menuOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// تحريك الكاروسيل
let currentIndex = 0;
function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel .item');
    const totalItems = items.length / 2; // لأن العناصر مكررة
    
    if (direction === 'next') {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
        }
    } else {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        }
    }
    
    const itemWidth = 160; // عرض البطاقة
    const gap = 12; // المسافة بين البطاقات
    const offset = currentIndex * (itemWidth + gap);
    
    carousel.style.transform = `translateX(${offset}px)`;
    carousel.style.transition = 'transform 0.4s ease';
}

