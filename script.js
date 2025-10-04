// এই ফাংশনটি নিশ্চিত করে যে সম্পূর্ণ HTML ডকুমেন্ট লোড হওয়ার পরে জাভাস্ক্রিপ্ট কোড চলবে
document.addEventListener('DOMContentLoaded', function() {

    // --- মোবাইল মেনুর জন্য কোড ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));


    // --- ডাইনামিক নোটিশ বোর্ডের জন্য কোড ---
    const noticeContainer = document.getElementById('notice-container');

    fetch('notices.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('নোটিস ফাইল লোড করা যায়নি!');
            }
            return response.json();
        })
        .then(notices => {
            if (notices.length > 0) {
                notices.forEach(notice => {
                    const noticeCard = document.createElement('div');
                    noticeCard.classList.add('notice-card');
                    noticeCard.innerHTML = `
                        <h3>${notice.title}</h3>
                        <p>${notice.content}</p>
                        <small><strong>প্রকাশের তারিখ:</strong> ${notice.date}</small>
                    `;
                    noticeContainer.appendChild(noticeCard);
                });
            } else {
                noticeContainer.innerHTML = '<p>বর্তমানে কোনো নোটিশ নেই।</p>';
            }
        })
        .catch(error => {
            console.error('Error loading notices:', error);
            noticeContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });


    // --- স্মুথ স্ক্রোলিং এর জন্য কোড ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- "উপরে যান" বাটনের জন্য কোড ---
    const topBtn = document.getElementById('topBtn');

    // স্ক্রোল ইভেন্ট লিসেনার যোগ করা হচ্ছে
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    // বাটনে ক্লিক ইভেন্ট লিসেনার যোগ করা হচ্ছে
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});