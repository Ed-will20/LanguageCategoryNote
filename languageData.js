// Language flags mapping
const languageFlags = {
    japanese: '🇯🇵',
    spanish: '🇪🇸',
    french: '🇫🇷',
    german: '🇩🇪',
    italian: '🇮🇹',
    portuguese: '🇵🇹',
    chinese: '🇨🇳',
    korean: '🇰🇷',
    russian: '🇷🇺',
    arabic: '🇸🇦',
    hindi: '🇮🇳',
    dutch: '🇳🇱',
    swedish: '🇸🇪',
    norwegian: '🇳🇴',
    danish: '🇩🇰',
    finnish: '🇫🇮',
    polish: '🇵🇱',
    czech: '🇨🇿',
    hungarian: '🇭🇺',
    turkish: '🇹🇷',
    greek: '🇬🇷',
    hebrew: '🇮🇱',
    thai: '🇹🇭',
    vietnamese: '🇻🇳',
    indonesian: '🇮🇩',
    malay: '🇲🇾',
    tagalog: '🇵🇭',
    swahili: '🇰🇪',
    bulgarian: '🇧🇬',
    croatian: '🇭🇷',
    serbian: '🇷🇸',
    slovenian: '🇸🇮',
    slovak: '🇸🇰',
    estonian: '🇪🇪',
    latvian: '🇱🇻',
    lithuanian: '🇱🇹',
    romanian: '🇷🇴',
    ukrainian: '🇺🇦',
    default: '🌍'
};

// Get language flag
function getLanguageFlag(language) {
    return languageFlags[language.toLowerCase()] || languageFlags.default;
}

// Sample data for initialization
const sampleData = {
    japanese: {
        food: [
            { foreign: 'tamago', english: 'egg' },
            { foreign: 'gohan', english: 'rice' },
            { foreign: 'sakana', english: 'fish' },
            { foreign: 'mizu', english: 'water' },
            { foreign: 'pan', english: 'bread' }
        ],
        colors: [
            { foreign: 'akai', english: 'red' },
            { foreign: 'aoi', english: 'blue' },
            { foreign: 'kiiroi', english: 'yellow' }
        ],
        family: [
            { foreign: 'okaasan', english: 'mother' },
            { foreign: 'otousan', english: 'father' }
        ]
    },
    spanish: {
        food: [
            { foreign: 'manzana', english: 'apple' },
            { foreign: 'agua', english: 'water' },
            { foreign: 'pan', english: 'bread' },
            { foreign: 'leche', english: 'milk' }
        ],
        family: [
            { foreign: 'madre', english: 'mother' },
            { foreign: 'padre', english: 'father' },
            { foreign: 'hermano', english: 'brother' },
            { foreign: 'hermana', english: 'sister' }
        ],
        colors: [
            { foreign: 'rojo', english: 'red' },
            { foreign: 'azul', english: 'blue' }
        ]
    },
    french: {
        food: [
            { foreign: 'pomme', english: 'apple' },
            { foreign: 'eau', english: 'water' },
            { foreign: 'pain', english: 'bread' }
        ],
        family: [
            { foreign: 'mère', english: 'mother' },
            { foreign: 'père', english: 'father' }
        ]
    }
};