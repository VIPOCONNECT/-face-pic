// ׳׳×׳—׳•׳ ׳¨׳׳©׳•׳ ׳™
function init() {
  // ׳™׳¦׳™׳¨׳× ׳©׳§׳₪׳™׳ ׳׳“׳•׳’׳׳”
  slides = [
    {
      text: '׳‘׳¨׳•׳›׳™׳ ׳”׳‘׳׳™׳ ׳׳׳¢׳¨׳›׳× ׳™׳¦׳™׳¨׳× ׳¡׳¨׳˜׳•׳ ׳™׳',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      font: 'Arial',
      fontSize: 36,
      textColor: '#ffffff',
      hasBg: true,
      bgColor: '#000000',
      bgOpacity: 0.7,
      pos: 'center',
      customPos: false,
      posX: 50,
      posY: 50,
      anim: 'fade',
      imageAnim: 'none',
      textAnimation: 'typing'
    },
    {
      text: '׳׳₪׳©׳¨׳•׳™׳•׳× ׳¢׳™׳¦׳•׳‘ ׳׳×׳§׳“׳׳•׳×',
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3',
      font: 'Verdana',
      fontSize: 30,
      textColor: '#ffffff',
      hasBg: true,
      bgColor: '#0000ff',
      bgOpacity: 0.5,
      pos: 'top',
      customPos: false,
      posX: 50,
      posY: 50,
      anim: 'slide-up',
      imageAnim: 'pulse',
      textAnimation: 'glow'
    },
    {
      text: '׳׳ ׳™׳׳¦׳™׳•׳× ׳˜׳§׳¡׳˜ ׳׳™׳•׳—׳“׳•׳×',
      image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf',
      font: 'Tahoma',
      fontSize: 28,
      textColor: '#ffff00',
      hasBg: true,
      bgColor: '#ff0000',
      bgOpacity: 0.3,
      pos: 'bottom',
      customPos: false,
      posX: 50,
      posY: 50,
      anim: 'zoom-in',
      imageAnim: 'float',
      textAnimation: 'rainbow'
    }
  ];
  
  // ׳”׳•׳¡׳₪׳× ׳׳•׳“׳™׳• ׳•׳×׳›׳•׳ ׳•׳× ׳—׳“׳©׳•׳×
  audioSettings = {
    backgroundMusic: '',
    volume: 0.5,
    voiceOver: null
  };
  
  // ׳׳×׳—׳•׳ ׳׳©׳×׳ ׳™׳ ׳’׳׳•׳‘׳׳™׳™׳
  currentSlide = 0;
  transitionTime = 3;
  editMode = false;
  
  // ׳™׳¦׳™׳¨׳× ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  selectSlide(0);
  generatePreview();
  
  // ׳”׳’׳“׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳
  setupEventListeners();
  
  // ׳¢׳“׳›׳•׳ ׳¡׳¨׳’׳ ׳”׳–׳׳
  updateTimeline();
  
  // ׳”׳¦׳’׳× ׳”׳•׳“׳¢׳× ׳‘׳¨׳•׳›׳™׳ ׳”׳‘׳׳™׳
  console.log('׳׳¢׳¨׳›׳× ׳™׳¦׳™׳¨׳× ׳¡׳¨׳˜׳•׳ ׳™׳ ׳ ׳˜׳¢׳ ׳” ׳‘׳”׳¦׳׳—׳”!');
}

// ׳”׳₪׳¢׳׳× ׳”׳׳×׳—׳•׳ ׳‘׳˜׳¢׳™׳ ׳× ׳”׳¢׳׳•׳“
window.onload = init;

function togglePositionControls(slideIndex) {
  const slide = slides[slideIndex];
  const presetPos = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .preset-position`);
  const customPos = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .custom-position`);
  
  if (presetPos && customPos) {
    presetPos.style.display = slide.customPos ? 'none' : 'block';
    customPos.style.display = slide.customPos ? 'block' : 'none';
  }
}

function toggleBgOptions(slideIndex) {
  const slide = slides[slideIndex];
  const bgOptions = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .bg-options`);
  
  if (bgOptions) {
    bgOptions.style.display = slide.hasBg ? 'block' : 'none';
  }
}

function updatePositionValues(slideIndex) {
  const posXValue = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .custom-position input[type="range"]:nth-of-type(1) + .position-value`);
  const posYValue = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .custom-position input[type="range"]:nth-of-type(2) + .position-value`);
  
  if (posXValue && posYValue) {
    const posXInput = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .custom-position input[type="range"]:nth-of-type(1)`);
    const posYInput = document.querySelector(`.slide-config:nth-child(${slideIndex+1}) .custom-position input[type="range"]:nth-of-type(2)`);
    
    if (posXInput && posYInput) {
      posXInput.addEventListener('input', function() {
        posXValue.textContent = this.value + '%';
      });
      
      posYInput.addEventListener('input', function() {
        posYValue.textContent = this.value + '%';
      });
    }
  }
}

