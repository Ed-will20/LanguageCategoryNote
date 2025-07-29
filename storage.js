// Storage management module
// Storage management module
class StorageManager {
    constructor() {
        this.VOCAB_KEY = 'language_notes_vocabulary';
        this.SETTINGS_KEY = 'language_notes_settings';
    }

    // Save vocabulary to localStorage
    saveVocabulary(vocabulary, settings) {
        try {
            localStorage.setItem(this.VOCAB_KEY, JSON.stringify(vocabulary));
            localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
            this.showSaveIndicator('Auto-saved!');
            return true;
        } catch (error) {
            console.error('Error saving vocabulary:', error);
            this.showSaveIndicator('Save failed!', true);
            return false;
        }
    }

    // Load vocabulary from localStorage
    loadVocabulary() {
        try {
            const savedVocab = localStorage.getItem(this.VOCAB_KEY);
            const savedSettings = localStorage.getItem(this.SETTINGS_KEY);
            
            const result = {
                vocabulary: savedVocab ? JSON.parse(savedVocab) : {},
                settings: savedSettings ? JSON.parse(savedSettings) : {
                    currentLanguage: '',
                    isManualMode: false,
                    selectedCategory: ''
                },
                hasData: savedVocab !== null
            };
            
            return result;
        } catch (error) {
            console.error('Error loading vocabulary:', error);
            return {
                vocabulary: {},
                settings: { 
                    currentLanguage: '', 
                    isManualMode: false, 
                    selectedCategory: '' 
                },
                hasData: false
            };
        }
    }

    // Clear all data from localStorage
    clearAllData() {
        try {
            localStorage.removeItem(this.VOCAB_KEY);
            localStorage.removeItem(this.SETTINGS_KEY);
            this.showSaveIndicator('All data cleared!');
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    // Export vocabulary data
    exportData(vocabulary, settings) {
        const data = {
            vocabulary: vocabulary,
            settings: settings,
            exportDate: new Date().toISOString(),
            version: '3.0'
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `language-notes-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSaveIndicator('Data exported!');
    }

    // Import vocabulary data
    importData(file, callback) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                let vocabulary, settings;
                
                // Handle different import formats
                if (data.vocabulary && data.settings) {
                    // New format with settings
                    vocabulary = data.vocabulary;
                    settings = data.settings;
                } else if (data.vocabulary) {
                    // Format with vocabulary but no settings
                    vocabulary = data.vocabulary;
                    settings = { 
                        currentLanguage: '', 
                        isManualMode: false, 
                        selectedCategory: '' 
                    };
                } else {
                    // Old format - assume it's Japanese vocabulary
                    vocabulary = { japanese: data };
                    settings = { 
                        currentLanguage: 'japanese', 
                        isManualMode: false, 
                        selectedCategory: '' 
                    };
                }
                
                callback({ vocabulary, settings, success: true });
                this.showSaveIndicator('Data imported!');
                
            } catch (error) {
                console.error('Import error:', error);
                callback({ success: false, error: 'Invalid file format' });
                this.showSaveIndicator('Import failed!', true);
            }
        };
        
        reader.readAsText(file);
    }

    // Get storage information
    getStorageInfo(vocabulary) {
        const vocabSize = localStorage.getItem(this.VOCAB_KEY)?.length || 0;
        const settingsSize = localStorage.getItem(this.SETTINGS_KEY)?.length || 0;
        const totalSize = vocabSize + settingsSize;
        
        const totalWords = Object.values(vocabulary).reduce((sum, language) => 
            sum + Object.values(language).reduce((langSum, words) => langSum + words.length, 0), 0);
        
        const totalCategories = Object.values(vocabulary).reduce((sum, language) => 
            sum + Object.keys(language).length, 0);
        
        return {
            totalWords,
            totalCategories,
            totalLanguages: Object.keys(vocabulary).length,
            dataSize: (totalSize / 1024).toFixed(2) + ' KB',
            storageType: 'localStorage'
        };
    }

    // Show save indicator
    showSaveIndicator(message = 'Saved!', isError = false) {
        const indicator = document.getElementById('saveIndicator');
        if (!indicator) return;
        
        indicator.textContent = message;
        indicator.style.background = isError ? '#dc3545' : '#28a745';
        indicator.style.opacity = '1';
        
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }

    // Check if localStorage is available
    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}

// Create global storage instance
const storageManager = new StorageManager();