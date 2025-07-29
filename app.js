// Main application class
class LanguageNotesApp {
    constructor() {
        this.vocabulary = {}; // Structure: { language: { category: [words] } }
        this.currentLanguage = '';
        this.isManualMode = false;
        this.selectedCategory = '';
        this.languages = new Set();
        this.isInitialized = false;
    }

    // Initialize the application
    init() {
        if (this.isInitialized) return;
        
        this.loadData();
        this.initializeEventListeners();
        this.render();
        
        this.isInitialized = true;
        console.log('Language Notes initialized successfully');
    }

    // Load data from storage
    loadData() {
        const data = storageManager.loadVocabulary();
        
        if (data.hasData) {
            this.vocabulary = data.vocabulary;
            this.languages = new Set(Object.keys(this.vocabulary));
            this.currentLanguage = data.settings.currentLanguage || '';
            this.isManualMode = data.settings.isManualMode || false;
            this.selectedCategory = data.settings.selectedCategory || '';
        } else {
            this.initializeSampleData();
        }
        
        // Set default language if none selected
        if (!this.currentLanguage && this.languages.size > 0) {
            this.currentLanguage = Array.from(this.languages)[0];
        }
        
        uiManager.updateUIFromSettings({
            isManualMode: this.isManualMode,
            selectedCategory: this.selectedCategory
        });
    }

    // Initialize with sample data
    initializeSampleData() {
        this.vocabulary = sampleData;
        this.languages = new Set(Object.keys(this.vocabulary));
        this.currentLanguage = 'japanese';
        this.saveData();
    }

    // Save data to storage
    saveData() {
        const settings = {
            currentLanguage: this.currentLanguage,
            isManualMode: this.isManualMode,
            selectedCategory: this.selectedCategory
        };
        storageManager.saveVocabulary(this.vocabulary, settings);
    }

    // Add a new language
    addLanguage() {
        const inputs = uiManager.getInputValues();
        const languageName = inputs.newLanguage;
        
        if (!languageName) {
            alert('Please enter a language name');
            return;
        }
        
        if (this.languages.has(languageName)) {
            alert('Language already exists');
            return;
        }
        
        this.languages.add(languageName);
        this.vocabulary[languageName] = {};
        this.currentLanguage = languageName;
        
        uiManager.clearInput('addLanguageInput');
        this.saveData();
        this.render();
    }

    // Switch to a different language
    switchLanguage(language) {
        this.currentLanguage = language;
        this.selectedCategory = '';
        this.saveData();
        this.render();
    }

    // Delete a language
    deleteLanguage(language) {
        if (!confirm(`Are you sure you want to delete "${language}" and all its vocabulary?`)) {
            return;
        }
        
        this.languages.delete(language);
        delete this.vocabulary[language];
        
        // If we deleted the current language, switch to another one
        if (this.currentLanguage === language) {
            this.currentLanguage = this.languages.size > 0 ? Array.from(this.languages)[0] : '';
        }
        
        this.saveData();
        this.render();
    }

    // Add a new word
    addWord() {
        const inputs = uiManager.getInputValues();
        
        if (!inputs.foreign || !inputs.english) {
            alert('Please enter both foreign word and English meaning');
            return;
        }
        
        if (!this.currentLanguage) {
            alert('Please select or add a language first');
            return;
        }
        
        let category;
        
        if (this.isManualMode) {
            category = this.selectedCategory;
            if (!category) {
                alert('Please select a category or create a new one');
                return;
            }
        } else {
            category = categorizeWord(inputs.english);
        }
        
        // Initialize language if it doesn't exist
        if (!this.vocabulary[this.currentLanguage]) {
            this.vocabulary[this.currentLanguage] = {};
        }
        
        // Initialize category if it doesn't exist
        if (!this.vocabulary[this.currentLanguage][category]) {
            this.vocabulary[this.currentLanguage][category] = [];
        }
        
        // Add the word
        this.vocabulary[this.currentLanguage][category].push({
            foreign: inputs.foreign,
            english: inputs.english
        });
        
        // Clear inputs and save
        uiManager.clearInputs();
        this.saveData();
        this.render();
    }

    // Toggle between manual and auto categorization
    toggleCategoryMode() {
        this.isManualMode = !this.isManualMode;
        
        if (!this.isManualMode) {
            this.selectedCategory = '';
        }
        
        uiManager.toggleCategoryMode(this.isManualMode);
        
        if (this.isManualMode) {
            uiManager.updateCategorySelect(this.vocabulary, this.currentLanguage, this.selectedCategory);
        }
        
        this.saveData();
    }

    // Create a new category
    createCategory() {
        const inputs = uiManager.getInputValues();
        const newCategoryName = inputs.newCategory;
        
        if (!newCategoryName) {
            alert('Please enter a category name');
            return;
        }
        
        if (!this.currentLanguage) {
            alert('Please select a language first');
            return;
        }
        
        if (this.vocabulary[this.currentLanguage] && this.vocabulary[this.currentLanguage][newCategoryName]) {
            alert('Category already exists');
            return;
        }
        
        // Initialize language if it doesn't exist
        if (!this.vocabulary[this.currentLanguage]) {
            this.vocabulary[this.currentLanguage] = {};
        }
        
        // Create new category
        this.vocabulary[this.currentLanguage][newCategoryName] = [];
        this.selectedCategory = newCategoryName;
        
        uiManager.clearInput('newCategoryInput');
        this.saveData();
        this.render();
    }

