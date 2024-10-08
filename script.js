let playersArray = [];
let currentIndex = 0;

document.getElementById('startBtn').addEventListener('click', function() {
    const numPlayers = parseInt(document.getElementById('input1').value);
    const numImposters = parseInt(document.getElementById('input2').value);

    if (isNaN(numPlayers) || isNaN(numImposters) || numPlayers <= 0 || numImposters <= 0 || numImposters > numPlayers) {
        document.getElementById('outputText').innerText = "Please enter valid numbers for Players and Imposters!";
        return;
    }

    const randomImposterPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    playersArray = [];
    for (let i = 0; i < numImposters; i++) {
        playersArray.push(randomImposterPair[0]);
    }
    for (let i = numImposters; i < numPlayers; i++) {
        playersArray.push(randomImposterPair[1]);
    }
    playersArray = shuffleArray(playersArray);
    currentIndex = 0;
    displayNextPlayer();
});

document.getElementById('nextBtn').addEventListener('click', function() {
    displayNextPlayer();
});

function displayNextPlayer() {
    if (currentIndex < playersArray.length) {
        document.getElementById('outputText').innerText = `Player ${currentIndex + 1}: ${playersArray[currentIndex]}`;
        currentIndex++;
    } else {
        document.getElementById('outputText').innerText = "All players have been shown!";
    }
}

function spreadArray(length) {
    const firstArray = Array.from({ length }, (_, i) => i);
    const shiftedIndices = new Array(length).fill(null);
    firstArray.forEach(value => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * length);
        } while (shiftedIndices[randomIndex] !== null); 
        shiftedIndices[randomIndex] = value; 
    });

    for (let i = 0; i < length; i++) {
        if (shiftedIndices[i] === null) {
            shiftedIndices[i] = -1;
        }
    }

    return { shiftedIndices };
}

function shuffleArray(words) {
    const totalLength = words.length;
    const { shiftedIndices } = spreadArray(totalLength);
    const shuffledWords = shiftedIndices.map(index => words[index]);
    const result = shuffleArrayAlgo(shuffledWords)

    return result;
}

function shuffleArrayAlgo(arr) {
    const temp = arr
    for (let i = temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp
}