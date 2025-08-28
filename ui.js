// UI management module
class UIManager {
    constructor() {
        this.searchTerm = '';
    }

    // Update statistics display
    updateStats(vocabulary) {
        const totalWords = Object.values(vocabulary).reduce((sum, language) => 
            sum + Object.values(language).reduce((langSum, words) => langSum + words.length, 0), 0);
        
        const totalCategories = Object.values(vocabulary).reduce((sum, language) => 
            sum + Object.keys(language).length, 0);
        
        const totalLanguages = Object.keys(vocabulary).length;
        
        const totalWordsElement = document.getElementById('totalWords');
        const totalCategoriesElement = document.getElementById('totalCategories');
        const totalLanguagesElement = document.getElementById('totalLanguages');
        
        if (totalWordsElement) totalWordsElement.textContent = totalWords;
        if (totalCategoriesElement) totalCategoriesElement.textContent = totalCategories;
        if (totalLanguagesElement) totalLanguagesElement.textContent = totalLanguages;
    }

    // Render language tabs
    renderLanguageTabs(languages, currentLanguage, onLanguageClick, onLanguageDelete) {
        const container = document.getElementById('languageTabs');
        if (!container) return;
        
        container.innerHTML = '';
        
        Array.from(languages).sort().forEach(language => {
            const tab = document.createElement('div');
            tab.className = `language-tab ${language === currentLanguage ? 'active' : ''}`;
            tab.innerHTML = `
                ${getLanguageFlag(language)} ${language}
                <button class="delete-language" title="Delete language">×</button>
            `;
            
            // Add click handler for tab
            tab.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-language')) {
                    onLanguageClick(language);
                }
            });
            
