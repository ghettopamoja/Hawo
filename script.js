document.addEventListener('DOMContentLoaded', function(){
    const welcomeDiv = document.querySelector('.welcome-div');
    const lyricsDiv = document.querySelector('.lyrics-div');
    const startBtn = document.querySelector('.welcome-div .start-button span');
    const playBtn = document.querySelector('.lyrics-div .start-button span');
    const outLayer = document.querySelector('.outer-layer');
    const progressBar = document.querySelector('.lyrics-div .progress-bar')
    const audio = new Audio("audio.mp3");

    let isPlaying =false;
    let currentLyricsIndex = 0;

    const lyrics = [
        { text: "You see People think wishes are just ideas", start: 0, end: 5 },
        { text: "No no no they are part of your heart, the very best Part", start: 6, end: 15 },
        { text: "If happiness was a tangible thing, it would be you", start: 16, end: 22 },
        { text: "If you'd told me the feeling you'd bring, I'd think it untrue", start: 23, end: 28 },
        { text: "And people search for a wonder like you all of their lives", start: 29, end: 35 },
        { text: "You still amaze me after all this time", start: 36, end: 42 },
        { text: "You pull me in like some kind of wind", start: 43, end: 47 },
        { text: "Mesmerized by the hold I'm in", start: 48, end: 51 },
        { text: "Leave you here, I don't wanna", start: 52, end: 53 },
        { text: "I wanna", start: 54, end: 56 },
        { text: "Promise, as one does", start: 57, end: 61 },
        { text: "I, I will protect you at all costs", start: 62, end: 68 },
        { text: "Keep you safe here in my arms", start: 69, end: 75 },
        { text: "I, I will protect you at all costs", start: 76, end: 82 },
        { text: "At all costs", start: 83, end: 87 },
        { text: "What's pain when I look at you", start: 88, end: 90 },
        { text: "No way I could explain you", start: 91, end: 94 },
        { text: "Even if I tried to", start: 95, end: 96 },
        { text: "I'll never dream like I used to do", start: 97, end: 100 },
        { text: "If someone tried to hurt you", start: 101, end: 102 },
        { text: "I don't see how that could happen", start: 103, end: 104 },
        { text: "I'd fight for you in ways you can't imagine", start: 105, end: 107 },
        { text: "Felt this? No, I haven't", start: 108, end: 110 },
        { text: "I hope it would be alright to", start: 111, end: 112 },
        { text: "Stay right here beside you", start: 112, end: 114 },
        { text: "And promise, as one does", start: 115, end: 118 },
        { text: "I, I will protect you at all costs", start: 119, end: 125 },
        { text: "Keep you safe here in my arms", start: 126, end: 132 },
        { text: "I, I will protect you at all costs", start: 133, end: 140 },
        { text: "At all costs", start: 141, end: 142 },
        { text: "If you're ever feeling like you're lost, I'll come find you", start: 143, end: 147 },
        { text: "Man all fronts", start: 148, end: 149 },
        { text: "There's no ocean I won't swim across to be right by you", start: 150, end: 153 },
        { text: "And not just once", start: 154, end: 155 },
        { text: "Here and now, I swear on my response", start: 156, end: 159 },
        { text: "I'll remind you", start: 160, end: 161 },
        { text: "And promise, as one does", start: 162, end: 166 },
        { text: "I, I will protect you at all costs", start: 167, end: 173 },
        { text: "Keep you safe here in my arms", start: 174, end: 179 },
        { text: "I, I will protect you at all costs", start: 180, end: 187 },
        { text: "At all costs", start: 188, end: 190 },
        { text: "Glad you enjoyed it!", start: 191, end: 210 },
    ];

    startBtn.onclick = function () {
        showLyricsDiv(true);
        audio.play();
        showLyrics();
        playBtn.innerHTML = "&#10074;&#10074;";
        isPlaying = true;
    }

    function showLyricsDiv(state) {
        welcomeDiv.style.display = state ? "none" : "flex";
        lyricsDiv.style.display = state ? "flex" : "none";
    }

    playBtn.onclick = function () {
        isPlaying = !isPlaying;

        if(isPlaying) {
            audio.play();
            playBtn.innerHTML = "&#10074;&#10074;";
        }
        else{
            audio.pause();
            playBtn.innerHTML = "&#9654;";
        }
        
    }

    audio.onended = () => {
        playBtn.innerHTML = "&#9654;"; // Play symbol
        
        const bubble = outLayer.querySelector('.bubble');
    
        if (bubble) {
            bubble.remove(); // Remove the bubble at the end of the song
        }
    
        progressBar.style.width = `0%`; // Reset progress bar
        currentLyricsIndex = 0;

        showLyricsDiv(false);
        isPlaying = false;
    }
    

    function showLyrics() {
        const bubble = outLayer.querySelector('.bubble');
        const bubbles = document.createElement('div');

        if(!bubble) {
           
            bubbles.classList.add('bubble');
            outLayer.appendChild(bubbles);
        }
        
    
        audio.ontimeupdate = function () {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${percent}%`;
            if (currentLyricsIndex < lyrics.length) {
                const currentLyrics = lyrics[currentLyricsIndex];
    
                if (audio.currentTime >= currentLyrics.start && audio.currentTime < currentLyrics.end) {
                    // Update the bubble text
                    bubbles.innerHTML = `<p>${currentLyrics.text}</p>`;

                   
                }
    
                if (audio.currentTime > currentLyrics.end) {
                    bubbles.style.animation = `fadeup 3s ease-out forwards, move 3s ease-out forwards`;
                    currentLyricsIndex++;
                    // Move to the next lyrics line
                    const outLayerRect = outLayer.getBoundingClientRect();
                    const bubbleSize = 100; // Assuming a fixed size for the bubble
    
                    const margin = 50; // The minimum margin from the edges
                    const randomLeft = Math.random() * (outLayerRect.width - bubbleSize - 2 * margin) + margin;
                    const randomTop = Math.random() * (outLayerRect.height - bubbleSize - 2 * margin) + margin;


    
                    bubbles.style.position = 'absolute';
                    bubbles.style.left = `${randomLeft}px`;
                    bubbles.style.top = `${randomTop}px`;
                    // Apply fadeup animation
                     // Add animation directly via CSS
                    bubbles.style.animation = `fadeup 3s ease-out forwards, move 3s ease-out forwards`;

                    
                }
            }
        };
    }
    
})
