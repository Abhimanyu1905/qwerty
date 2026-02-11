// Main Application Logic

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- Navigation Handling ---
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            navigateTo(href);
        });
    });

    // --- Cart Drawer Handling ---
    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const cartPanel = document.getElementById('cart-panel');

    function openCart() {
        cartDrawer.classList.remove('hidden');
        // Trigger reflow for transition
        void cartDrawer.offsetWidth;
        cartPanel.classList.remove('translate-x-full');
        cartPanel.classList.add('translate-x-0');
    }

    function closeCart() {
        cartPanel.classList.remove('translate-x-0');
        cartPanel.classList.add('translate-x-full');
        
        // Wait for transition to finish
        setTimeout(() => {
            cartDrawer.classList.add('hidden');
        }, 500);
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeCart);

    // Initial load
    const path = window.location.pathname;
    // Basic routing logic (for SPA simulation)
    // In a real file-based setup, we might just letting default navigation happen,
    // but here we might want to inject content.
    // However, the user asked for HTML/CSS/JS files, implying multipage is fine.
    // BUT we are using index.html as a shell. Let's make it smarter.
    
    // For now, let's just make the home page content visible by default if on root.
    if (path === '/' || path.endsWith('index.html')) {
        renderHomePage();
    }
});

function navigateTo(url) {
    // For now, simple redirection or pushing state if we want SPA
    // Let's stick to simple file navigation for "vanilla" feel unless we want SPA.
    // If files exist (menu.html etc), we go there.
    // If not, we might handle it here.
    
    if (url === '/') {
        window.location.href = 'index.html';
    } else if (url.endsWith('.html')) {
        window.location.href = url;
    } else {
        // Assume it maps to an html file
        const page = url.replace('/', '') + '.html';
        window.location.href = page;
    }
}

function renderHomePage() {
    const pageContent = document.getElementById('page-content');
    pageContent.innerHTML = `
        <div class="relative bg-white overflow-hidden shadow-xl rounded-2xl mb-12">
            <div class="max-w-7xl mx-auto">
                <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div class="sm:text-center lg:text-left">
                            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span class="block xl:inline">Premium Quality</span>
                                <span class="block text-primary xl:inline">Fresh Chicken</span>
                            </h1>
                            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Fresh from the farm to your table. We provide the highest quality chicken cuts, marinated options, and ready-to-cook meals. Order now and get it delivered in minutes!
                            </p>
                            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div class="rounded-md shadow">
                                    <a href="menu.html" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-red-600 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105 duration-200">
                                        Order Now
                                    </a>
                                </div>
                                <div class="mt-3 sm:mt-0 sm:ml-3">
                                    <a href="menu.html" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10 transition-colors">
                                        View Menu
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full transition-opacity duration-1000 ease-in-out opacity-0" 
                     src="https://images.unsplash.com/photo-1587593810167-a6492031e5fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" 
                     alt="Fresh Chicken"
                     onload="this.classList.remove('opacity-0')">
            </div>
        </div>

        <!-- Featured Section -->
        <div class="bg-light py-12 rounded-2xl p-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:text-center">
                    <h2 class="text-base text-primary font-semibold tracking-wide uppercase">Why Choose Us?</h2>
                    <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to buy chicken
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        We prioritize quality, hygiene, and speed to ensure you get the best products for your family.
                    </p>
                </div>

                <div class="mt-10">
                    <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div class="relative">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <i data-lucide="truck" class="w-6 h-6"></i>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">
                                Get your order delivered fresh to your doorstep within 45 minutes of placing your order.
                            </dd>
                        </div>

                        <div class="relative">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <i data-lucide="shield-check" class="w-6 h-6"></i>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">100% Hygienic</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">
                                Our processing centers follow strict hygiene protocols to ensure safety and quality.
                            </dd>
                        </div>

                        <div class="relative">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <i data-lucide="star" class="w-6 h-6"></i>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Premium Quality</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">
                                Sourced from the best farms, antibiotic-free and hormone-free chicken.
                            </dd>
                        </div>

                        <div class="relative">
                            <dt>
                                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                    <i data-lucide="heart" class="w-6 h-6"></i>
                                </div>
                                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Fresh Cuts</p>
                            </dt>
                            <dd class="mt-2 ml-16 text-base text-gray-500">
                                Expertly cut and cleaned, ready to cook right out of the package.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    `;
    
    // Re-initialize icons for dynamic content
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
