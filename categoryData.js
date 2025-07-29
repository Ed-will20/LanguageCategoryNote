// Category classification system
const categoryKeywords = {
    food: [
        'eat', 'drink', 'meal', 'food', 'fruit', 'vegetable', 'meat', 'fish', 'rice', 'bread',
        'sweet', 'sour', 'spicy', 'hot', 'cold', 'restaurant', 'kitchen', 'cook', 'egg', 'milk',
        'water', 'tea', 'coffee', 'soup', 'noodle', 'cake', 'pizza', 'chicken', 'beef', 'pork',
        'apple', 'banana', 'orange', 'carrot', 'onion', 'tomato', 'potato', 'salt', 'sugar',
        'oil', 'butter', 'cheese', 'yogurt', 'juice', 'beer', 'wine', 'sake', 'miso', 'ramen',
        'sushi', 'tempura', 'tofu', 'seaweed'
    ],
    
    animals: [
        'dog', 'cat', 'bird', 'fish', 'animal', 'pet', 'wild', 'zoo', 'farm', 'horse', 'cow',
        'pig', 'chicken', 'duck', 'rabbit', 'mouse', 'lion', 'tiger', 'elephant', 'monkey',
        'bear', 'deer', 'wolf', 'fox', 'snake', 'frog', 'turtle', 'butterfly', 'bee', 'ant',
        'spider', 'whale', 'dolphin', 'shark', 'octopus', 'crab', 'shrimp', 'insect', 'mammal'
    ],
    
    colors: [
        'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white',
        'gray', 'grey', 'color', 'bright', 'dark', 'light', 'rainbow', 'gold', 'silver'
    ],
    
    family: [
        'mother', 'father', 'parent', 'sister', 'brother', 'child', 'baby', 'family',
        'grandmother', 'grandfather', 'aunt', 'uncle', 'cousin', 'son', 'daughter', 'wife',
        'husband', 'friend', 'relative', 'sibling'
    ],
    
    body: [
        'head', 'hair', 'eye', 'nose', 'mouth', 'ear', 'face', 'neck', 'shoulder', 'arm',
        'hand', 'finger', 'leg', 'foot', 'knee', 'back', 'chest', 'stomach', 'heart', 'body',
        'skin', 'tooth', 'teeth', 'tongue', 'throat', 'brain', 'blood', 'bone', 'muscle'
    ],
    
    clothing: [
        'shirt', 'pants', 'dress', 'skirt', 'shoe', 'sock', 'hat', 'coat', 'jacket', 'sweater',
        'clothes', 'clothing', 'wear', 'tie', 'belt', 'glove', 'scarf', 'underwear', 'pajama',
        'uniform', 'suit', 'jeans', 't-shirt', 'hoodie', 'shorts', 'sandal', 'boot', 'sneaker'
    ],
    
    weather: [
        'weather', 'rain', 'sun', 'cloud', 'snow', 'wind', 'storm', 'hot', 'cold', 'warm',
        'cool', 'humid', 'dry', 'sunny', 'cloudy', 'rainy', 'snowy', 'windy', 'temperature',
        'season', 'spring', 'summer', 'autumn', 'winter', 'fall', 'hurricane', 'typhoon',
        'lightning', 'thunder', 'fog', 'mist'
    ],
    
    transportation: [
        'car', 'bus', 'train', 'plane', 'bicycle', 'motorcycle', 'ship', 'boat', 'taxi',
        'subway', 'truck', 'van', 'helicopter', 'airport', 'station', 'road', 'street',
        'highway', 'bridge', 'traffic', 'drive', 'ride', 'walk', 'run', 'travel', 'trip',
        'journey', 'ticket', 'fare'
    ],
    
    time: [
        'time', 'hour', 'minute', 'second', 'day', 'week', 'month', 'year', 'today',
        'yesterday', 'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'midnight',
        'noon', 'clock', 'watch', 'calendar', 'schedule', 'early', 'late', 'now', 'then',
        'when', 'always', 'never', 'sometimes', 'often'
    ],
    
    emotions: [
        'happy', 'sad', 'angry', 'excited', 'worried', 'scared', 'surprised', 'tired',
        'bored', 'confused', 'proud', 'embarrassed', 'jealous', 'lonely', 'nervous', 'calm',
        'relaxed', 'stressed', 'disappointed', 'grateful', 'love', 'hate', 'like', 'dislike',
        'feel', 'emotion', 'mood', 'cry', 'laugh', 'smile'
    ],
    
    school: [
        'school', 'student', 'teacher', 'class', 'lesson', 'homework', 'test', 'exam', 'study',
        'learn', 'book', 'pen', 'pencil', 'paper', 'notebook', 'desk', 'chair', 'blackboard',
        'whiteboard', 'library', 'classroom', 'university', 'college', 'grade', 'subject',
        'math', 'science', 'history', 'english', 'art', 'music', 'sports', 'education'
    ],
    
    technology: [
        'computer', 'phone', 'internet', 'email', 'website', 'software', 'app', 'game',
        'video', 'music', 'camera', 'television', 'radio', 'technology', 'digital', 'online',
        'offline', 'password', 'username', 'download', 'upload', 'social', 'media', 'blog',
        'chat', 'message', 'call', 'text'
    ],
    
    work: [
        'work', 'job', 'office', 'company', 'business', 'employee', 'boss', 'manager',
        'salary', 'money', 'career', 'profession', 'meeting', 'project', 'deadline',
        'interview', 'resume', 'application', 'skill', 'experience', 'training', 'promotion',
        'retirement', 'vacation', 'holiday'
    ],
    
    health: [
        'health', 'doctor', 'hospital', 'medicine', 'pill', 'sick', 'illness', 'disease',
        'pain', 'hurt', 'injury', 'broken', 'fever', 'cold', 'cough', 'headache',
        'stomachache', 'toothache', 'allergy', 'virus', 'bacteria', 'vaccine', 'treatment',
        'surgery', 'nurse', 'patient', 'healthy', 'exercise', 'diet', 'nutrition'
    ],
    
    sports: [
        'sport', 'game', 'play', 'team', 'player', 'coach', 'ball', 'soccer', 'football',
        'basketball', 'baseball', 'tennis', 'golf', 'swimming', 'running', 'cycling',
        'skiing', 'skating', 'boxing', 'martial', 'arts', 'gym', 'fitness', 'exercise',
        'match', 'competition', 'tournament', 'win', 'lose', 'score', 'goal', 'point'
    ],
    
    house: [
        'house', 'home', 'room', 'bedroom', 'bathroom', 'kitchen', 'living', 'dining',
        'garage', 'garden', 'yard', 'door', 'window', 'roof', 'wall', 'floor', 'ceiling',
        'stairs', 'furniture', 'bed', 'table', 'chair', 'sofa', 'television', 'refrigerator',
        'stove', 'oven', 'microwave', 'washing', 'machine', 'dryer', 'shower', 'bath',
        'toilet', 'sink', 'mirror', 'lamp', 'light', 'apartment', 'rent', 'buy', 'sell',
        'move', 'clean', 'dirty'
    ],
    
    nature: [
        'nature', 'tree', 'flower', 'grass', 'leaf', 'branch', 'root', 'forest', 'mountain',
        'hill', 'river', 'lake', 'ocean', 'sea', 'beach', 'island', 'desert', 'jungle',
        'park', 'garden', 'field', 'farm', 'stone', 'rock', 'sand', 'soil', 'earth', 'sky',
        'star', 'moon', 'planet', 'environment', 'pollution', 'clean', 'fresh', 'air',
        'water', 'fire', 'wood', 'metal', 'plastic'
    ]
};

