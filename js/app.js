// Dữ liệu mẫu phim phục vụ ứng dụng
const moviesData = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "Khoa học viễn tưởng",
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        description: "Một tên trộm đánh cắp bí mật thông qua việc thâm nhập vào tiềm thức của mục tiêu được giao nhiệm vụ đặt ý tưởng vào đầu một CEO.",
        poster: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1416%2F8662%2Fproducts%2Finception_2010_imax_original_film_art_2000x.jpg%3Fv%3D1551890318&sp=1792725691T9cd421b127dc63c90f26accb449af0e8989840269f2502cd40e783ecfee96816"
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        genre: "Khoa học viễn tưởng",
        director: "Christopher Nolan",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        description: "Một nhóm các nhà du hành vũ trụ đi qua một lỗ giun trong không gian để tìm kiếm một ngôi nhà mới cho nhân loại.",
        poster: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.uiaj_IMaC7h3NoieAhcmVwHaLG%3Fr%3D0%26pid%3DApi&sp=1792725802T0704aa7cec3a0122cc71ef15fca3725eb360ce215e1a6a8c5f1fcbfae7e38b43"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: "Hành động",
        director: "Christopher Nolan",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
        description: "Batman phải đối mặt với bài kiểm tra tâm lý và thể xác lớn nhất từ kẻ thù tàn bạo mang tên Joker tại thành phố Gotham.",
        poster: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.kDbkVLtnBNM4yJYQZEJj6QHaLH%3Fr%3D0%26pid%3DApi&sp=1792725375T3d40710fe1efdfa9527a6606dd9dc75f4bdf3abdcbac06ed78fa2169f102eb86"
    },
    {
        id: 4,
        title: "Parasite",
        year: 2019,
        genre: "Tâm lý",
        director: "Bong Joon Ho",
        cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        description: "Tất cả các thành viên của gia đình Ki-taek thất nghiệp có mối quan tâm kỳ lạ với gia đình Park giàu có thông qua các thủ đoạn tinh vi.",
        poster: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.ccte8caUmb3SWjnpf2IFjwHaLH%3Fr%3D0%26pid%3DApi&sp=1792725918T902ab95b70d011ff2e71ff465aab4811ec41e9ab307a3461b5a3c33a29f51d49"
    },
    {
        id: 5,
        title: "Titanic",
        year: 1997,
        genre: "Lãng mạn",
        director: "James Cameron",
        cast: "Leonardo DiCaprio, Kate Winslet",
        description: "Một nghệ sĩ nghèo và một cô tiểu thư giàu có phải lòng nhau trên chuyến hải trình định mệnh của con tàu RMS Titanic.",
        poster: "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.tDKLqVjmna8LuxsY3DaYKAHaLH%3Fr%3D0%26pid%3DApi&sp=1792725962T8db4eb77a8d796e444b7f87742ef5eeb0ef0d031b036987361e31e54c9a59f04"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Khởi tạo Light/Dark Mode từ localStorage
    initTheme();

    // 2. Render danh sách thể loại checkbox động vào Sidebar
    renderGenreFilters();

    // 3. Hiển thị toàn bộ danh sách phim ban đầu
    renderMovies(moviesData);

    // 4. Thiết lập sự kiện tương tác
    setupEventListeners();
});

// --- Quản lý Theme (Sáng/Tối) ---
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const icon = themeToggleBtn.querySelector("i");
    const savedTheme = localStorage.getItem("theme") || "light";

    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme, icon);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme, icon);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === "dark") {
        iconElement.className = "fa-solid fa-sun";
    } else {
        iconElement.className = "fa-solid fa-moon";
    }
}

// --- Render Thể loại động không hard-code ---
function renderGenreFilters() {
    const genreContainer = document.getElementById("genre-filters");
    
    // Lấy tất cả các thể loại duy nhất từ mảng dữ liệu
    const genres = [...new Set(moviesData.map(movie => movie.genre))];

    genreContainer.innerHTML = genres.map(genre => `
        <label class="checkbox-item">
            <input type="checkbox" value="${genre}" class="genre-checkbox">
            <span>${genre}</span>
        </label>
    `).join("");
}

// --- Render Danh sách Thẻ Phim ---
function renderMovies(movies) {
    const movieGrid = document.getElementById("movie-grid");
    const resultCount = document.getElementById("result-count");

    resultCount.textContent = `Hiển thị ${movies.length} phim`;

    if (movies.length === 0) {
        movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Không tìm thấy bộ phim phù hợp.</p>`;
        return;
    }

    movieGrid.innerHTML = movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/220x300?text=No+Image'">
            <div class="movie-info">
                <span class="movie-genre-tag">${movie.genre}</span>
                <h4 class="movie-title">${movie.title}</h4>
                <div class="movie-meta">
                    <span>Năm: ${movie.year}</span>
                </div>
            </div>
        </div>
    `).join("");

    // Gắn sự kiện click mở Modal cho từng card phim
    document.querySelectorAll(".movie-card").forEach(card => {
        card.addEventListener("click", () => {
            const movieId = parseInt(card.getAttribute("data-id"));
            openMovieModal(movieId);
        });
    });
}

// --- Logic Bộ lọc đồng thời (Checkbox Thể loại + Tìm kiếm theo tên có Debounce) ---
function setupEventListeners() {
    const searchInput = document.getElementById("search-input");
    const genreCheckboxes = document.querySelectorAll(".genre-checkbox");

    // Kỹ thuật Debounce cho ô tìm kiếm (350ms)
    let debounceTimer;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterMovies();
        }, 350);
    });

    // Sự kiện khi tick/bỏ tick checkbox thể loại
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            filterMovies();
        });
    });

    // Modal close events
    const modal = document.getElementById("movie-modal");
    const closeBtn = document.getElementById("modal-close");

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

function filterMovies() {
    const searchKeyword = document.getElementById("search-input").value.trim().toLowerCase();
    
    // Lấy danh sách các thể loại đang được check
    const selectedGenres = Array.from(document.querySelectorAll(".genre-checkbox:checked"))
        .map(cb => cb.value);

    const filtered = moviesData.filter(movie => {
        // Kiểm tra điều kiện tìm kiếm theo tên (nếu có từ khóa thì tên phim phải chứa từ khóa)
        const matchesSearch = movie.title.toLowerCase().includes(searchKeyword);

        // Kiểm tra điều kiện thể loại (nếu có chọn checkbox thì phim phải thuộc 1 trong các thể loại đã chọn)
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(movie.genre);

        // Đồng thời thỏa mãn cả hai điều kiện
        return matchesSearch && matchesGenre;
    });

    renderMovies(filtered);
}

// --- Hiển thị Chi tiết Modal ---
function openMovieModal(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;

    const modal = document.getElementById("movie-modal");
    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
        <div class="modal-body-content">
            <img src="${movie.poster}" alt="${movie.title}" class="modal-poster" onerror="this.src='https://via.placeholder.com/250x350?text=No+Image'">
            <div class="modal-details">
                <h2>${movie.title} (${movie.year})</h2>
                <span class="movie-genre-tag" style="margin-bottom: 8px;">${movie.genre}</span>
                <p><strong>Đạo diễn:</strong> ${movie.director}</p>
                <p><strong>Diễn viên:</strong> ${movie.cast}</p>
                <p style="margin-top: 8px;"><strong>Nội dung chi tiết:</strong> ${movie.description}</p>
            </div>
        </div>
    `;

    modal.classList.add("active");
}