function generatePreview(){
  const previewFrame = document.getElementById('previewFrame');
  const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  
  // ׳™׳¦׳™׳¨׳× HTML ׳׳×׳¦׳•׳’׳” ׳׳§׳“׳™׳׳”
  let html = `
  <!DOCTYPE html>
  <html dir="rtl">
  <head>
    <meta charset="UTF-8">
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
        background-color: #000;
      }
      
      #slideshow {
        width: 100%;
        height: 100%;
        position: relative;
      }
      
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 0;
        transition: opacity 1s;
      }
      
      .slide-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: -1;
      }
      
      .slide.active {
        opacity: 1;
        z-index: 1;
      }
      
      .text {
        padding: 10px 20px;
        font-weight: bold;
        text-align: center;
        position: absolute;
        max-width: 80%;
        cursor: move;
        z-index: 2;
      }
      
      .center { left: 50%; top: 50%; transform: translate(-50%, -50%); }
      .top { left: 50%; top: 10%; transform: translate(-50%, 0); }
      .bottom { left: 50%; bottom: 10%; transform: translate(-50%, 0); }
      .left { left: 10%; top: 50%; transform: translate(0, -50%); }
      .right { right: 10%; top: 50%; transform: translate(0, -50%); }
      .top-left { left: 10%; top: 10%; }
      .top-right { right: 10%; top: 10%; }
      .bottom-left { left: 10%; bottom: 10%; }
      .bottom-right { right: 10%; bottom: 10%; }
      
      /* ׳׳ ׳™׳׳¦׳™׳•׳× ׳˜׳§׳¡׳˜ */
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #fff }
      }
      
      @keyframes wave {
        0%, 100% { transform: translateY(0); }
        25% { transform: translateY(-8px); }
        75% { transform: translateY(8px); }
      }
      
      @keyframes glow {
        0%, 100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
        50% { text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8); }
      }
      
      @keyframes shadow-pop {
        0% { text-shadow: 0 0 transparent; }
        100% { text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5); }
      }
      
      @keyframes rainbow {
        0% { color: red; }
        14% { color: orange; }
        28% { color: yellow; }
        42% { color: green; }
        56% { color: blue; }
        70% { color: indigo; }
        85% { color: violet; }
        100% { color: red; }
      }
      
      @keyframes blur-in-text {
        0% { filter: blur(10px); opacity: 0; }
        100% { filter: blur(0); opacity: 1; }
      }
      
      @keyframes jump {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
        60% { transform: translateY(-10px); }
      }
      
      @keyframes fade-in-chars {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      /* ׳׳ ׳™׳׳¦׳™׳•׳× ׳×׳׳•׳ ׳•׳× */
      @keyframes pulse { 
        0% { transform: scale(1); } 
        50% { transform: scale(1.05); } 
        100% { transform: scale(1); } 
      }
      
      @keyframes float { 
        0% { transform: translateY(0px); } 
        50% { transform: translateY(-10px); } 
        100% { transform: translateY(0px); } 
      }
      
      @keyframes shake { 
        0%, 100% { transform: translateX(0); } 
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 
        20%, 40%, 60%, 80% { transform: translateX(5px); } 
      }
      
      @keyframes blur-in { 
        from { filter: blur(10px); opacity: 0; } 
        to { filter: blur(0); opacity: 1; } 
      }
      
      @keyframes pan { 
        from { background-position: 0% 0%; } 
        to { background-position: 100% 0%; } 
      }
      
      .text-animation-typing {
        overflow: hidden;
        white-space: nowrap;
        border-right: 3px solid;
        width: 0;
        animation: typing 3.5s steps(40, end) forwards, blink-caret 0.75s step-end infinite;
      }
      
      .text-animation-wave span {
        display: inline-block;
        animation: wave 2s ease-in-out infinite;
        animation-delay: calc(0.1s * var(--char-index));
      }
      
      .text-animation-glow {
        animation: glow 2s ease-in-out infinite;
      }
      
      .text-animation-shadow-pop {
        animation: shadow-pop 0.5s ease-in-out forwards;
      }
      
      .text-animation-rainbow {
        animation: rainbow 5s linear infinite;
      }
      
      .text-animation-blur-in-text {
        animation: blur-in-text 1s ease-in-out forwards;
      }
      
      .text-animation-jump {
        animation: jump 2s ease-in-out infinite;
      }
      
      .text-animation-fade-in-chars span {
        display: inline-block;
        opacity: 0;
        animation: fade-in-chars 0.5s ease-in-out forwards;
        animation-delay: calc(0.05s * var(--char-index));
      }
      
      .image-animation-pulse {
        animation: pulse 3s infinite ease-in-out;
      }
      
      .image-animation-float {
        animation: float 5s infinite ease-in-out;
      }
      
      .image-animation-shake {
        animation: shake 1s infinite ease-in-out;
      }
      
      .image-animation-blur-in {
        animation: blur-in 2s ease-in-out forwards;
      }
      
      .image-animation-pan {
        animation: pan 15s linear infinite alternate;
        background-size: 120% 120% !important;
      }
      
      /* ׳¡׳’׳ ׳•׳ ׳׳׳¦׳‘ ׳¢׳¨׳™׳›׳” */
      .edit-mode .text {
        border: 2px dashed #fff;
        cursor: move;
      }
      
      .position-indicator {
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
        color: #000;
        padding: 5px;
        border-radius: 3px;
        font-size: 12px;
        pointer-events: none;
        z-index: 100;
      }
    </style>
  </head>
  <body>
    <div id="slideshow">`;
  
  // ׳”׳•׳¡׳₪׳× ׳”׳©׳§׳₪׳™׳
  slides.forEach((s, i) => {
    // ׳§׳‘׳™׳¢׳× ׳¡׳’׳ ׳•׳ ׳”׳¨׳§׳¢ ׳׳˜׳§׳¡׳˜
    let textBgStyle = '';
    if (s.hasBg) {
      // ׳©׳™׳׳•׳© ׳‘׳¦׳‘׳¢ ׳”׳¨׳§׳¢ ׳•׳©׳§׳™׳₪׳•׳× ׳©׳ ׳‘׳—׳¨׳•
      const bgColorWithOpacity = s.bgColor ? `${s.bgColor}${Math.round(s.bgOpacity * 255).toString(16).padStart(2, '0')}` : 'rgba(0,0,0,0.5)';
      textBgStyle = `background-color: ${bgColorWithOpacity};`;
    }
    
    // ׳§׳‘׳™׳¢׳× ׳׳™׳§׳•׳ ׳”׳˜׳§׳¡׳˜
    let positionClass = s.customPos ? '' : s.pos || 'center';
    let positionStyle = '';
    
    if (s.customPos) {
      positionStyle = `left:${s.posX}%;top:${s.posY}%;transform:translate(-50%, -50%);`;
    }
    
    // ׳”׳›׳ ׳× ׳”׳˜׳§׳¡׳˜ ׳¢׳ ׳׳ ׳™׳׳¦׳™׳”
    let textContent = s.text;
    let textAnimationClass = '';
    
    // ׳”׳•׳¡׳₪׳× ׳§׳׳׳¡ ׳׳ ׳™׳׳¦׳™׳” ׳׳˜׳§׳¡׳˜
    if (s.textAnimation && s.textAnimation !== 'none') {
      textAnimationClass = `text-animation-${s.textAnimation}`;
      
      // ׳¢׳™׳‘׳•׳“ ׳׳™׳•׳—׳“ ׳׳׳ ׳™׳׳¦׳™׳•׳× ׳©׳“׳•׳¨׳©׳•׳× ׳˜׳™׳₪׳•׳ ׳‘׳›׳ ׳×׳• ׳‘׳ ׳₪׳¨׳“
      if (['wave', 'fade-in-chars'].includes(s.textAnimation)) {
        textContent = '';
        for (let j = 0; j < s.text.length; j++) {
          textContent += `<span style="--char-index:${j}">${s.text[j]}</span>`;
        }
      }
    }
    
    // ׳”׳•׳¡׳₪׳× ׳§׳׳׳¡ ׳׳ ׳™׳׳¦׳™׳™׳× ׳×׳׳•׳ ׳”
    let imageAnimationClass = '';
    if (s.imageAnim && s.imageAnim !== 'none') {
      imageAnimationClass = `image-animation-${s.imageAnim}`;
    }
    
    // ׳”׳’׳“׳¨׳× ׳׳—׳׳§׳× active ׳׳©׳§׳£ ׳”׳¨׳׳©׳•׳
    const isActive = i === 0 ? ' active' : '';
    
    // ׳”׳•׳¡׳₪׳× ׳׳–׳”׳” ׳™׳™׳—׳•׳“׳™ ׳׳׳׳׳ ׳˜ ׳”׳˜׳§׳¡׳˜
    const textId = `text-${i}`;
    
    html += `
      <div class="slide${isActive}" style="background-image: url('${s.image}');" data-animation="${s.anim}" data-slide-index="${i}">
        <div class="slide-background ${imageAnimationClass}" style="background-image: url('${s.image}')"></div>
        <div id="${textId}" class="text ${positionClass} ${textAnimationClass}" style="font-family:${s.font};font-size:${s.fontSize}px;color:${s.textColor};${textBgStyle}${positionStyle}" data-slide-index="${i}">${textContent}</div>
      </div>`;
  });
  
  html += `
    </div>
    <div class="position-indicator" style="display:none;"></div>
    
    <script>
      // ׳׳¢׳‘׳¨ ׳‘׳™׳ ׳©׳§׳₪׳™׳
      let currentSlide = 0;
      const slides = document.querySelectorAll('.slide');
      let editMode = false;
      let draggedElement = null;
      let offsetX = 0, offsetY = 0;
      const positionIndicator = document.querySelector('.position-indicator');
      
      // ׳”׳¦׳’׳× ׳”׳©׳§׳£ ׳”׳¨׳׳©׳•׳
      if (slides.length > 0) {
        slides[0].classList.add('active');
      }
      
      // ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳׳¢׳‘׳¨ ׳׳©׳§׳£ ׳”׳‘׳
      function nextSlide() {
        if (editMode) return; // ׳׳ ׳׳¢׳‘׳•׳¨ ׳‘׳™׳ ׳©׳§׳₪׳™׳ ׳‘׳׳¦׳‘ ׳¢׳¨׳™׳›׳”
        
        // ׳”׳¡׳¨׳× ׳”׳׳—׳׳§׳” active ׳׳”׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
        slides[currentSlide].classList.remove('active');
        
        // ׳׳¢׳‘׳¨ ׳׳©׳§׳£ ׳”׳‘׳
        currentSlide = (currentSlide + 1) % slides.length;
        
        // ׳”׳•׳¡׳₪׳× ׳”׳׳—׳׳§׳” active ׳׳©׳§׳£ ׳”׳‘׳
        slides[currentSlide].classList.add('active');
        
        // ׳”׳•׳¡׳₪׳× ׳׳ ׳™׳׳¦׳™׳™׳× ׳׳¢׳‘׳¨
        const animation = slides[currentSlide].getAttribute('data-animation');
        if (animation) {
          slides[currentSlide].style.animation = animation + ' 1s';
          
          // ׳”׳¡׳¨׳× ׳”׳׳ ׳™׳׳¦׳™׳” ׳׳—׳¨׳™ ׳©׳”׳™׳ ׳׳¡׳×׳™׳™׳׳×
          setTimeout(() => {
            slides[currentSlide].style.animation = '';
          }, 1000);
        }
      }
      
      // ׳”׳₪׳¢׳׳× ׳”׳׳¢׳‘׳¨ ׳”׳׳•׳˜׳•׳׳˜׳™ ׳‘׳™׳ ׳”׳©׳§׳₪׳™׳
      let slideInterval;
      
      function startSlideshow() {
        if (slides.length > 1 && !editMode) {
          slideInterval = setInterval(nextSlide, ${transitionTime * 1000});
        }
      }
      
      function stopSlideshow() {
        clearInterval(slideInterval);
      }
      
      startSlideshow();
      
      // ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳׳’׳¨׳™׳¨׳× ׳˜׳§׳¡׳˜
      function enableDragMode() {
        editMode = true;
        document.body.classList.add('edit-mode');
        stopSlideshow();
        
        // ׳”׳•׳¡׳₪׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳’׳¨׳™׳¨׳”
        document.querySelectorAll('.text').forEach(text => {
          text.addEventListener('mousedown', startDrag);
        });
      }
      
      function disableDragMode() {
        editMode = false;
        document.body.classList.remove('edit-mode');
        startSlideshow();
        
        // ׳”׳¡׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳’׳¨׳™׳¨׳”
        document.querySelectorAll('.text').forEach(text => {
          text.removeEventListener('mousedown', startDrag);
        });
      }
      
      function startDrag(e) {
        if (!editMode) return;
        
        draggedElement = e.target;
        
        // ׳׳ ׳׳—׳¦׳• ׳¢׳ span ׳‘׳×׳•׳ ׳׳׳׳ ׳˜ ׳˜׳§׳¡׳˜, ׳ ׳©׳×׳׳© ׳‘׳׳׳׳ ׳˜ ׳”׳׳‘
        if (!draggedElement.classList.contains('text')) {
          draggedElement = draggedElement.closest('.text');
        }
        
        if (!draggedElement) return;
        
        const rect = draggedElement.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        
        // ׳”׳¦׳’׳× ׳׳—׳•׳•׳ ׳”׳׳™׳§׳•׳
        positionIndicator.style.display = 'block';
        updatePositionIndicator(e);
      }
      
      function drag(e) {
        if (!draggedElement) return;
        
        const slideRect = draggedElement.closest('.slide').getBoundingClientRect();
        
        // ׳—׳™׳©׳•׳‘ ׳”׳׳™׳§׳•׳ ׳”׳—׳“׳© ׳‘׳׳—׳•׳–׳™׳
        const x = ((e.clientX - offsetX - slideRect.left) / slideRect.width) * 100;
        const y = ((e.clientY - offsetY - slideRect.top) / slideRect.height) * 100;
        
        // ׳”׳’׳‘׳׳× ׳”׳׳™׳§׳•׳ ׳׳’׳‘׳•׳׳•׳× ׳”׳©׳§׳£
        const boundedX = Math.max(0, Math.min(100, x));
        const boundedY = Math.max(0, Math.min(100, y));
        
        // ׳¢׳“׳›׳•׳ ׳׳™׳§׳•׳ ׳”׳׳׳׳ ׳˜
        draggedElement.style.left = boundedX + '%';
        draggedElement.style.top = boundedY + '%';
        draggedElement.style.transform = 'none';
        
        // ׳”׳¡׳¨׳× ׳׳—׳׳§׳•׳× ׳׳™׳§׳•׳ ׳§׳‘׳•׳¢׳•׳×
        draggedElement.classList.remove('center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right');
        
        // ׳¢׳“׳›׳•׳ ׳׳—׳•׳•׳ ׳”׳׳™׳§׳•׳
        updatePositionIndicator(e);
        
        // ׳©׳׳™׳—׳× ׳”׳׳™׳“׳¢ ׳׳—׳׳•׳ ׳”׳׳‘
        const slideIndex = parseInt(draggedElement.getAttribute('data-slide-index'));
        
        window.parent.postMessage({
          type: 'position-update',
          slideIndex: slideIndex,
          posX: Math.round(boundedX),
          posY: Math.round(boundedY)
        }, '*');
      }
      
      function stopDrag() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        draggedElement = null;
        
        // ׳”׳¡׳×׳¨׳× ׳׳—׳•׳•׳ ׳”׳׳™׳§׳•׳
        positionIndicator.style.display = 'none';
      }
      
      function updatePositionIndicator(e) {
        if (!draggedElement) return;
        
        const slideRect = draggedElement.closest('.slide').getBoundingClientRect();
        const x = ((e.clientX - offsetX - slideRect.left) / slideRect.width) * 100;
        const y = ((e.clientY - offsetY - slideRect.top) / slideRect.height) * 100;
        
        positionIndicator.textContent = "X: " + Math.round(x) + "%, Y: " + Math.round(y) + "%";
        positionIndicator.style.left = (e.clientX + 10) + 'px';
        positionIndicator.style.top = (e.clientY + 10) + 'px';
      }
      
      // ׳”׳•׳¡׳₪׳× ׳׳׳–׳™׳ ׳׳”׳•׳“׳¢׳•׳× ׳׳”׳—׳׳•׳ ׳”׳׳‘
      window.addEventListener('message', function(event) {
        if (event.data.type === 'toggle-edit-mode') {
          if (event.data.enabled) {
            enableDragMode();
          } else {
            disableDragMode();
          }
        }
      });
      
      // ׳›׳₪׳×׳•׳¨ ׳׳§׳׳“׳× Escape ׳׳¦׳׳× ׳׳׳¦׳‘ ׳¢׳¨׳™׳›׳”
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && editMode) {
          disableDragMode();
        }
      });
    </script>
  </body>
  </html>`;
  
  // ׳›׳×׳™׳‘׳× ׳”-HTML ׳׳×׳•׳ ׳”-iframe
  doc.open();
  doc.write(html);
  doc.close();
  
  // ׳”׳•׳¡׳₪׳× ׳׳׳–׳™׳ ׳׳”׳•׳“׳¢׳•׳× ׳׳”-iframe
  window.addEventListener('message', function(event) {
    if (event.data.type === 'position-update') {
      const slideIndex = event.data.slideIndex;
      const posX = event.data.posX;
      const posY = event.data.posY;
      
      // ׳¢׳“׳›׳•׳ ׳׳™׳§׳•׳ ׳”׳˜׳§׳¡׳˜
      slides[slideIndex].customPos = true;
      slides[slideIndex].pos = 'custom';
      slides[slideIndex].posX = posX;
      slides[slideIndex].posY = posY;
      
      // ׳¢׳“׳›׳•׳ ׳×׳¦׳•׳’׳× ׳”׳׳™׳§׳•׳
      document.getElementById('posX').textContent = posX;
      document.getElementById('posY').textContent = posY;
      
      // ׳¢׳“׳›׳•׳ ׳©׳“׳•׳× ׳”׳˜׳•׳₪׳¡
      document.getElementById('slidePosX').value = posX;
      document.getElementById('slidePosY').value = posY;
      
      // ׳¢׳“׳›׳•׳ ׳׳¦׳‘ ׳׳™׳§׳•׳ ׳׳•׳×׳׳ ׳׳™׳©׳™׳×
      document.getElementById('slidePos').value = 'custom';
      document.querySelectorAll('.custom-pos-group').forEach(group => group.style.display = 'block');
      updateSlideProperty('customPos', true);
    }
  });
}

