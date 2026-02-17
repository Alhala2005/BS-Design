const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.item');
const itemWidth = 240; 
const slidersIndex = {};

let index = 0;
let isTransitioning = false;

items.forEach(item => {
    let clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

// دالة التحريك
function updateCarousel(isInstant = false) {
    if (isInstant) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.8s ease';
        isTransitioning = true;
    }
    carousel.style.transform = `translateX(${index * itemWidth}px)`;
    
    if (!isInstant) {
        setTimeout(() => { isTransitioning = false; }, 800);
    }
}

// الحركة التلقائية  
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

// الضغط على الصور للتحريك
document.querySelectorAll('.item').forEach((item, i) => {
    item.addEventListener('click', () => {
        if (isTransitioning) return;
        index = i % items.length; 
        updateCarousel();
        resetTimer();
    });
});

// تشغيل وتوقيت
updateCarousel();
let autoSlide = setInterval(moveNext, 3000);
function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(moveNext, 3000);
}

/* 🔴  تسجيل الدخول 🔴*/

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
    
    const code = Math.floor(1000 + Math.random() * 9000);
    alert("نموذج تجريبي - رمز التحقق لمتجر BS هو: " + code); 
    sessionStorage.setItem('validOTP', code.toString());
    
    document.getElementById('displayTarget').textContent = targetValue;
    authOverlay.style.display = 'none';
    otpOverlay.style.display = 'flex';
    otpInputs[0].focus();
});

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

/* 🔴 سلايدر المنتجات 🔴 */

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

    slider.style.transform = `translateX(+${slidersIndex[sliderId] * 100}%)`;
}

/*🔴 القائمة الجانبية للجوال 🔴*/

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
    <li><a href="#categories-container" onclick="openCategories()">التصنيفات</a></li>
    <li><a href="category.php" onclick="closeMenu()">المنتجات</a></li>
    <li><a href="my_orders.php" onclick="closeMenu()">الطلبات</a></li>
    <li><a href="#contact-us" onclick="closeMenu()">تواصل معنا</a></li>
</ul>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', menuHTML);
        if (window.innerWidth <= 768) {
        const header = document.querySelector('.header');
        if (header) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = `
                <svg width="24" height="24"  fill="none" stroke="#826a3e" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            `;
            
            menuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openMenu();
            });
            
            header.appendChild(menuBtn);
        }
    }
});

function openMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    if (sideMenu && menuOverlay) {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeMenu() {
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    if (sideMenu && menuOverlay) {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openCategories() {
    closeMenu();
        setTimeout(() => {
        const categoriesSection = document.getElementById('categories-container');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
            const area = document.getElementById('categories-area');
        if (area) area.style.display = 'block';
            const mainBtn = document.querySelector('.main-btn');
        if (mainBtn) mainBtn.style.display = 'none';
    }, 300);
}
function toggleCategories() {
    openCategories();
}
