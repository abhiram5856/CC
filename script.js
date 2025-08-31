// script.js
// Theme management and mobile menu functionality
(function() {
	// Theme toggle functionality
	function initializeTheme() {
		const savedTheme = localStorage.getItem('theme') || 'light';
		document.documentElement.setAttribute('data-theme', savedTheme);
		updateThemeIcon(savedTheme);
	}

	function updateThemeIcon(theme) {
		const themeIcons = document.querySelectorAll('.theme-icon');
		themeIcons.forEach(icon => {
			if (icon) {
				icon.textContent = theme === 'dark' ? '☀️' : '🌙';
			}
		});
	}

	function toggleTheme() {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateThemeIcon(newTheme);
	}

	// Initialize theme on page load
	document.addEventListener('DOMContentLoaded', function() {
		initializeTheme();
		
		// Add event listeners to all theme toggle buttons
		const themeToggleButtons = document.querySelectorAll('#theme-toggle');
		themeToggleButtons.forEach(button => {
			button.addEventListener('click', toggleTheme);
		});
	});

	// Add smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
	
	// Add loading animation for cards
	const cards = document.querySelectorAll('.card, .feature, .highlight-card, .value-item');
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);
	
	cards.forEach(card => {
		card.style.opacity = '0';
		card.style.transform = 'translateY(20px)';
		card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(card);
	});
	
})();
