// --- ELITE ALGORITHM: Flesch-Kincaid Readability ---

function analyzeEssay() {
    let text = document.getElementById('text-input').value.trim();
    
    if (!text) {
        resetStats();
        return;
    }

    // 1. Count Words
    let words = text.split(/\s+/).filter(word => word.length > 0);
    let wordCount = words.length;

    // 2. Count Sentences (split by ., !, ?)
    let sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    let sentenceCount = sentences.length || 1; // avoid divide by zero

    // 3. Count Syllables (Complex Regex Approximation)
    let syllableCount = 0;
    words.forEach(word => {
        syllableCount += countSyllables(word);
    });

    // 4. Calculate Flesch-Kincaid Grade Level
    // Formula: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    let gradeLevel = (0.39 * (wordCount / sentenceCount)) + (11.8 * (syllableCount / wordCount)) - 15.59;
    
    // Cap it between 0 and 20 for realistic display
    gradeLevel = Math.max(0, Math.min(20, Math.round(gradeLevel * 10) / 10));

    // Update UI
    document.getElementById('word-count').innerText = wordCount;
    document.getElementById('sentence-count').innerText = sentenceCount;
    document.getElementById('grade-level').innerText = gradeLevel;

    // Provide Feedback
    let feedback = document.getElementById('feedback-msg');
    if (gradeLevel < 6) {
        feedback.innerText = "Very easy to read. (Middle School Level)";
        feedback.style.color = "#27ae60";
    } else if (gradeLevel >= 6 && gradeLevel <= 10) {
        feedback.innerText = "Good readability. (High School Level)";
        feedback.style.color = "#f39c12";
    } else if (gradeLevel > 10 && gradeLevel <= 16) {
        feedback.innerText = "Complex writing. (College Level)";
        feedback.style.color = "#8b0000";
    } else {
        feedback.innerText = "Very complex! Consider breaking up long sentences.";
        feedback.style.color = "#c0392b";
    }
}

// Helper function to count syllables in a word
function countSyllables(word) {
    word = word.toLowerCase();
    if(word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    let syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
}

// --- FORMAT FIXER ---
function cleanFormatting() {
    let text = document.getElementById('text-input').value;
    if (!text) return;

    // 1. Remove double spaces
    text = text.replace(/ +/g, ' ');
    // 2. Fix spaces before punctuation (e.g. "word ." becomes "word.")
    text = text.replace(/ \./g, '.').replace(/ \,/g, ',').replace(/ \!/g, '!').replace(/ \?/g, '?');
    // 3. Remove weird PDF line breaks but keep actual paragraphs
    text = text.replace(/([^\n])\n([^\n])/g, '$1 $2');
    
    document.getElementById('text-input').value = text;
    analyzeEssay(); // Re-run analysis
    
    document.getElementById('feedback-msg').innerText = "Formatting Cleaned! ✨";
    document.getElementById('feedback-msg').style.color = "#27ae60";
}

function copyText() {
    let text = document.getElementById('text-input').value;
    navigator.clipboard.writeText(text).then(() => {
        document.getElementById('feedback-msg').innerText = "Copied to Clipboard! 📋";
        document.getElementById('feedback-msg').style.color = "#2980b9";
    });
}

function resetStats() {
    document.getElementById('word-count').innerText = "0";
    document.getElementById('sentence-count').innerText = "0";
    document.getElementById('grade-level').innerText = "0";
    document.getElementById('feedback-msg').innerText = "Paste text to see your score.";
    document.getElementById('feedback-msg').style.color = "#d35400";
}