// Category emoji mapping
const categoryEmojis = {
    food: '🍽️',
    animals: '🐾',
    colors: '🎨',
    family: '👨‍👩‍👧‍👦',
    body: '👤',
    clothing: '👕',
    weather: '🌤️',
    transportation: '🚗',
    time: '⏰',
    emotions: '😊',
    school: '📚',
    technology: '💻',
    work: '💼',
    health: '🏥',
    sports: '⚽',
    house: '🏠',
    nature: '🌿',
    other: '📝'
};

// Enhanced categorization with ML-like approach
function categorizeWord(englishMeaning) {
    const meaning = englishMeaning.toLowerCase();
    const categoryScores = {};
    
    // Calculate relevance score for each category
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        categoryScores[category] = 0;
        
        for (const keyword of keywords) {
            if (meaning.includes(keyword)) {
                // Exact match gets higher score
                if (meaning === keyword) {
                    categoryScores[category] += 10;
                }
                // Word boundary match gets medium score
                else if (new RegExp(`\\b${keyword}\\b`).test(meaning)) {
                    categoryScores[category] += 5;
                }
                // Partial match gets lower score
                else {
                    categoryScores[category] += 1;
                }
            }
        }
        
        // Boost score for semantic similarity (simple implementation)
        if (meaning.length > 3) {
            for (const keyword of keywords) {
                if (keyword.length > 3) {
                    const similarity = calculateSimilarity(meaning, keyword);
                    if (similarity > 0.7) {
                        categoryScores[category] += 2;
                    }
                }
            }
        }
    }
    
    // Find category with highest score
    let bestCategory = 'other';
    let maxScore = 0;
    
    for (const [category, score] of Object.entries(categoryScores)) {
        if (score > maxScore) {
            maxScore = score;
            bestCategory = category;
        }
    }
    
    return maxScore > 0 ? bestCategory : 'other';
}

// Simple string similarity calculation
function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
        matrix[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
        matrix[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator
            );
        }
    }
    
    return matrix[str2.length][str1.length];
}

// Get category emoji
function getCategoryEmoji(category) {
    return categoryEmojis[category] || categoryEmojis.other;
}