    // Handle category selection change
    onCategorySelect() {
        const inputs = uiManager.getInputValues();
        this.selectedCategory = inputs.selectedCategory;
        this.saveData();
    }

    // Delete a word
    deleteWord(category, index) {
        if (!confirm('Are you sure you want to delete this word?')) {
            return;
        }
        
        if (this.vocabulary[this.currentLanguage] && 
            this.vocabulary[this.currentLanguage][category] && 
            this.vocabulary[this.currentLanguage][category][index]) {
            
            this.vocabulary[this.currentLanguage][category].splice(index, 1);
            
            // Remove category if empty
            if (this.vocabulary[this.currentLanguage][category].length === 0) {
                delete this.vocabulary[this.currentLanguage][category];
                if (this.selectedCategory === category) {
                    this.selectedCategory = '';
                }
            }
            
            this.saveData();
            this.render();
        }
    }

    // Delete an entire category
    deleteCategory(category) {
        if (!confirm(`Are you sure you want to delete the entire "${category}" category with all its words?`)) {
            return;
        }
        
        if (this.vocabulary[this.currentLanguage]) {
            delete this.vocabulary[this.currentLanguage][category];
            
            if (this.selectedCategory === category) {
                this.selectedCategory = '';
            }
            
            this.saveData();
            this.render();
        }
    }

    // Clear all data
    clearAllData() {
        if (!confirm('Are you sure you want to clear all vocabulary data? This cannot be undone!')) {
            return;
        }
        
        storageManager.clearAllData();
        this.vocabulary = {};
        this.languages = new Set();
        this.currentLanguage = '';
        this.isManualMode = false;
        this.selectedCategory = '';
        
        uiManager.updateUIFromSettings({ 
            isManualMode: false, 
            selectedCategory: '' 
        });
        this.render();
    }

    // Export data
    exportData() {
        const settings = {
            currentLanguage: this.currentLanguage,
            isManualMode: this.isManualMode,
            selectedCategory: this.selectedCategory
        };
        storageManager.exportData(this.vocabulary, settings);
    }

    // Import data
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        storageManager.importData(file, (result) => {
            if (result.success) {
                this.vocabulary = result.vocabulary;
                this.languages = new Set(Object.keys(result.vocabulary));
                this.currentLanguage = result.settings.currentLanguage || 
                    (this.languages.size > 0 ? Array.from(this.languages)[0] : '');
                this.isManualMode = result.settings.isManualMode || false;
                this.selectedCategory = result.settings.selectedCategory || '';
                
                uiManager.updateUIFromSettings(result.settings);
                this.saveData();
                this.render();
            } else {
                alert('Failed to import data: ' + (result.error || 'Unknown error'));
            }
        });
        
        // Clear the file input
        event.target.value = '';
    }

    // Show storage information
    showStorageInfo() {
        uiManager.showStorageInfo(this.vocabulary);
    }

    // Initialize event listeners
    initializeEventListeners() {
        const eventHandlers = {
            onAddLanguage: () => this.addLanguage(),
            onAddWord: () => this.addWord(),
            onToggleCategoryMode: () => this.toggleCategoryMode(),
            onCreateCategory: () => this.createCategory(),
            onCategorySelect: () => this.onCategorySelect(),
            onExportData: () => this.exportData(),
            onImportData: (e) => this.importData(e),
            onClearAllData: () => this.clearAllData(),
            onShowStorageInfo: () => this.showStorageInfo()
        };
        
        uiManager.initializeEventListeners(eventHandlers);
    }

    // Render the entire UI
    render() {
        uiManager.renderLanguageTabs(
            this.languages, 
            this.currentLanguage,
            (language) => this.switchLanguage(language),
            (language) => this.deleteLanguage(language)
        );
        
        uiManager.updateStats(this.vocabulary);
        
        uiManager.renderCategories(
            this.vocabulary,
            this.currentLanguage,
            (category, index) => this.deleteWord(category, index),
            (category) => this.deleteCategory(category)
        );
        
        uiManager.updateCategorySelect(
            this.vocabulary, 
            this.currentLanguage, 
            this.selectedCategory
        );
        
        uiManager.updateUIFromSettings({
            isManualMode: this.isManualMode,
            selectedCategory: this.selectedCategory
        });
    }

    // Get current vocabulary (for external access)
    getVocabulary() {
        return { ...this.vocabulary };
    }

    // Get current settings (for external access)
    getSettings() {
        return {
            currentLanguage: this.currentLanguage,
            isManualMode: this.isManualMode,
            selectedCategory: this.selectedCategory
        };
    }
}

// Create global app instance and initialize
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new LanguageNotesApp();
    
    // Check if localStorage is available
    if (!storageManager.isLocalStorageAvailable()) {
        alert('Warning: localStorage is not available. Your data will not be saved between sessions.');
    }
    
    app.init();
    console.log('Language Notes loaded successfully!');
});