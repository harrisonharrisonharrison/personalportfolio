let currentPage = 1;
const totalPages = 4;

function changePage(direction) {
  const newPage = currentPage + direction;
  
  if (newPage >= 1 && newPage <= totalPages) {
    const currentPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    const currentIndicator = document.querySelector(`.indicator[data-page="${currentPage}"]`);
    
    currentPageElement.classList.remove('active');
    currentIndicator.classList.remove('active');
    
    const newPageElement = document.querySelector(`.page[data-page="${newPage}"]`);
    const newIndicator = document.querySelector(`.indicator[data-page="${newPage}"]`);
    
    newPageElement.classList.add('active');
    newIndicator.classList.add('active');
    
    currentPage = newPage;
    
    updateArrowStates();
  }
}

function goToPage(pageNumber) {
  if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
    const currentPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    const currentIndicator = document.querySelector(`.indicator[data-page="${currentPage}"]`);
    
    currentPageElement.classList.remove('active');
    currentIndicator.classList.remove('active');
    
    const newPageElement = document.querySelector(`.page[data-page="${pageNumber}"]`);
    const newIndicator = document.querySelector(`.indicator[data-page="${pageNumber}"]`);
    
    newPageElement.classList.add('active');
    newIndicator.classList.add('active');
    
    currentPage = pageNumber;
    
    updateArrowStates();
  }
}

function updateArrowStates() {
  const prevArrow = document.querySelector('.nav-arrow.prev');
  const nextArrow = document.querySelector('.nav-arrow.next');
  
  prevArrow.disabled = currentPage === 1;
  nextArrow.disabled = currentPage === totalPages;
}

document.addEventListener('DOMContentLoaded', function() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const pageNumber = parseInt(this.getAttribute('data-page'));
      goToPage(pageNumber);
    });
  });
  
  updateArrowStates();
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-arrow.prev').addEventListener('click', () => changePage(-1));
  document.querySelector('.nav-arrow.next').addEventListener('click', () => changePage(1));

  // Close speech bubble logic
  const closeBtn = document.querySelector('.close-bubble');
  const speechBubble = document.querySelector('.speech-bubble');
  if (closeBtn && speechBubble) {
    closeBtn.addEventListener('click', () => {
      speechBubble.style.display = 'none';
    });
  }
});