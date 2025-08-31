// shared.js - Common functionality for all pages
(function() {
    // Profile dropdown functionality
    function toggleProfileDropdown() {
        const dropdown = document.getElementById('profile-menu');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }

    function viewProfile() {
        window.location.href = 'profile.html';
    }

    function editProfile() {
        // Check if we're on profile page and modal exists
        const editModal = document.getElementById('edit-modal');
        if (editModal) {
            // We're on profile page, open the modal
            editModal.style.display = 'flex';
            
            // Pre-fill the form with current user data
            const currentUser = localStorage.getItem('gm_current');
            if (currentUser) {
                const users = JSON.parse(localStorage.getItem('gm_users') || '[]');
                const user = users.find(u => u.email === currentUser);
                
                if (user) {
                    const editName = document.getElementById('edit-name');
                    const editRole = document.getElementById('edit-role');
                    const editYear = document.getElementById('edit-year');
                    const editStream = document.getElementById('edit-stream');
                    const editInterests = document.getElementById('edit-interests');
                    
                    if (editName) editName.value = user.name || '';
                    if (editRole) editRole.value = user.role || '';
                    if (editYear) editYear.value = user.year || '';
                    if (editStream) editStream.value = user.stream || '';
                    if (editInterests) editInterests.value = user.interests ? user.interests.join(', ') : '';
                }
            }
        } else {
            // Not on profile page, redirect there
            window.location.href = 'profile.html';
        }
    }

    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('gm_current');
            window.location.href = 'auth.html#signin';
        }
    }

    // Mobile menu functionality
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Notifications functionality
    function toggleNotifications() {
        const dropdown = document.getElementById('notifications-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('active');
        }
    }

    function clearAllNotifications() {
        const notificationsList = document.querySelector('#notifications-dropdown .notifications-list');
        if (notificationsList) {
            notificationsList.innerHTML = '<div class="no-notifications">No notifications</div>';
        }
        
        // Hide notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeMobileMenu();
        
        // Add profile dropdown functionality
        const profileAvatar = document.getElementById('nav-avatar');
        const profileMenu = document.getElementById('profile-menu');
        
        if (profileAvatar && profileMenu) {
            // Add right-click for dropdown menu
            profileAvatar.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                toggleProfileDropdown();
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!profileAvatar.contains(e.target) && !profileMenu.contains(e.target)) {
                    profileMenu.classList.remove('active');
                }
            });
        }

        // Add notifications functionality
        const notificationsBtn = document.getElementById('notifications-btn');
        const clearAllBtn = document.getElementById('clear-all-notifications');
        
        console.log('Setting up notifications...');
        console.log('Notifications button:', notificationsBtn);
        console.log('Clear all button:', clearAllBtn);
        
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Notifications button clicked!');
                toggleNotifications();
            });
            console.log('Added click listener to notifications button');
        }
        
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Clear all button clicked!');
                clearAllNotifications();
            });
            console.log('Added click listener to clear all button');
        }
        
        // Close notifications when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('notifications-dropdown');
            const notificationBtn = document.getElementById('notifications-btn');
            
            if (dropdown && !dropdown.contains(event.target) && !notificationBtn.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Check authentication state and update UI
        checkAuthState();
    });

    // Authentication state management
    function checkAuthState() {
        const currentUser = localStorage.getItem('gm_current');
        const heroGuest = document.getElementById('hero-guest');
        const heroUser = document.getElementById('hero-user');
        const welcomeText = document.getElementById('welcome-text');
        const userInfo = document.getElementById('user-info');
        const mobileAuth = document.getElementById('mobile-auth');
        const mobileLogout = document.getElementById('mobile-logout');
        const simpleNav = document.querySelector('.nav:not(.full-nav)');
        const fullNav = document.getElementById('full-nav');
        
        // Only show/hide navigation elements if they exist (home page specific)
        if (heroGuest && heroUser) {
            if (currentUser) {
                // User is signed in - show full navbar
                if (simpleNav) simpleNav.style.display = 'none';
                if (fullNav) fullNav.style.display = 'flex';
                if (heroGuest) heroGuest.style.display = 'none';
                if (heroUser) heroUser.style.display = 'block';
                if (mobileAuth) mobileAuth.style.display = 'none';
                if (mobileLogout) mobileLogout.style.display = 'block';
                
                // Get user data and update welcome message
                const users = JSON.parse(localStorage.getItem('gm_users') || '[]');
                const user = users.find(u => u.email === currentUser);
                
                if (user && welcomeText && userInfo) {
                    welcomeText.textContent = `Welcome back, ${user.name}!`;
                    userInfo.textContent = `Ready to connect with your peer community?`;
                }
                
                // Add profile avatar to navigation
                addProfileAvatar(user);
            } else {
                // User is not signed in - show simple navbar
                if (simpleNav) simpleNav.style.display = 'flex';
                if (fullNav) fullNav.style.display = 'none';
                if (heroGuest) heroGuest.style.display = 'block';
                if (heroUser) heroUser.style.display = 'none';
                if (mobileAuth) mobileAuth.style.display = 'block';
                if (mobileLogout) mobileLogout.style.display = 'none';
                
                // Remove profile avatar from navigation
                removeProfileAvatar();
            }
        } else {
            // We're on other pages (not home page) - always show navigation
            // Just handle profile avatar and mobile auth
            if (currentUser) {
                const users = JSON.parse(localStorage.getItem('gm_users') || '[]');
                const user = users.find(u => u.email === currentUser);
                if (user) {
                    addProfileAvatar(user);
                }
                // Hide mobile auth, show mobile logout
                if (mobileAuth) mobileAuth.style.display = 'none';
                if (mobileLogout) mobileLogout.style.display = 'block';
            } else {
                removeProfileAvatar();
                // Show mobile auth, hide mobile logout
                if (mobileAuth) mobileAuth.style.display = 'block';
                if (mobileLogout) mobileLogout.style.display = 'none';
            }
        }
    }
    
    // Add profile avatar to navigation
    function addProfileAvatar(user) {
        const navRight = document.querySelector('.nav-right');
        if (!navRight) return;
        
        // Remove existing avatar if any
        removeProfileAvatar();
        
        // Create avatar element
        const avatar = document.createElement('div');
        avatar.className = 'nav-avatar';
        avatar.id = 'nav-avatar';
        avatar.title = `Click to go to ${user.name}'s Profile | Right-click for menu`;
        avatar.innerHTML = user.name.charAt(0).toUpperCase();
        
        // Make avatar clickable to go to profile
        avatar.style.cursor = 'pointer';
        avatar.addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = 'profile.html';
        });
        
        // Insert avatar before theme toggle
        const themeToggle = navRight.querySelector('.theme-toggle');
        if (themeToggle) {
            navRight.insertBefore(avatar, themeToggle);
        } else {
            navRight.appendChild(avatar);
        }
    }
    
    // Remove profile avatar from navigation
    function removeProfileAvatar() {
        const existingAvatar = document.querySelector('.nav-avatar');
        if (existingAvatar) {
            existingAvatar.remove();
        }
    }

    // Make functions globally available
    window.viewProfile = viewProfile;
    window.editProfile = editProfile;
    window.logout = logout;
    window.toggleProfileDropdown = toggleProfileDropdown;
    window.toggleNotifications = toggleNotifications;
    window.clearAllNotifications = clearAllNotifications;
})();