function downloadHTML(){
  generatePreview();
  let html=document.getElementById('previewFrame').contentWindow.document.documentElement.outerHTML;
  let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
  a.download='banner.html';a.click();
}

function editAgain(){renderSlides();}
window.onload=init;

// ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳¢׳“׳›׳•׳ ׳׳©׳§׳™׳₪׳•׳×
function updateTransitionTime(value) {
  transitionTime = parseInt(value);
  generatePreview();
}

function updateSlideText(index, value) {
  slides[index].text = value;
  generatePreview();
}

function updateSlideImage(index, value) {
  slides[index].image = value;
  generatePreview();
}

function updateSlideFont(index, value) {
  slides[index].font = value;
  generatePreview();
}

function updateSlideFontSize(index, value) {
  slides[index].fontSize = value;
  generatePreview();
}

function updateSlideTextColor(index, value) {
  slides[index].textColor = value;
  generatePreview();
}

function updateSlideHasBg(index, value) {
  slides[index].hasBg = value;
  generatePreview();
}

function updateSlideBgColor(index, value) {
  slides[index].bgColor = value;
  generatePreview();
}

function updateSlideBgOpacity(index, value) {
  slides[index].bgOpacity = parseFloat(value);
  generatePreview();
}

function updateSlidePosition(index, value) {
  slides[index].pos = value;
  slides[index].customPos = value === 'custom';
  generatePreview();
}