            // Add click handler for delete button
            const deleteBtn = tab.querySelector('.delete-language');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                onLanguageDelete(language);
            });
            
            container.appendChild(tab);
        });
    }

    // Update category select dropdown
    updateCategorySelect(vocabulary, currentLanguage, selectedCategory = '') {
        const select = document.getElementById('categorySelect');
        if (!select || !currentLanguage) return;
        
        select.innerHTML = '<option value="">Select existing category...</option>';
        
        const currentLanguageVocab = vocabulary[currentLanguage] || {};
        Object.keys(currentLanguageVocab).sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = `${getCategoryEmoji(category)} ${category} (${currentLanguageVocab[category].length} words)`;
            select.appendChild(option);
        });
        
        // Set selected category if one was chosen
        if (selectedCategory) {
            select.value = selectedCategory;
        }
    }

    // Update UI from loaded settings
    updateUIFromSettings(settings) {
        const toggle = document.getElementById('categoryToggle');
        const manualMode = document.getElementById('manualMode');
        
        if (settings.isManualMode && toggle && manualMode) {
            toggle.classList.add('active');
            manualMode.classList.add('active');
        } else if (toggle && manualMode) {
            toggle.classList.remove('active');
            manualMode.classList.remove('active');
        }
    }

    // Render categories grid
    renderCategories(vocabulary, currentLanguage, onWordDelete, onCategoryDelete, onWordMove, onCategoryMove) {
        const container = document.getElementById('categoriesContainer');
        if (!container || !currentLanguage) {
            if (container) {
                container.innerHTML = currentLanguage ? '' : 
                    '<p style="text-align: center; color: #666; font-style: italic;">Please select or add a language to start adding vocabulary.</p>';
            }
            return;
        }
        
        container.innerHTML = '';
        
        const currentLanguageVocab = vocabulary[currentLanguage] || {};
        Object.keys(currentLanguageVocab).forEach(category => {
            const categoryCard = this.createCategoryCard(
                category, 
                currentLanguageVocab[category], 
                onWordDelete, 
                onCategoryDelete,
                onWordMove,
                onCategoryMove
            );
            container.appendChild(categoryCard);
        });
        
        // Apply current search filter if active
        if (this.searchTerm) {
            this.applySearchFilter(this.searchTerm);
        }
    }

    // Create a single category card
        createCategoryCard(category, words, onWordDelete, onCategoryDelete, onWordMove, onCategoryMove) {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.setAttribute('data-category', category);
            
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.innerHTML = `<span>${getCategoryEmoji(category)} ${category}</span>`;
            
            const categoryControls = document.createElement('div');
            categoryControls.className = 'category-controls';
            categoryControls.innerHTML = `
                <div class="drag-handle category-drag" draggable="true" title="Drag to reorder category">
                    <span class="dots">⋮⋮</span>
                </div>
                <button class="delete-category">Delete</button>
            `;

            // Add delete button event handler
            const deleteBtn = categoryControls.querySelector('.delete-category');
            deleteBtn.addEventListener('click', () => onCategoryDelete(category));

            // Add drag handlers for category
            const dragHandle = categoryControls.querySelector('.category-drag');
            dragHandle.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    type: 'category',
                    category: category
                }));
                categoryCard.classList.add('dragging');
            });

            dragHandle.addEventListener('dragend', () => {
                categoryCard.classList.remove('dragging');
            });

            // Add drop zone handlers to category card
            categoryCard.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (!categoryCard.classList.contains('dragging')) {
                    categoryCard.classList.add('drag-over');
                }
            });

            categoryCard.addEventListener('dragleave', () => {
                categoryCard.classList.remove('drag-over');
            });

            categoryCard.addEventListener('drop', (e) => {
                e.preventDefault();
                categoryCard.classList.remove('drag-over');
                
                const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                if (dragData.type === 'category' && dragData.category !== category) {
                    onCategoryMove(dragData.category, category);
                }
            });
            
            // Assemble header
            categoryHeader.appendChild(categoryTitle);
            categoryHeader.appendChild(categoryControls);
            
            // Create word list
            const wordList = document.createElement('ul');
            wordList.className = 'word-list';
            
            words.forEach((word, index) => {
                const wordItem = this.createWordItem(word, category, index, onWordDelete, onWordMove, words.length);
                wordList.appendChild(wordItem);
            });
            
            // Assemble card
            categoryCard.appendChild(categoryHeader);
            categoryCard.appendChild(wordList);
            
            return categoryCard;
        }
    // Create a single word item
    
    // Create a single word item
            createWordItem(word, category, index, onWordDelete, onWordMove, totalWords) {
                const listItem = document.createElement('li');
                listItem.className = 'word-item';
                listItem.innerHTML = `
                    <div class="drag-handle word-drag" draggable="true" title="Drag to reorder">
                        <span class="dots">⋮⋮</span>
                    </div>
                    <div class="word-content">
                        <span class="foreign-word">${this.escapeHtml(word.foreign)}</span> - 
                        <span class="english-meaning">${this.escapeHtml(word.english)}</span>
                    </div>
                    <button class="delete-word">×</button>
                `;
                
                // Add delete button event handler
                const deleteBtn = listItem.querySelector('.delete-word');
                deleteBtn.addEventListener('click', () => onWordDelete(category, index));

                // Add drag handlers for word
                const dragHandle = listItem.querySelector('.word-drag');
                dragHandle.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        type: 'word',
                        category: category,
                        index: index
                    }));
                    listItem.classList.add('dragging');
                });

                dragHandle.addEventListener('dragend', () => {
                    listItem.classList.remove('dragging');
                });

                // Add drop zone handlers to word item
                listItem.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    if (!listItem.classList.contains('dragging')) {
                        const rect = listItem.getBoundingClientRect();
                        const midpoint = rect.top + rect.height / 2;
                        if (e.clientY < midpoint) {
                            listItem.classList.add('drag-over-top');
                            listItem.classList.remove('drag-over-bottom');
                        } else {
                            listItem.classList.add('drag-over-bottom');
                            listItem.classList.remove('drag-over-top');
                        }
                    }
                });
                
                listItem.addEventListener('dragleave', () => {
                    listItem.classList.remove('drag-over-top', 'drag-over-bottom');
                });

                listItem.addEventListener('drop', (e) => {
                    e.preventDefault();
                    listItem.classList.remove('drag-over-top', 'drag-over-bottom');
                    
                    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
                    if (dragData.type === 'word') {
                        const rect = listItem.getBoundingClientRect();
                        const midpoint = rect.top + rect.height / 2;
                        let targetIndex = index;
                        
                        if (e.clientY > midpoint) {
                            targetIndex = index + 1;
                        }
                        
                        onWordMove(dragData.category, dragData.index, category, targetIndex);
                    }
                });
                
                return listItem;
            }

    // Apply search filter to categories
    applySearchFilter(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase();
        const categories = document.querySelectorAll('.category-card');
        
        categories.forEach(card => {
            const category = card.getAttribute('data-category').toLowerCase();
            const words = card.querySelectorAll('.word-item');
            let hasMatch = false;
            
            // Check if category name matches
            if (category.includes(this.searchTerm)) {
                hasMatch = true;
            }
            
            // Check if any word matches
            words.forEach(word => {
                const text = word.textContent.toLowerCase();
                if (text.includes(this.searchTerm)) {
                    hasMatch = true;
                }
            });
            
            // Show/hide category based on match
            if (this.searchTerm === '' || hasMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Clear form inputs
    clearInputs() {
        const foreignInput = document.getElementById('foreignInput');
        const englishInput = document.getElementById('englishInput');
        
        if (foreignInput) foreignInput.value = '';
        if (englishInput) englishInput.value = '';
    }

    // Get form input values
    getInputValues() {
        const foreignInput = document.getElementById('foreignInput');
        const englishInput = document.getElementById('englishInput');
        const addLanguageInput = document.getElementById('addLanguageInput');
        const newCategoryInput = document.getElementById('newCategoryInput');
        const categorySelect = document.getElementById('categorySelect');
        
        return {
            foreign: foreignInput ? foreignInput.value.trim() : '',
            english: englishInput ? englishInput.value.trim() : '',
            newLanguage: addLanguageInput ? addLanguageInput.value.trim().toLowerCase() : '',
            newCategory: newCategoryInput ? newCategoryInput.value.trim().toLowerCase() : '',
            selectedCategory: categorySelect ? categorySelect.value : ''
        };
    }

    // Clear specific input
    clearInput(inputId) {
        const input = document.getElementById(inputId);
        if (input) input.value = '';
    }

    // Show storage information dialog
    showStorageInfo(vocabulary) {
        const info = storageManager.getStorageInfo(vocabulary);
        
        const message = `Storage Information:
        
Total Words: ${info.totalWords}
Categories: ${info.totalCategories}
Languages: ${info.totalLanguages}
Data Size: ${info.dataSize}
Storage Type: ${info.storageType}

Your data is automatically saved to your browser's localStorage and will persist between sessions.`;
        
        alert(message);
    }

    // Toggle category mode (manual/auto)
    toggleCategoryMode(isManualMode) {
        const toggle = document.getElementById('categoryToggle');
        const manualMode = document.getElementById('manualMode');
        
        if (!toggle || !manualMode) return;
        
        if (isManualMode) {
            toggle.classList.add('active');
            manualMode.classList.add('active');
        } else {
            toggle.classList.remove('active');
            manualMode.classList.remove('active');
        }
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Setup keyboard event listeners
    setupKeyboardEvents(onAddWord, onAddLanguage) {
        const foreignInput = document.getElementById('foreignInput');
        const englishInput = document.getElementById('englishInput');
        const addLanguageInput = document.getElementById('addLanguageInput');
        
        if (foreignInput) {
            foreignInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (englishInput) englishInput.focus();
                }
            });
        }
        
        if (englishInput) {
            englishInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    onAddWord();
                }
            });
        }
        
        if (addLanguageInput) {
            addLanguageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    onAddLanguage();
                }
            });
        }
    }

    // Setup search input listener
    setupSearchListener() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.applySearchFilter(e.target.value);
            });
        }
    }

    // Initialize UI event listeners
    initializeEventListeners(eventHandlers) {
        this.setupKeyboardEvents(eventHandlers.onAddWord, eventHandlers.onAddLanguage);
        this.setupSearchListener();
        
        // Language management
        const addLanguageBtn = document.getElementById('addLanguageBtn');
        if (addLanguageBtn) {
            addLanguageBtn.addEventListener('click', eventHandlers.onAddLanguage);
        }

        // Category toggle
        const categoryToggle = document.getElementById('categoryToggle');
        if (categoryToggle) {
            categoryToggle.addEventListener('click', eventHandlers.onToggleCategoryMode);
        }
        
        // Category management
        const createCategoryBtn = document.getElementById('createCategoryBtn');
        if (createCategoryBtn) {
            createCategoryBtn.addEventListener('click', eventHandlers.onCreateCategory);
        }
        
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
            categorySelect.addEventListener('change', eventHandlers.onCategorySelect);
        }
        
        // Word management
        const addWordBtn = document.getElementById('addWordBtn');
        if (addWordBtn) {
            addWordBtn.addEventListener('click', eventHandlers.onAddWord);
        }
        
        // Import/Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', eventHandlers.onExportData);
        }
        
        const importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', () => document.getElementById('importFile').click());
        }
        
        const importFile = document.getElementById('importFile');
        if (importFile) {
            importFile.addEventListener('change', eventHandlers.onImportData);
        }
        
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', eventHandlers.onClearAllData);
        }
        
        const storageInfoBtn = document.getElementById('storageInfoBtn');
        if (storageInfoBtn) {
            storageInfoBtn.addEventListener('click', eventHandlers.onShowStorageInfo);
        }
    }
}

// Create global UI instance
const uiManager = new UIManager();