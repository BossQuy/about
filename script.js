// Danh sách ảnh với đường dẫn ./img/neco/
const imageList = [
    "1.webp",
    "112.gif",
    "1123.gif",
    "12.webp",
    "121.gif",
    "13.webp",
    "132.gif",
    "14.webp",
    "143.gif",
    "15.webp",
    "16.gif",
    "17.gif",
    "2.webp",
    "3.webp",
    "4.webp",
    "5.webp"
];

let intervalId; // Biến để lưu interval

// Hàm để thay đổi ảnh ngẫu nhiên cho tất cả các thẻ có class "neko"
function changeRandomImageForAll() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const images = document.querySelectorAll(".neko");
    
    // Cập nhật src cho tất cả các thẻ có class "neko"
    images.forEach(img => {
        img.src = `./img/neco/${imageList[randomIndex]}`;
    });
}

// Sự kiện click vào bất kỳ thẻ nào có class "neko" để bắt đầu quá trình thay đổi ảnh
document.querySelectorAll(".neko").forEach(img => {
    img.addEventListener("click", () => {
        changeRandomImageForAll(); // Thay đổi ảnh ngay khi click

        // Nếu đã có interval chạy, xóa nó trước khi thiết lập mới
        clearInterval(intervalId);
        
        // Tự động thay đổi ảnh mỗi 5 giây cho tất cả các thẻ có class "neko"
        intervalId = setInterval(changeRandomImageForAll, 5000);
    });
});
changeRandomImageForAll()
// Lắng nghe sự kiện di chuyển chuột
window.addEventListener('mousemove', (event) => {
    const bottomBar = document.getElementById('bottomBar');
    
    // Kiểm tra nếu chuột gần khu vực đáy trang (20px từ đáy màn hình)
    if (window.innerHeight - event.clientY < 20) { 
        bottomBar.classList.add('show');
    } else {
        bottomBar.classList.remove('show');
    }
});
// Tải tin nhắn đã lưu từ LocalStorage
function loadMessages() {
    const chatDisplay = document.getElementById("chatDisplay");
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    // Hiển thị từng tin nhắn
    messages.forEach((msg, index) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${msg.sender}`;
        messageDiv.textContent = msg.text;
        messageDiv.dataset.index = index; // Lưu chỉ số tin nhắn

        // Thêm sự kiện xóa cho tin nhắn của người dùng
        if (msg.sender === "user") {
            messageDiv.addEventListener("click", () => deleteMessage(index));
        }

        chatDisplay.appendChild(messageDiv);
    });

    // Cuộn xuống cuối khu vực hiển thị
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Hàm để xóa tin nhắn theo chỉ số
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.splice(index, 1); // Xóa tin nhắn từ mảng
    localStorage.setItem("chatMessages", JSON.stringify(messages)); // Cập nhật LocalStorage

    // Tải lại các tin nhắn sau khi xóa
    document.getElementById("chatDisplay").innerHTML = ""; // Xóa nội dung hiển thị
    loadMessages(); // Tải lại các tin nhắn đã cập nhật
}

// Lưu tin nhắn vào LocalStorage
function saveMessage(sender, text) {
    const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    messages.push({ sender, text });
    localStorage.setItem("chatMessages", JSON.stringify(messages));
}

// Gửi tin nhắn
function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const chatDisplay = document.getElementById("chatDisplay");

    if (messageInput.value.trim() !== "") {
        // Tạo và hiển thị tin nhắn của người dùng
        const userMessage = document.createElement("div");
        userMessage.className = "message user";
        userMessage.textContent = messageInput.value;

        chatDisplay.appendChild(userMessage);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        // Lưu tin nhắn người dùng vào LocalStorage
        saveMessage("user", messageInput.value);

        // Xóa nội dung trong hộp nhập sau khi gửi
        messageInput.value = "";
        
    }
}

// Xóa toàn bộ tin nhắn (Tùy chọn nếu cần nút reset)
function clearMessages() {
    localStorage.removeItem("chatMessages");
    document.getElementById("chatDisplay").innerHTML = "";
}

// Tải tin nhắn khi trang được load
window.onload = loadMessages;

function toggleBox() {
    const box1 = document.getElementById('box1');
    box1.classList.toggle('show'); // Thêm hoặc xóa class "show"
}

// Đóng box1 khi nhấn vào bất kỳ đâu ngoài box1
document.addEventListener('click', function (e) {
    const box1 = document.getElementById('box1');
    if (box1.classList.contains('show') &&
        !box1.contains(e.target) && 
        !e.target.closest('.profile-pictures')) {
        box1.classList.remove('show');
    }
});