function updateSlidePositionX(index, value) {
  slides[index].posX = value;
  generatePreview();
}

function updateSlidePositionY(index, value) {
  slides[index].posY = value;
  generatePreview();
}

function updateSlideAnimation(index, value) {
  slides[index].anim = value;
  generatePreview();
}

function updateSlideImageAnimation(index, value) {
  slides[index].imageAnim = value;
  generatePreview();
}

function updateSlideTextAnimation(index, value) {
  slides[index].textAnimation = value;
  generatePreview();
}

// ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳׳ ׳™׳”׳•׳ ׳©׳§׳₪׳™׳
function removeSlide(index) {
  if (slides.length <= 1) {
    alert('׳׳ ׳ ׳™׳×׳ ׳׳׳—׳•׳§ ׳׳× ׳”׳©׳§׳£ ׳”׳׳—׳¨׳•׳');
    return;
  }
  
  // ׳׳—׳™׳§׳× ׳”׳©׳§׳£ ׳׳”׳׳¢׳¨׳
  slides.splice(index, 1);
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  
  // ׳‘׳—׳™׳¨׳× ׳”׳©׳§׳£ ׳”׳§׳•׳“׳ ׳׳• ׳”׳‘׳
  if (index >= slides.length) {
    selectSlide(slides.length - 1);
  } else {
    selectSlide(index);
  }
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

function duplicateSlide(index) {
  // ׳™׳¦׳™׳¨׳× ׳¢׳•׳×׳§ ׳¢׳׳•׳§ ׳©׳ ׳”׳©׳§׳£
  const newSlide = JSON.parse(JSON.stringify(slides[index]));
  
  // ׳”׳•׳¡׳₪׳× ׳”׳©׳§׳£ ׳”׳—׳“׳© ׳׳׳¢׳¨׳ ׳׳—׳¨׳™ ׳”׳©׳§׳£ ׳”׳׳§׳•׳¨׳™
  slides.splice(index + 1, 0, newSlide);
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  
  // ׳‘׳—׳™׳¨׳× ׳”׳©׳§׳£ ׳”׳—׳“׳©
  selectSlide(index + 1);
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

function moveSlide(index, direction) {
  // ׳—׳™׳©׳•׳‘ ׳”׳׳™׳ ׳“׳§׳¡ ׳”׳—׳“׳©
  const newIndex = index + direction;
  
  // ׳‘׳“׳™׳§׳” ׳©׳”׳׳™׳ ׳“׳§׳¡ ׳”׳—׳“׳© ׳‘׳˜׳•׳•׳— ׳×׳§׳™׳
  if (newIndex < 0 || newIndex >= slides.length) {
    return;
  }
  
  // ׳”׳—׳׳₪׳× ׳׳™׳§׳•׳ ׳”׳©׳§׳₪׳™׳
  const temp = slides[index];
  slides[index] = slides[newIndex];
  slides[newIndex] = temp;
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  
  // ׳‘׳—׳™׳¨׳× ׳”׳©׳§׳£ ׳©׳”׳•׳–׳–
  selectSlide(newIndex);
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

// ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳₪׳©׳¨׳•׳™׳•׳× ׳”׳©׳§׳£
function setupEventListeners() {
  // ׳׳™׳ ׳¦׳•׳¨׳ ׳‘׳׳׳–׳™׳ ׳™׳ ׳׳׳” ׳›׳™ ׳”׳ ׳׳•׳’׳“׳¨׳™׳ ׳™׳©׳™׳¨׳•׳× ׳‘-HTML
  // document.querySelector('.add-slide').addEventListener('click', addSlide);
  // document.querySelector('.transition-time-input').addEventListener('input', updateTransitionTime);
  // document.querySelector('.download-btn').addEventListener('click', downloadHTML);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳₪׳©׳¨׳•׳™׳•׳× ׳©׳§׳£
  // document.querySelectorAll('.slides-container').forEach(container => {
  //   container.addEventListener('click', function(e) {
  //     if (e.target.classList.contains('slide-config')) {
  //       const slideIndex = parseInt(e.target.dataset.index);
  //       selectSlide(slideIndex);
  //     } else if (e.target.classList.contains('delete-slide')) {
  //       const slideIndex = parseInt(e.target.dataset.index);
  //       deleteSlide(slideIndex);
  //     }
  //   });
  // });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳©׳™׳ ׳•׳™׳™ ׳”׳’׳“׳¨׳•׳× ׳©׳§׳£
  document.querySelector('.slide-text').addEventListener('input', function() {
    updateSlideText(currentSlide, this.value);
  });
  
  document.querySelector('.slide-image').addEventListener('input', function() {
    updateSlideImage(currentSlide, this.value);
  });
  
  document.querySelector('.slide-font').addEventListener('change', function() {
    updateSlideFont(currentSlide, this.value);
  });
  
  document.querySelector('.slide-font-size').addEventListener('input', function() {
    updateSlideFontSize(currentSlide, this.value);
  });
  
  document.querySelector('.slide-text-color').addEventListener('input', function() {
    updateSlideTextColor(currentSlide, this.value);
  });
  
  document.querySelector('.slide-has-bg').addEventListener('change', function() {
    updateSlideHasBg(currentSlide, this.checked);
    toggleBgOptions(currentSlide);
  });
  
  document.querySelector('.slide-bg-color').addEventListener('input', function() {
    updateSlideBgColor(currentSlide, this.value);
  });
  
  document.querySelector('.slide-bg-opacity').addEventListener('input', function() {
    updateSlideBgOpacity(currentSlide, this.value);
    document.querySelector('.opacity-value').textContent = Math.round(this.value * 100) + '%';
  });
  
  document.querySelector('.slide-position').addEventListener('change', function() {
    updateSlidePosition(currentSlide, this.value);
    togglePositionControls(currentSlide);
  });
  
  document.querySelector('.slide-pos-x').addEventListener('input', function() {
    updateSlidePositionX(currentSlide, this.value);
  });
  
  document.querySelector('.slide-pos-y').addEventListener('input', function() {
    updateSlidePositionY(currentSlide, this.value);
  });
  
  document.querySelector('.slide-animation').addEventListener('change', function() {
    updateSlideAnimation(currentSlide, this.value);
  });
  
  document.querySelector('.slide-image-animation').addEventListener('change', function() {
    updateSlideImageAnimation(currentSlide, this.value);
  });
  
  document.querySelector('.slide-text-animation').addEventListener('change', function() {
    updateSlideTextAnimation(currentSlide, this.value);
  });
}

// ׳‘׳—׳™׳¨׳× ׳©׳§׳£ ׳׳¢׳¨׳™׳›׳”
function selectSlide(index) {
  currentSlide = index;
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳© ׳¢׳ ׳¢׳¨׳›׳™ ׳”׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  const slide = slides[index];
  
  document.querySelector('.slide-text').value = slide.text || '';
  document.querySelector('.slide-image').value = slide.image || '';
  document.querySelector('.slide-font').value = slide.font || 'Arial';
  document.querySelector('.slide-font-size').value = slide.fontSize || 24;
  document.querySelector('.slide-text-color').value = slide.textColor || '#ffffff';
  document.querySelector('.slide-has-bg').checked = slide.hasBg || false;
  document.querySelector('.bg-options').style.display = slide.hasBg ? 'block' : 'none';
  document.querySelector('.slide-bg-color').value = slide.bgColor || '#000000';
  document.querySelector('.slide-bg-opacity').value = slide.bgOpacity !== undefined ? slide.bgOpacity : 0.5;
  document.querySelector('.opacity-value').textContent = Math.round((slide.bgOpacity !== undefined ? slide.bgOpacity : 0.5) * 100) + '%';
  document.querySelector('.slide-position').value = slide.customPos ? 'custom' : (slide.pos || 'center');
  document.querySelector('.custom-position').style.display = slide.customPos ? 'block' : 'none';
  document.querySelector('.slide-pos-x').value = slide.posX || 50;
  document.querySelector('.slide-pos-y').value = slide.posY || 50;
  document.querySelector('.slide-animation').value = slide.anim || 'fade';
  document.querySelector('.slide-image-animation').value = slide.imageAnim || 'none';
  document.querySelector('.slide-text-animation').value = slide.textAnimation || 'none';
  
  // ׳”׳“׳’׳©׳× ׳”׳©׳§׳£ ׳”׳ ׳‘׳—׳¨
  document.querySelectorAll('.slide-config').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.slide-config[data-index="${index}"]`).classList.add('active');
}

// ׳”׳•׳¡׳₪׳× ׳©׳§׳£ ׳—׳“׳©
function addSlide() {
  const newSlide = {
    text: '׳©׳§׳£ ׳—׳“׳©',
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
    font: 'Arial',
    fontSize: 30,
    textColor: '#ffffff',
    hasBg: true,
    bgColor: '#000000',
    bgOpacity: 0.5,
    pos: 'center',
    customPos: false,
    posX: 50,
    posY: 50,
    anim: 'fade',
    imageAnim: 'none',
    textAnimation: 'none'
  };
  
  slides.push(newSlide);
  renderSlides();
  selectSlide(slides.length - 1);
  generatePreview();
}

// ׳׳—׳™׳§׳× ׳©׳§׳£
function deleteSlide(index) {
  if (slides.length > 1) {
    slides.splice(index, 1);
    renderSlides();
    selectSlide(Math.min(index, slides.length - 1));
    generatePreview();
  } else {
    alert('׳׳ ׳ ׳™׳×׳ ׳׳׳—׳•׳§ ׳׳× ׳”׳©׳§׳£ ׳”׳׳—׳¨׳•׳');
  }
}

function toggleEditMode() {
  const previewFrame = document.getElementById('previewFrame');
  const editModeBtn = document.getElementById('editModeBtn');
  
  // ׳‘׳“׳™׳§׳” ׳׳ ׳›׳₪׳×׳•׳¨ ׳׳¦׳‘ ׳¢׳¨׳™׳›׳” ׳§׳™׳™׳
  if (!editModeBtn) return;
  
  // ׳”׳—׳׳₪׳× ׳׳¦׳‘ ׳”׳¢׳¨׳™׳›׳”
  const isEditMode = editModeBtn.classList.toggle('active');
  
  // ׳©׳׳™׳—׳× ׳”׳•׳“׳¢׳” ׳-iframe
  if (previewFrame && previewFrame.contentWindow) {
    previewFrame.contentWindow.postMessage({
      type: 'toggle-edit-mode',
      enabled: isEditMode
    }, '*');
  }
  
  // ׳¢׳“׳›׳•׳ ׳˜׳§׳¡׳˜ ׳”׳›׳₪׳×׳•׳¨
  editModeBtn.innerHTML = isEditMode ? 
    '<i class="fas fa-mouse-pointer"></i> ׳¡׳™׳•׳ ׳׳¦׳‘ ׳¢׳¨׳™׳›׳”' : 
    '<i class="fas fa-mouse-pointer"></i> ׳¢׳¨׳™׳›׳× ׳׳™׳§׳•׳';
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳’׳“׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳
function setupEventListeners() {
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳©׳™׳ ׳•׳™ ׳׳™׳§׳•׳ ׳˜׳§׳¡׳˜
  document.getElementById('slidePos').addEventListener('change', function() {
    const customPosGroups = document.querySelectorAll('.custom-pos-group');
    if (this.value === 'custom') {
      // ׳”׳¦׳’׳× ׳©׳“׳•׳× ׳׳™׳§׳•׳ ׳׳•׳×׳׳ ׳׳™׳©׳™׳×
      customPosGroups.forEach(group => group.style.display = 'block');
      updateSlideProperty('customPos', true);
    } else {
      // ׳”׳¡׳×׳¨׳× ׳©׳“׳•׳× ׳׳™׳§׳•׳ ׳׳•׳×׳׳ ׳׳™׳©׳™׳×
      customPosGroups.forEach(group => group.style.display = 'none');
      updateSlideProperty('customPos', false);
    }
  });
  
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳¢׳“׳›׳•׳ ׳׳™׳§׳•׳ ׳‘׳¢׳× ׳׳—׳™׳¦׳” ׳‘׳׳¦׳‘ ׳¢׳¨׳™׳›׳”
  document.getElementById('preview').addEventListener('click', function(e) {
    if (editMode) {
      const rect = this.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      
      // ׳¢׳“׳›׳•׳ ׳׳™׳§׳•׳ ׳”׳˜׳§׳¡׳˜
      updateSlideProperty('posX', x);
      updateSlideProperty('posY', y);
      
      // ׳¢׳“׳›׳•׳ ׳×׳¦׳•׳’׳× ׳”׳׳™׳§׳•׳
      document.getElementById('posX').textContent = x;
      document.getElementById('posY').textContent = y;
      
      // ׳¢׳“׳›׳•׳ ׳©׳“׳•׳× ׳”׳˜׳•׳₪׳¡
      document.getElementById('slidePosX').value = x;
      document.getElementById('slidePosY').value = y;
      
      // ׳¢׳“׳›׳•׳ ׳׳¦׳‘ ׳׳™׳§׳•׳ ׳׳•׳×׳׳ ׳׳™׳©׳™׳×
      document.getElementById('slidePos').value = 'custom';
      document.querySelectorAll('.custom-pos-group').forEach(group => group.style.display = 'block');
      updateSlideProperty('customPos', true);
    }
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳§׳© ׳׳ ׳˜׳¨ ׳‘׳©׳“׳•׳× ׳˜׳§׳¡׳˜
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.blur();
      }
    });
  });
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳¢׳“׳›׳•׳ ׳×׳›׳•׳ ׳” ׳©׳ ׳©׳§׳£
function updateSlideProperty(property, value) {
  // ׳¢׳“׳›׳•׳ ׳×׳›׳•׳ ׳× ׳”׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  slides[currentSlide][property] = value;
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
  
  // ׳¢׳“׳›׳•׳ ׳×׳¦׳•׳’׳× ׳”׳©׳§׳₪׳™׳ ׳‘׳¡׳¨׳’׳ ׳”׳¦׳“
  renderSlides();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳¢׳“׳›׳•׳ ׳˜׳•׳₪׳¡ ׳¢׳¨׳™׳›׳× ׳”׳©׳§׳£
function updateSlideForm() {
  const slide = slides[currentSlide];
  
  // ׳¢׳“׳›׳•׳ ׳©׳“׳•׳× ׳”׳˜׳§׳¡׳˜
  document.getElementById('slideText').value = slide.text;
  document.getElementById('slideImage').value = slide.image;
  
  // ׳¢׳“׳›׳•׳ ׳‘׳—׳™׳¨׳× ׳”׳’׳•׳₪׳
  document.getElementById('slideFont').value = slide.font;
  
  // ׳¢׳“׳›׳•׳ ׳’׳•׳“׳ ׳”׳’׳•׳₪׳
  document.getElementById('slideFontSize').value = slide.fontSize;
  document.getElementById('slideFontSizeValue').textContent = slide.fontSize + 'px';
  
  // ׳¢׳“׳›׳•׳ ׳¦׳‘׳¢ ׳”׳˜׳§׳¡׳˜
  document.getElementById('slideTextColor').value = slide.textColor;
  
  // ׳¢׳“׳›׳•׳ ׳¨׳§׳¢ ׳׳˜׳§׳¡׳˜
  document.getElementById('slideHasBg').checked = slide.hasBg;
  document.getElementById('slideBgColor').value = slide.bgColor;
  document.getElementById('slideBgOpacity').value = slide.bgOpacity;
  document.getElementById('slideBgOpacityValue').textContent = slide.bgOpacity;
  
  // ׳¢׳“׳›׳•׳ ׳׳₪׳©׳¨׳•׳™׳•׳× ׳”׳¨׳§׳¢
  toggleBgOptions();
  
  // ׳¢׳“׳›׳•׳ ׳׳™׳§׳•׳ ׳”׳˜׳§׳¡׳˜
  document.getElementById('slidePosition').value = slide.pos;
  document.getElementById('slideCustomPos').checked = slide.customPos;
  document.getElementById('slidePosX').value = slide.posX;
  document.getElementById('slidePosXValue').textContent = slide.posX + '%';
  document.getElementById('slidePosY').value = slide.posY;
  document.getElementById('slidePosYValue').textContent = slide.posY + '%';
  
  // ׳¢׳“׳›׳•׳ ׳׳₪׳©׳¨׳•׳™׳•׳× ׳”׳׳™׳§׳•׳
  togglePositionControls();
  
  // ׳¢׳“׳›׳•׳ ׳׳ ׳™׳׳¦׳™׳•׳×
  document.getElementById('slideAnimation').value = slide.anim;
  document.getElementById('slideImageAnimation').value = slide.imageAnim;
  document.getElementById('slideTextAnimation').value = slide.textAnimation;
  
  // ׳¢׳“׳›׳•׳ ׳–׳׳ ׳׳¢׳‘׳¨
  document.getElementById('transitionTime').value = transitionTime;
  document.getElementById('transitionTimeValue').textContent = transitionTime + ' ׳©׳ ׳™׳•׳×';
  
  // ׳”׳¦׳’׳× ׳׳¡׳₪׳¨ ׳”׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  document.getElementById('currentSlideNumber').textContent = `׳©׳§׳£ ${currentSlide + 1} ׳׳×׳•׳ ${slides.length}`;
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳—׳׳₪׳× ׳×׳¦׳•׳’׳× ׳׳₪׳©׳¨׳•׳™׳•׳× ׳׳™׳§׳•׳ ׳׳•׳×׳׳ ׳׳™׳©׳™׳×
function togglePositionControls() {
  const customPosChecked = document.getElementById('slideCustomPos').checked;
  const customPosControls = document.getElementById('customPositionControls');
  const positionSelect = document.getElementById('slidePosition');
  
  if (customPosChecked) {
    customPosControls.style.display = 'block';
    positionSelect.disabled = true;
  } else {
    customPosControls.style.display = 'none';
    positionSelect.disabled = false;
  }
  
  // ׳¢׳“׳›׳•׳ ׳¢׳¨׳›׳™ ׳”׳׳™׳§׳•׳ ׳‘׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  if (slides[currentSlide]) {
    slides[currentSlide].customPos = customPosChecked;
  }
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳—׳׳₪׳× ׳×׳¦׳•׳’׳× ׳׳₪׳©׳¨׳•׳™׳•׳× ׳¨׳§׳¢ ׳׳˜׳§׳¡׳˜
function toggleBgOptions() {
  const hasBgChecked = document.getElementById('slideHasBg').checked;
  const bgOptions = document.getElementById('bgOptions');
  
  if (hasBgChecked) {
    bgOptions.style.display = 'block';
  } else {
    bgOptions.style.display = 'none';
  }
  
  // ׳¢׳“׳›׳•׳ ׳¢׳¨׳ ׳”׳¨׳§׳¢ ׳‘׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  if (slides[currentSlide]) {
    slides[currentSlide].hasBg = hasBgChecked;
  }
}

let slides = [];
let currentSlide = 0;
let transitionTime = 3;
let editMode = false;
let audioSettings = {
  backgroundMusic: '',
  volume: 0.5,
  voiceOver: null
};
let slideshowTimer = null;

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳™׳¦׳™׳¨׳× ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
function generatePreview() {
  const preview = document.getElementById('preview');
  
  // ׳™׳¦׳™׳¨׳× HTML ׳׳›׳ ׳”׳©׳§׳₪׳™׳
  let previewHTML = '';
  
  slides.forEach((slide, index) => {
    // ׳™׳¦׳™׳¨׳× ׳׳—׳׳§׳•׳× CSS ׳׳׳ ׳™׳׳¦׳™׳•׳×
    let slideClasses = 'slide';
    if (index === currentSlide) {
      slideClasses += ' active';
    }
    
    // ׳”׳•׳¡׳₪׳× ׳׳—׳׳§׳•׳× ׳׳׳ ׳™׳׳¦׳™׳•׳×
    if (slide.anim !== 'none') {
      slideClasses += ` anim-${slide.anim}`;
    }
    
    // ׳™׳¦׳™׳¨׳× ׳¡׳’׳ ׳•׳ ׳׳×׳׳•׳ ׳× ׳”׳¨׳§׳¢
    const bgStyle = `background-image: url('${slide.image}');`;
    
    // ׳™׳¦׳™׳¨׳× ׳¡׳’׳ ׳•׳ ׳׳׳™׳§׳•׳ ׳”׳˜׳§׳¡׳˜
    let textStyle = '';
    if (slide.customPos) {
      textStyle = `left: ${slide.posX}%; top: ${slide.posY}%;`;
    } else {
      switch(slide.pos) {
        case 'center':
          textStyle = 'left: 50%; top: 50%; transform: translate(-50%, -50%);';
          break;
        case 'top':
          textStyle = 'left: 50%; top: 10%; transform: translateX(-50%);';
          break;
        case 'bottom':
          textStyle = 'left: 50%; bottom: 10%; transform: translateX(-50%);';
          break;
        case 'left':
          textStyle = 'left: 10%; top: 50%; transform: translateY(-50%);';
          break;
        case 'right':
          textStyle = 'right: 10%; top: 50%; transform: translateY(-50%);';
          break;
      }
    }
    
    // ׳”׳•׳¡׳₪׳× ׳¡׳’׳ ׳•׳ ׳׳˜׳§׳¡׳˜
    textStyle += `
      font-family: ${slide.font};
      font-size: ${slide.fontSize}px;
      color: ${slide.textColor};
    `;
    
    // ׳”׳•׳¡׳₪׳× ׳¨׳§׳¢ ׳׳˜׳§׳¡׳˜ ׳׳ ׳ ׳“׳¨׳©
    let bgTextStyle = '';
    if (slide.hasBg) {
      bgTextStyle = `
        background-color: ${slide.bgColor};
        opacity: ${slide.bgOpacity};
      `;
    }
    
    // ׳”׳•׳¡׳₪׳× ׳׳—׳׳§׳•׳× ׳׳׳ ׳™׳׳¦׳™׳™׳× ׳×׳׳•׳ ׳”
    let imageAnimClass = '';
    if (slide.imageAnim !== 'none') {
      imageAnimClass = `image-anim-${slide.imageAnim}`;
    }
    
    // ׳”׳•׳¡׳₪׳× ׳׳—׳׳§׳•׳× ׳׳׳ ׳™׳׳¦׳™׳™׳× ׳˜׳§׳¡׳˜
    let textAnimClass = '';
    if (slide.textAnimation !== 'none') {
      textAnimClass = `text-anim-${slide.textAnimation}`;
    }
    
    // ׳™׳¦׳™׳¨׳× HTML ׳׳©׳§׳£
    previewHTML += `
      <div class="${slideClasses}" data-index="${index}">
        <div class="slide-bg ${imageAnimClass}" style="${bgStyle}"></div>
        <div class="slide-text-container" style="${textStyle}">
          <div class="slide-text-bg" style="${bgTextStyle}"></div>
          <div class="slide-text ${textAnimClass}">${slide.text}</div>
        </div>
      </div>`;
  });
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  preview.innerHTML = previewHTML;
  
  // ׳¢׳“׳›׳•׳ ׳¡׳¨׳’׳ ׳”׳–׳׳
  updateTimeline();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳¢׳“׳›׳•׳ ׳”׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™ ׳‘׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
function updatePreviewSlide() {
  // ׳”׳¡׳¨׳× ׳”׳׳—׳׳§׳” 'active' ׳׳›׳ ׳”׳©׳§׳₪׳™׳
  document.querySelectorAll('.slide').forEach(slide => {
    slide.classList.remove('active');
  });
  
  // ׳”׳•׳¡׳₪׳× ׳”׳׳—׳׳§׳” 'active' ׳׳©׳§׳£ ׳”׳ ׳•׳›׳—׳™
  const currentSlideElement = document.querySelector(`.slide[data-index="${currentSlide}"]`);
  if (currentSlideElement) {
    currentSlideElement.classList.add('active');
  }
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳׳¢׳‘׳¨ ׳׳©׳§׳£ ׳”׳‘׳
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updatePreviewSlide();
  } else {
    // ׳—׳–׳¨׳” ׳׳©׳§׳£ ׳”׳¨׳׳©׳•׳ ׳׳ ׳”׳’׳¢׳ ׳• ׳׳¡׳•׳£
    currentSlide = 0;
    updatePreviewSlide();
  }
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳׳¢׳‘׳¨ ׳׳©׳§׳£ ׳”׳§׳•׳“׳
function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updatePreviewSlide();
  } else {
    // ׳׳¢׳‘׳¨ ׳׳©׳§׳£ ׳”׳׳—׳¨׳•׳ ׳׳ ׳׳ ׳—׳ ׳• ׳‘׳©׳§׳£ ׳”׳¨׳׳©׳•׳
    currentSlide = slides.length - 1;
    updatePreviewSlide();
  }
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳–׳–׳× ׳©׳§׳£ ׳׳׳¢׳׳” ׳׳• ׳׳׳˜׳”
function moveSlide(index, direction) {
  if (direction === -1 && index > 0) {
    // ׳”׳–׳–׳” ׳׳׳¢׳׳”
    const slide = slides.splice(index, 1)[0];
    slides.splice(index - 1, 0, slide);
  } else if (direction === 1 && index < slides.length - 1) {
    // ׳”׳–׳–׳” ׳׳׳˜׳”
    const slide = slides.splice(index, 1)[0];
    slides.splice(index + 1, 0, slide);
  }
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  
  // ׳¢׳“׳›׳•׳ ׳”׳©׳§׳£ ׳”׳ ׳‘׳—׳¨
  if (currentSlide === index) {
    currentSlide = direction === -1 ? index - 1 : index + 1;
  } else if (currentSlide === index - 1 && direction === -1) {
    currentSlide = index;
  } else if (currentSlide === index + 1 && direction === 1) {
    currentSlide = index;
  }
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳©׳›׳₪׳•׳ ׳©׳§׳£
function duplicateSlide(index) {
  // ׳™׳¦׳™׳¨׳× ׳¢׳•׳×׳§ ׳¢׳׳•׳§ ׳©׳ ׳”׳©׳§׳£
  const newSlide = JSON.parse(JSON.stringify(slides[index]));
  
  // ׳”׳•׳¡׳₪׳× ׳”׳©׳§׳£ ׳”׳—׳“׳© ׳׳׳¢׳¨׳ ׳׳—׳¨׳™ ׳”׳©׳§׳£ ׳”׳׳§׳•׳¨׳™
  slides.splice(index + 1, 0, newSlide);
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  
  // ׳‘׳—׳™׳¨׳× ׳”׳©׳§׳£ ׳”׳—׳“׳©
  selectSlide(index + 1);
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳׳—׳™׳§׳× ׳©׳§׳£
function removeSlide(index) {
  // ׳‘׳“׳™׳§׳” ׳©׳™׳© ׳™׳•׳×׳¨ ׳׳©׳§׳£ ׳׳—׳“
  if (slides.length <= 1) {
    alert('׳׳ ׳ ׳™׳×׳ ׳׳׳—׳•׳§ ׳׳× ׳”׳©׳§׳£ ׳”׳׳—׳¨׳•׳');
    return;
  }
  
  // ׳׳—׳™׳§׳× ׳”׳©׳§׳£
  slides.splice(index, 1);
  
  // ׳¢׳“׳›׳•׳ ׳”׳©׳§׳£ ׳”׳ ׳‘׳—׳¨
  if (currentSlide >= slides.length) {
    currentSlide = slides.length - 1;
  }
  
  // ׳¢׳“׳›׳•׳ ׳׳׳©׳§ ׳”׳׳©׳×׳׳©
  renderSlides();
  selectSlide(currentSlide);
  
  // ׳¢׳“׳›׳•׳ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  generatePreview();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳™׳™׳¦׳•׳ ׳”׳¡׳¨׳˜׳•׳
function exportVideo() {
  alert('׳₪׳•׳ ׳§׳¦׳™׳™׳× ׳”׳™׳™׳¦׳•׳ ׳¢׳“׳™׳™׳ ׳‘׳₪׳™׳×׳•׳—');
  // ׳›׳׳ ׳™׳”׳™׳” ׳§׳•׳“ ׳׳™׳™׳¦׳•׳ ׳”׳¡׳¨׳˜׳•׳ ׳‘׳”׳׳©׳
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳¢׳“׳›׳•׳ ׳–׳׳ ׳”׳׳¢׳‘׳¨
function updateTransitionTime(value) {
  transitionTime = parseInt(value);
  updateTimeline();
}

// ׳׳×׳—׳•׳ ׳”׳׳₪׳׳™׳§׳¦׳™׳” ׳‘׳˜׳¢׳™׳ ׳× ׳”׳¢׳׳•׳“
window.onload = init;

// ׳§׳¨׳™׳׳” ׳׳₪׳•׳ ׳§׳¦׳™׳™׳× ׳”׳’׳“׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳
setupEventListeners();

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳¢׳“׳›׳•׳ ׳×׳›׳•׳ ׳” ׳©׳ ׳©׳§׳£
function updateSlideProperty(property, value) {
  if (slides[currentSlide]) {
    slides[currentSlide][property] = value;
    generatePreview();
  }
}

// ׳₪׳•׳ ׳§׳¦׳™׳•׳× ׳¢׳“׳›׳•׳ ׳׳×׳›׳•׳ ׳•׳× ׳”׳©׳§׳£
function updateSlideText(value) {
  updateSlideProperty('text', value);
}

function updateSlideImage(value) {
  updateSlideProperty('image', value);
}

function updateSlideFont(value) {
  updateSlideProperty('font', value);
}

function updateSlideFontSize(value) {
  updateSlideProperty('fontSize', parseInt(value));
  document.getElementById('slideFontSizeValue').textContent = value + 'px';
}

function updateSlideTextColor(value) {
  updateSlideProperty('textColor', value);
}

function updateSlideHasBg(value) {
  updateSlideProperty('hasBg', value);
  toggleBgOptions();
}

function updateSlideBgColor(value) {
  updateSlideProperty('bgColor', value);
}

function updateSlideBgOpacity(value) {
  updateSlideProperty('bgOpacity', parseFloat(value));
  document.getElementById('slideBgOpacityValue').textContent = value;
}

function updateSlidePosition(value) {
  updateSlideProperty('pos', value);
}

function updateSlideCustomPos(value) {
  updateSlideProperty('customPos', value);
  togglePositionControls();
}

function updateSlidePositionX(value) {
  updateSlideProperty('posX', parseInt(value));
  document.getElementById('slidePosXValue').textContent = value + '%';
}

function updateSlidePositionY(value) {
  updateSlideProperty('posY', parseInt(value));
  document.getElementById('slidePosYValue').textContent = value + '%';
}

function updateSlideAnimation(value) {
  updateSlideProperty('anim', value);
}

function updateSlideImageAnimation(value) {
  updateSlideProperty('imageAnim', value);
}

function updateSlideTextAnimation(value) {
  updateSlideProperty('textAnimation', value);
}

function updateTransitionTime(value) {
  transitionTime = parseInt(value);
  document.getElementById('transitionTimeValue').textContent = value + ' ׳©׳ ׳™׳•׳×';
  
  // ׳¢׳“׳›׳•׳ ׳–׳׳ ׳”׳׳¢׳‘׳¨ ׳‘׳›׳ ׳”׳©׳§׳₪׳™׳
  document.querySelectorAll('.slide-duration').forEach(el => {
    el.textContent = `${transitionTime} ׳©׳ ׳™׳•׳×`;
  });
  
  // ׳¢׳“׳›׳•׳ ׳¡׳¨׳’׳ ׳”׳–׳׳
  updateTimeline();
}

// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳’׳“׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳
function setupEventListeners() {
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳ ׳™׳•׳•׳˜
  document.getElementById('prevSlideBtn').addEventListener('click', prevSlide);
  document.getElementById('nextSlideBtn').addEventListener('click', nextSlide);
  
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨ ׳”׳•׳¡׳₪׳× ׳©׳§׳£
  document.getElementById('addSlideBtn').addEventListener('click', addSlide);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  document.getElementById('togglePreviewBtn').addEventListener('click', togglePreviewMode);
  document.getElementById('playPauseBtn').addEventListener('click', togglePlayback);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳¡׳¨׳’׳ ׳”׳–׳׳
  document.getElementById('timelineSlider').addEventListener('input', function() {
    seekToPosition(this.value);
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳©׳“׳•׳× ׳”׳˜׳•׳₪׳¡
  document.getElementById('slideText').addEventListener('input', function() {
    updateSlideText(this.value);
  });
  
  document.getElementById('slideImage').addEventListener('input', function() {
    updateSlideImage(this.value);
  });
  
  document.getElementById('slideFont').addEventListener('change', function() {
    updateSlideFont(this.value);
  });
  
  document.getElementById('slideFontSize').addEventListener('input', function() {
    updateSlideFontSize(this.value);
  });
  
  document.getElementById('slideTextColor').addEventListener('input', function() {
    updateSlideTextColor(this.value);
  });
  
  document.getElementById('slideHasBg').addEventListener('change', function() {
    updateSlideHasBg(this.checked);
  });
  
  document.getElementById('slideBgColor').addEventListener('input', function() {
    updateSlideBgColor(this.value);
  });
  
  document.getElementById('slideBgOpacity').addEventListener('input', function() {
    updateSlideBgOpacity(this.value);
  });
  
  document.getElementById('slidePosition').addEventListener('change', function() {
    updateSlidePosition(this.value);
  });
  
  document.getElementById('slideCustomPos').addEventListener('change', function() {
    updateSlideCustomPos(this.checked);
  });
  
  document.getElementById('slidePosX').addEventListener('input', function() {
    updateSlidePositionX(this.value);
  });
  
  document.getElementById('slidePosY').addEventListener('input', function() {
    updateSlidePositionY(this.value);
  });
  
  document.getElementById('slideAnimation').addEventListener('change', function() {
    updateSlideAnimation(this.value);
  });
  
  document.getElementById('slideImageAnimation').addEventListener('change', function() {
    updateSlideImageAnimation(this.value);
  });
  
  document.getElementById('slideTextAnimation').addEventListener('change', function() {
    updateSlideTextAnimation(this.value);
  });
  
  document.getElementById('transitionTime').addEventListener('input', function() {
    updateTransitionTime(this.value);
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳׳•׳“׳™׳•
  document.getElementById('backgroundMusicInput').addEventListener('input', function() {
    updateBackgroundMusic(this.value);
  });
  
  document.getElementById('volumeSlider').addEventListener('input', function() {
    updateAudioVolume(this.value);
  });
  
  document.getElementById('recordVoiceBtn').addEventListener('click', toggleVoiceRecording);
  
  document.getElementById('voiceUpload').addEventListener('change', function() {
    handleVoiceUpload(this.files);
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳™׳™׳¦׳•׳
  document.getElementById('exportBtn').addEventListener('click', exportVideo);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳×׳‘׳ ׳™׳•׳×
  document.querySelectorAll('.template-item').forEach(template => {
    template.addEventListener('click', function() {
      loadTemplate(this.dataset.template);
    });
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳§׳©׳™ ׳׳§׳׳“׳×
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
}

```
```javascript
// ׳₪׳•׳ ׳§׳¦׳™׳” ׳׳”׳’׳“׳¨׳× ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳
function setupEventListeners() {
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳ ׳™׳•׳•׳˜
  document.getElementById('prevSlideBtn').addEventListener('click', prevSlide);
  document.getElementById('nextSlideBtn').addEventListener('click', nextSlide);
  
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨ ׳”׳•׳¡׳₪׳× ׳©׳§׳£
  document.getElementById('addSlideBtn').addEventListener('click', addSlide);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳×׳¦׳•׳’׳” ׳”׳׳§׳“׳™׳׳”
  document.getElementById('togglePreviewBtn').addEventListener('click', togglePreviewMode);
  document.getElementById('playPauseBtn').addEventListener('click', togglePlayback);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳¡׳¨׳’׳ ׳”׳–׳׳
  document.getElementById('timelineSlider').addEventListener('input', function() {
    seekToPosition(this.value);
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳©׳“׳•׳× ׳”׳˜׳•׳₪׳¡
  document.getElementById('slideText').addEventListener('input', function() {
    updateSlideText(this.value);
  });
  
  document.getElementById('slideImage').addEventListener('input', function() {
    updateSlideImage(this.value);
  });
  
  document.getElementById('slideFont').addEventListener('change', function() {
    updateSlideFont(this.value);
  });
  
  document.getElementById('slideFontSize').addEventListener('input', function() {
    updateSlideFontSize(this.value);
    document.getElementById('fontSizeValue').textContent = this.value + 'px';
  });
  
  document.getElementById('slideTextColor').addEventListener('input', function() {
    updateSlideTextColor(this.value);
  });
  
  document.getElementById('slideHasBg').addEventListener('change', function() {
    updateSlideHasBg(this.checked);
  });
  
  document.getElementById('slideBgColor').addEventListener('input', function() {
    updateSlideBgColor(this.value);
  });
  
  document.getElementById('slideBgOpacity').addEventListener('input', function() {
    updateSlideBgOpacity(this.value);
    document.getElementById('bgOpacityValue').textContent = Math.round(this.value * 100) + '%';
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳׳™׳§׳•׳
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      updateSlidePosition(this.dataset.pos);
    });
  });
  
  document.getElementById('slideCustomPos').addEventListener('change', function() {
    updateSlideCustomPos(this.checked);
  });
  
  document.getElementById('slidePosX').addEventListener('input', function() {
    updateSlidePositionX(this.value);
    document.getElementById('posXValue').textContent = this.value + '%';
  });
  
  document.getElementById('slidePosY').addEventListener('input', function() {
    updateSlidePositionY(this.value);
    document.getElementById('posYValue').textContent = this.value + '%';
  });
  
  document.getElementById('slideAnim').addEventListener('change', function() {
    updateSlideAnimation(this.value);
  });
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳׳•׳“׳™׳•
  document.getElementById('bgMusic').addEventListener('change', function() {
    updateBackgroundMusic(this.value);
  });
  
  document.getElementById('bgMusicVolume').addEventListener('input', function() {
    updateAudioVolume(this.value);
    document.getElementById('bgMusicVolumeValue').textContent = Math.round(this.value * 100) + '%';
  });
  
  document.getElementById('recordVoiceBtn').addEventListener('click', toggleVoiceRecording);
  
  document.getElementById('voiceUpload').addEventListener('change', function() {
    handleVoiceUpload(this.files);
  });
  
  document.getElementById('clearVoiceBtn').addEventListener('click', clearVoiceOver);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳›׳₪׳×׳•׳¨׳™ ׳”׳™׳™׳¦׳•׳
  document.getElementById('exportBtn').addEventListener('click', exportVideo);
  
  // ׳׳׳–׳™׳ ׳™ ׳׳™׳¨׳•׳¢׳™׳ ׳׳×׳‘׳ ׳™׳•׳×
  document.querySelectorAll('[data-template]').forEach(template => {
    template.addEventListener('click', function() {
      loadTemplate(this.dataset.template);
    });
  });
  
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳§׳©׳™ ׳׳§׳׳“׳×
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });
  
  // ׳׳׳–׳™׳ ׳׳™׳¨׳•׳¢׳™׳ ׳׳׳¦׳‘ ׳¢׳¨׳™׳›׳”
  document.getElementById('toggleEditModeBtn').addEventListener('click', toggleEditMode);
}
