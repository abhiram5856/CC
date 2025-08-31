// mentorship.js - Simplified Mentorship Hub

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMentorship();
});

// Initialize mentorship hub
function initializeMentorship() {
    setupNavigation();
    setupFilters();
    setupRoleTabs();
}

// Setup navigation between sections
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.dataset.section;
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection)?.classList.add('active');
        });
    });
}

// Setup role tabs (Mentors/Students)
function setupRoleTabs() {
    const roleTabs = document.querySelectorAll('.role-tab');
    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const role = tab.dataset.role;
            
            // Update active role tab
            roleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show/hide appropriate cards
            const mentorCards = document.querySelectorAll('.person-card.mentor');
            const studentCards = document.querySelectorAll('.person-card.student');
            
            if (role === 'mentors') {
                mentorCards.forEach(card => card.style.display = 'block');
                studentCards.forEach(card => card.style.display = 'none');
            } else {
                mentorCards.forEach(card => card.style.display = 'none');
                studentCards.forEach(card => card.style.display = 'block');
            }
        });
    });
}

// Setup filters
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            const category = categoryFilter.value;
            const personCards = document.querySelectorAll('.person-card');
            
            personCards.forEach(card => {
                if (!category || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Connect with mentor/student
function connectWith(name, role) {
    alert(`Connection request sent to ${name} (${role})!`);
}

// Simple message functionality for simplified interface
function sendSimpleMessage() {
    const input = document.getElementById('simple-chat-input');
    if (!input || !input.value.trim()) return;
    
    const message = input.value.trim();
    alert(`Message sent: "${message}"`);
    input.value = '';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeRequestModal();
    }
});

// Request modal functions
function openRequestModal(name, role) {
    const modal = document.getElementById('request-modal');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalAvatar = document.getElementById('modal-avatar');
    
    if (modal && modalName && modalRole && modalAvatar) {
        modalName.textContent = name;
        modalRole.textContent = role;
        modalAvatar.textContent = name.split(' ').map(n => n[0]).join('');
        modal.style.display = 'flex';
    }
}

function closeRequestModal() {
    const modal = document.getElementById('request-modal');
    if (modal) {
        modal.style.display = 'none';
        // Reset form
        const helpTopic = document.getElementById('help-topic');
        const challengeDescription = document.getElementById('challenge-description');
        const experienceLevel = document.getElementById('experience-level');
        const sessionFormat = document.getElementById('session-format');
        
        if (helpTopic) helpTopic.value = '';
        if (challengeDescription) challengeDescription.value = '';
        if (experienceLevel) experienceLevel.value = '';
        if (sessionFormat) sessionFormat.value = '';
    }
}

function submitRequest(event) {
    event.preventDefault();
    
    const name = document.getElementById('modal-name').textContent;
    const topic = document.getElementById('help-topic').value;
    const challenge = document.getElementById('challenge-description').value;
    const level = document.getElementById('experience-level').value;
    const format = document.getElementById('session-format').value;
    
    // Create success notification
    showSuccessNotification(`Request sent to ${name}! They'll respond within 24 hours.`);
    
    closeRequestModal();
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 1.2rem;">✓</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Messages functionality
function markAllRead() {
    const unreadItems = document.querySelectorAll('.message-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });
    showSuccessNotification('All messages marked as read!');
}

function openReplyModal(mentorName) {
    const message = prompt(`Reply to ${mentorName}:`);
    if (message && message.trim()) {
        showSuccessNotification(`Reply sent to ${mentorName}!`);
    }
}

function openScheduleModal(mentorName) {
    const confirmed = confirm(`Schedule a session with ${mentorName}?`);
    if (confirmed) {
        showSuccessNotification(`Session request sent to ${mentorName}!`);
    }
}

function sendQuickReply() {
    const input = document.getElementById('quick-reply-input');
    if (!input || !input.value.trim()) return;
    
    const message = input.value.trim();
    showSuccessNotification('Quick message sent!');
    input.value = '';
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
    const badge = document.querySelector('.notifications-wrapper .notification-badge');
    if (badge) {
        badge.style.display = 'none';
    }
}

// Initialize notifications functionality
document.addEventListener('DOMContentLoaded', function() {
    const notificationsBtn = document.getElementById('notifications-btn');
    const clearAllBtn = document.getElementById('clear-all-notifications');
    
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNotifications();
        });
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllNotifications);
    }
    
    // Close notifications when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('notifications-dropdown');
        const notificationBtn = document.getElementById('notifications-btn');
        
        if (dropdown && !dropdown.contains(event.target) && !notificationBtn.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Profile dropdown functionality
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-menu');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const profileAvatar = document.getElementById('nav-avatar');
    const profileMenu = document.getElementById('profile-menu');
    
    if (profileAvatar && profileMenu) {
        profileAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleProfileDropdown();
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileAvatar.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('active');
            }
        });
    }
});

function viewProfile() {
    window.location.href = 'profile.html';
}

function editProfile() {
    openEditProfileModal();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'auth.html';
    }
}

function openEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Edit Profile</h3>
                <button class="close-btn" onclick="closeEditProfileModal()">&times;</button>
            </div>
            <div class="modal-body">
                <form onsubmit="saveProfile(event)">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="edit-name" value="Abhiram Modukuru" required>
                    </div>
                    <div class="form-group">
                        <label>Bio</label>
                        <textarea id="edit-bio" rows="3" placeholder="Tell us about yourself...">Computer Science student passionate about AI/ML and web development.</textarea>
                    </div>
                    <div class="form-group">
                        <label>Skills</label>
                        <input type="text" id="edit-skills" value="JavaScript, Python, React, Machine Learning" placeholder="Comma-separated skills">
                    </div>
                    <div class="form-group">
                        <label>Year/Experience</label>
                        <select id="edit-year">
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year" selected>2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="closeEditProfileModal()">Cancel</button>
                        <button type="submit" class="btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeEditProfileModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function saveProfile(event) {
    event.preventDefault();
    showSuccessNotification('Profile updated successfully!');
    closeEditProfileModal();
}

// Close profile dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu = document.getElementById('profile-menu');
    
    if (profileMenu && !profileDropdown.contains(event.target)) {
        profileMenu.classList.remove('active');
    }
});

// Export functions for global access
window.openRequestModal = openRequestModal;
window.closeRequestModal = closeRequestModal;
window.submitRequest = submitRequest;
window.markAllRead = markAllRead;
window.openReplyModal = openReplyModal;
window.openScheduleModal = openScheduleModal;
window.sendQuickReply = sendQuickReply;
window.toggleNotifications = toggleNotifications;
window.clearAllNotifications = clearAllNotifications;
window.toggleProfileDropdown = toggleProfileDropdown;
window.viewProfile = viewProfile;
window.editProfile = editProfile;
window.logout = logout;
window.closeEditProfileModal = closeEditProfileModal;
window.saveProfile = saveProfile;
