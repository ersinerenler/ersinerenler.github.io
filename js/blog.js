// Blog yazılarının listesi
const blogPosts = [
    {
        id: 'birthday-attack',
        title: 'Kriptografi ve Çakışma Saldırıları: Birthday Attack\'ın Rolü ve İhtimal Hesaplamaları',
        titleEn: 'Cryptography and Collision Attacks: The Role of Birthday Attack and Probability Calculations',
        date: '20 Mart 2024',
        dateEn: 'March 20, 2024',
        image: 'images/blog/birthday-attack.jpg',
        description: 'Kriptografik hash fonksiyonlarının güvenliği ve Birthday Attack saldırısının matematiksel temelleri hakkında detaylı bir inceleme.',
        descriptionEn: 'A detailed examination of the security of cryptographic hash functions and the mathematical foundations of the Birthday Attack.',
        link: 'posts/birthday-attack.html',
        linkEn: 'posts/birthday-attack-en.html'
    }
];

// Blog yazılarını yükle
async function loadBlogPosts() {
    try {
        const response = await fetch('posts/blogs.json');
        const data = await response.json();
        const currentLang = localStorage.getItem('language') || 'en';
        const blogGrid = document.querySelector('.blog-grid');
        
        if (!blogGrid) return;
        
        blogGrid.innerHTML = '';
        
        data.posts.forEach(post => {
            const title = currentLang === 'tr' ? post.title.tr : post.title.en;
            const description = currentLang === 'tr' ? post.description.tr : post.description.en;
            const date = currentLang === 'tr' ? post.date.tr : post.date.en;
            
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.innerHTML = `
                <img src="${post.image}" alt="${title}">
                <div class="blog-content">
                    <h3>${title}</h3>
                    <p class="date">${date}</p>
                    <p>${description}</p>
                    <a href="blog.html?id=${post.id}" class="read-more">${currentLang === 'tr' ? 'Devamını Oku' : 'Read More'}</a>
                </div>
            `;
            blogGrid.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Blog posts could not be loaded:', error);
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            const currentLang = localStorage.getItem('language') || 'en';
            blogGrid.innerHTML = `<p class="error">${currentLang === 'tr' ? 
                'Blog yazıları yüklenemedi. Lütfen daha sonra tekrar deneyin.' : 
                'Blog posts could not be loaded. Please try again later.'}</p>`;
        }
    }
}

// Markdown içeriğini güvenli bir şekilde işle
function renderMarkdown(content) {
    if (!content) return '';
    try {
        return marked.parse(content);
    } catch (error) {
        console.error('Markdown parsing error:', error);
        return content;
    }
}

// Belirli bir blog yazısını yükle
async function loadBlogPost() {
    try {
        const response = await fetch('posts/blogs.json');
        const data = await response.json();
        const currentLang = localStorage.getItem('language') || 'en';
        
        // URL'den blog ID'sini al
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (!id) {
            // ID yoksa blog listesine yönlendir
            window.location.href = 'blog.html';
            return;
        }
        
        const post = data.posts.find(p => p.id === id);
        if (!post) {
            throw new Error('Blog post not found');
        }
        
        const blogPost = document.querySelector('.blog-post');
        if (!blogPost) return;
        
        const title = currentLang === 'tr' ? post.title.tr : post.title.en;
        const date = currentLang === 'tr' ? post.date.tr : post.date.en;
        const content = currentLang === 'tr' ? post.content.tr : post.content.en;
        
        // Blog içeriğini oluştur
        let markdownContent = '';
        
        // Giriş
        if (content.intro) {
            markdownContent += content.intro + '\n\n';
        }
        
        // Bölümler
        if (content.sections) {
            content.sections.forEach(section => {
                if (section.title) {
                    markdownContent += `## ${section.title}\n\n`;
                }
                if (section.content) {
                    markdownContent += `${section.content}\n\n`;
                }
            });
        }
        
        // Sonuç
        if (content.conclusion) {
            markdownContent += `## ${currentLang === 'tr' ? 'Sonuç' : 'Conclusion'}\n\n${content.conclusion}\n\n`;
        }
        
        blogPost.innerHTML = `
            <h1>${title}</h1>
            <span class="date">${date}</span>
            <img src="${post.image}" alt="${title}">
            ${renderMarkdown(markdownContent)}
            ${content.references ? `
                <div class="references">
                    <h3>${currentLang === 'tr' ? 'Kaynaklar' : 'References'}</h3>
                    <ol>
                        ${content.references.map(ref => `<li>${renderMarkdown(ref)}</li>`).join('')}
                    </ol>
                </div>
            ` : ''}
        `;
        
        // Sayfa başlığını güncelle
        document.title = `${title} | Ersin Erenler`;
        
    } catch (error) {
        console.error('Blog post could not be loaded:', error);
        const blogPost = document.querySelector('.blog-post');
        if (blogPost) {
            const currentLang = localStorage.getItem('language') || 'en';
            blogPost.innerHTML = `<p class="error">${currentLang === 'tr' ? 
                'Blog yazısı yüklenemedi. Lütfen daha sonra tekrar deneyin.' : 
                'Blog post could not be loaded. Please try again later.'}</p>`;
        }
    }
}

// Sayfa yüklendiğinde içeriği kontrol et ve yükle
document.addEventListener('DOMContentLoaded', () => {
    // marked.js ayarlarını yapılandır
    marked.setOptions({
        breaks: true,        // Satır sonlarını <br> olarak işle
        gfm: true,          // GitHub Flavored Markdown'ı kullan
        headerIds: true,    // Başlıklara otomatik ID ekle
        mangle: false,      // Başlık ID'lerini değiştirme
        sanitize: false,    // HTML'e izin ver
        smartLists: true,   // Akıllı liste işaretleri
        smartypants: true,  // Akıllı noktalama işaretleri
        xhtml: true         // XHTML uyumlu çıktı
    });

    // URL'de id parametresi varsa blog yazısını, yoksa blog listesini yükle
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        loadBlogPost();
    } else {
        loadBlogPosts();
    }
});

// Dil değiştiğinde içeriği güncelle
document.addEventListener('languageChanged', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id) {
        loadBlogPost();
    } else {
        loadBlogPosts();
    }
}); 