<<<<<<< HEAD
let filteredSchemes = []; // Start with no schemes displayed
=======
let filteredSchemes = [...schemes]; // Show all schemes initially
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b

// DOM elements
const advancedFilters = document.getElementById('advancedFilters');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resetFiltersBtn = document.getElementById('resetFilters');
const schemeGrid = document.getElementById('schemeGrid');
const schemeCount = document.getElementById('schemeCount');
const noResults = document.getElementById('noResults');
const resultsSection = document.getElementById('resultsSection');
const interestRateSlider = document.getElementById('interestRate');
const interestRateValue = document.getElementById('interestRateValue');

<<<<<<< HEAD
function setInitialState() {
    resultsSection.classList.add('hidden');
    noResults.classList.remove('hidden');
    noResults.innerHTML = `
        <div class="text-6xl mb-4">👋</div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">Welcome to the MSME Scheme Finder</h3>
        <p class="text-gray-600">Use the filters above and click "Find Matching Schemes" to discover schemes tailored for you.</p>
    `;
    schemeCount.textContent = '0';
}

=======
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b
// Advanced filters are always visible

// Interest rate slider functionality
interestRateSlider.addEventListener('input', function() {
    interestRateValue.textContent = this.value + '%';
});

// Search functionality
searchBtn.addEventListener('click', function() {
    applyFilters();
});

// Clear filters
clearBtn.addEventListener('click', function() {
    clearAllFilters();
});

resetFiltersBtn.addEventListener('click', function() {
    clearAllFilters();
});

function clearAllFilters() {
    // Clear all select elements
    document.querySelectorAll('select').forEach(select => {
        select.value = '';
    });
    
    // Clear all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        if (radio.value === '') {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    // Reset interest rate slider
    interestRateSlider.value = 15;
    interestRateValue.textContent = '15%';
    
<<<<<<< HEAD
    // Reset to initial state
    filteredSchemes = [];
    setInitialState();
=======
    // Reset to show all schemes
    filteredSchemes = [...schemes];
    displaySchemes();
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b
}

function applyFilters() {
    const filters = {
        msmeClass: document.getElementById('msmeClass').value,
        activity: document.getElementById('activity').value,
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        areaType: document.getElementById('areaType').value,
        loanRequired: document.getElementById('loanRequired').value,
        subsidyPercentage: document.getElementById('subsidyPercentage').value,
        interestRate: parseFloat(document.getElementById('interestRate').value),
        gender: document.getElementById('gender').value,
        socialCategory: document.getElementById('socialCategory').value,
        speciallyAbled: document.querySelector('input[name="speciallyAbled"]:checked').value,
        businessAge: document.getElementById('businessAge').value,
        exportOriented: document.getElementById('exportOriented').value,
        technologyBased: document.getElementById('technologyBased').value,
        womenEntrepreneur: document.getElementById('womenEntrepreneur').value
    };

    // Score each scheme based on how well it matches the filters
    const scoredSchemes = schemes.map(scheme => {
        let score = 0;
        let maxScore = 0;

        // MSME Classification match (high priority)
        maxScore += 10;
        if (filters.msmeClass) {
            if (scheme.msmeClass && scheme.msmeClass.includes(filters.msmeClass)) {
                score += 10;
            }
        } else {
            score += 5; // Partial score for no filter
        }

        // Activity match (high priority)
        maxScore += 10;
        if (filters.activity) {
            if (scheme.activity && scheme.activity.includes(filters.activity)) {
                score += 10;
            }
        } else {
            score += 5;
        }

        // Location match (medium priority)
        maxScore += 8;
        if (filters.state) {
            if (scheme.eligibleStates && scheme.eligibleStates.includes(filters.state)) {
                score += 8;
            }
        } else {
            score += 4;
        }

        maxScore += 6;
        if (filters.district) {
            if (scheme.eligibleDistricts && scheme.eligibleDistricts.includes(filters.district)) {
                score += 6;
            }
        } else {
            score += 3;
        }

        // Financial requirements match (high priority)
        maxScore += 9;
        if (filters.loanRequired && scheme.maxLoanAmount) {
            const [min, max] = filters.loanRequired.split('-').map(v => v.replace('+', ''));
            const minAmount = parseInt(min);
            const maxAmount = max ? parseInt(max) : Infinity;
            const schemeMaxLoan = scheme.maxLoanAmount;
            
            if (schemeMaxLoan >= minAmount) {
                score += 9;
            } else if (schemeMaxLoan >= minAmount * 0.5) {
                score += 4; // Partial match
            }
        } else {
            score += 4;
        }



        // Social category match (medium priority)
        maxScore += 6;
        if (filters.socialCategory) {
            if (scheme.socialCategory && scheme.socialCategory.includes(filters.socialCategory)) {
                score += 6;
            }
        } else {
            score += 3;
        }

        // Women entrepreneur match (medium priority)
        maxScore += 5;
        if (filters.womenEntrepreneur === 'Yes') {
            if (scheme.womenEntrepreneur === true) {
                score += 5;
            }
        } else {
            score += 2;
        }

        // Export oriented match (low priority)
        maxScore += 4;
        if (filters.exportOriented === 'Yes') {
            if (scheme.exportOriented === true) {
                score += 4;
            }
        } else {
            score += 2;
        }

        // Technology based match (low priority)
        maxScore += 4;
        if (filters.technologyBased === 'Yes') {
            if (scheme.technologyBased === true) {
                score += 4;
            }
        } else {
            score += 2;
        }

        // Subsidy percentage match (medium priority)
        maxScore += 6;
        if (filters.subsidyPercentage) {
            const minSubsidy = parseInt(filters.subsidyPercentage);
            if (scheme.subsidyPercentage >= minSubsidy) {
                score += 6;
            } else if (scheme.subsidyPercentage >= minSubsidy * 0.5) {
                score += 3; // Partial match
            }
        } else {
            score += 3;
        }

        // Interest rate match (high priority - lower is better)
        maxScore += 8;
        if (filters.interestRate && scheme.interestRate) {
            if (scheme.interestRate <= filters.interestRate) {
                // Perfect match - scheme rate is within acceptable range
                const rateAdvantage = (filters.interestRate - scheme.interestRate) / filters.interestRate;
                score += 8 + Math.min(2, rateAdvantage * 4); // Bonus for lower rates
            } else if (scheme.interestRate <= filters.interestRate + 2) {
                // Acceptable match - slightly higher than preferred
                score += 4;
            } else {
                // Poor match - significantly higher than preferred
                score += 1;
            }
        } else {
            score += 4; // Neutral score when no filter applied
        }

        // Specially abled support (low priority)
        maxScore += 3;
        if (filters.speciallyAbled === 'Yes') {
            if (scheme.speciallyAbledSupport === true) {
                score += 3;
            }
        } else {
            score += 1;
        }

        return {
            ...scheme,
            matchScore: score,
            matchPercentage: Math.round((score / maxScore) * 100)
        };
    });

<<<<<<< HEAD
    // Filter by match percentage > 75% and then sort by match score
    filteredSchemes = scoredSchemes
        .filter(scheme => scheme.matchPercentage > 75)
=======
    // Sort by match score
    filteredSchemes = scoredSchemes
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b
        .sort((a, b) => b.matchScore - a.matchScore);

    displaySchemes();
}

function displaySchemes() {
    schemeCount.textContent = filteredSchemes.length;
    
    if (filteredSchemes.length === 0) {
        resultsSection.classList.add('hidden');
        noResults.classList.remove('hidden');
<<<<<<< HEAD
        // Restore the original "no results" message if it was changed
        noResults.innerHTML = `
            <div class="text-6xl mb-4">😔</div>
            <h3 class="text-2xl font-semibold text-gray-700 mb-2">No schemes match your criteria</h3>
            <p class="text-gray-600 mb-4">Try adjusting your filters to find more options</p>
            <button id="resetFilters" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Reset All Filters
            </button>
        `;
        // The button is recreated, so the event listener must be re-attached.
        const newResetBtn = document.getElementById('resetFilters');
        if (newResetBtn) {
            newResetBtn.addEventListener('click', clearAllFilters);
        }
=======
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b
        return;
    }
    
    resultsSection.classList.remove('hidden');
    noResults.classList.add('hidden');
    
    schemeGrid.innerHTML = filteredSchemes.map(scheme => `
        <div class="bg-white rounded-lg shadow-md p-6 card-hover flex flex-col">
            <div class="flex items-start justify-between mb-4">
                <h3 class="text-lg font-bold text-gray-800 leading-tight">${scheme.name}</h3>
                <div class="ml-4 flex-shrink-0 text-right">
                    <div class="font-bold text-xl text-blue-600">${scheme.matchPercentage}%</div>
                    <div class="text-xs text-gray-500">Match</div>
                </div>
            </div>
            
            <p class="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">${scheme.description}</p>
            
            <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm">
                    <span class="w-6 text-center mr-2">💰</span>
                    <span class="font-semibold text-gray-700 mr-2">Max Loan:</span>
                    <span class="text-gray-800">${scheme.maxLoan}</span>
                </div>
                <div class="flex items-center text-sm">
                    <span class="w-6 text-center mr-2">💸</span>
                    <span class="font-semibold text-gray-700 mr-2">Subsidy:</span>
                    <span class="text-gray-800">${scheme.subsidy}</span>
                </div>
                <div class="flex items-center text-sm">
                    <span class="w-6 text-center mr-2">👥</span>
                    <span class="font-semibold text-gray-700 mr-2">For:</span>
                    <span class="text-gray-800">${scheme.msmeClass.join(', ')}</span>
                </div>
            </div>
            
            <div class="border-t pt-4 mt-auto">
                <div class="flex justify-between items-center">
                    <button class="details-btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm font-semibold" data-scheme="${scheme.name}">
                        Details
                    </button>
                    <button class="apply-btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold" data-scheme="${scheme.name}">
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize display
<<<<<<< HEAD
setInitialState();
=======
displaySchemes();
>>>>>>> c57c20c73cabc23eb671137c1cebb445c43a720b

// Add click handlers for apply buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.apply-btn')) {
        const schemeName = e.target.dataset.scheme;
        showApplicationModal(schemeName);
    }
    
    if (e.target.matches('.details-btn')) {
        const schemeName = e.target.dataset.scheme;
        showDetailsModal(schemeName);
    }
});

function showApplicationModal(schemeName) {
    const scheme = schemes.find(s => s.name === schemeName);
    if (scheme && scheme.applyLink) {
        // Open the official scheme link in a new tab
        window.open(scheme.applyLink, '_blank', 'noopener,noreferrer');
    } else {
        // Fallback modal if no link is available
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold">Application Information</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-800">&times;</button>
                </div>
                <p class="text-gray-700 mb-4">
                    Application for <strong>${schemeName}</strong> is not available through an online portal at this moment.
                </p>
                <p class="text-sm text-gray-600">
                    Please visit the nearest office or check the official website for more details on the application process.
                </p>
                <div class="mt-6 text-right">
                    <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

function showDetailsModal(schemeName) {
    const scheme = schemes.find(s => s.name === schemeName);
    if (!scheme) return;

    // 1. Lock the background from scrolling
    document.body.style.overflow = 'hidden';

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    const closeModal = () => {
        // 4. Unlock the background when the modal is closed
        document.body.style.overflow = 'auto';
        modal.remove();
    };

    const detailedInfo = getSchemeDetails(scheme);

    modal.innerHTML = `
        <!-- 2. The main dialog has a strict height limit and uses flexbox to structure its children -->
        <div class="bg-white rounded-lg shadow-2xl max-w-5xl w-full h-full max-h-[90vh] flex flex-col overflow-hidden"> 
            
            <!-- Header: This part has a fixed height and will not grow or shrink -->
            <div class="p-6 pb-4 border-b border-gray-200 flex-shrink-0">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900">${scheme.name}</h2>
                        <p class="text-sm text-gray-500">${scheme.category}</p>
                    </div>
                    <button id="close-modal-btn-x" class="text-3xl text-gray-500 hover:text-gray-800 leading-none">&times;</button>
                </div>
            </div>

            <!-- 3. Content Area: This part is told to grow and take available space, and to scroll if its content is too tall -->
            <div class="p-6 overflow-y-auto flex-grow">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">🎯 Objective</h3>
                            <p class="text-gray-600">${detailedInfo.objective}</p>
                        </div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">🌟 Key Benefits</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                                ${detailedInfo.benefits.map(b => `<li>${b}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">✅ Eligibility Criteria</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                                ${detailedInfo.eligibilityDetails.map(e => `<li>${e}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">📄 Documents Required</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                                ${detailedInfo.documents.map(d => `<li>${d}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-gray-800 mb-2 border-l-4 border-blue-500 pl-3">➡️ Application Process</h3>
                            <ol class="list-decimal list-inside space-y-2 text-gray-600 ml-4">
                                ${detailedInfo.applicationProcess.map(p => `<li>${p}</li>`).join('')}
                            </ol>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <h3 class="text-lg font-semibold text-blue-800 mb-3">💰 Key Financials</h3>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-blue-600 font-medium">Max Loan Amount:</span>
                                    <span class="font-bold text-blue-800">${scheme.maxLoan}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-blue-600 font-medium">Subsidy:</span>
                                    <span class="font-bold text-blue-800">${scheme.subsidy}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-blue-600 font-medium">Interest Rate (approx):</span>
                                    <span class="font-bold text-blue-800">${scheme.interestRate}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Footer: This part also has a fixed height -->
            <div class="flex space-x-4 p-6 pt-4 border-t border-gray-200 flex-shrink-0">
                <button id="close-modal-btn-main" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex-grow">
                    Close
                </button>
                <button class="apply-btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex-grow" data-scheme="${scheme.name}">
                    Apply Now
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add event listeners for closing the modal
    modal.querySelector('#close-modal-btn-x').addEventListener('click', closeModal);
    modal.querySelector('#close-modal-btn-main').addEventListener('click', closeModal);
}

function getSchemeDetails(scheme) {
    const baseDetails = {
        objective: scheme.detailedInfo?.objective || `To support ${scheme.msmeClass.join('/')} enterprises in ${scheme.activity.join('/')} sector through financial assistance and various benefits.`,
        benefits: scheme.detailedInfo?.benefits || [
            `Financial assistance up to ${scheme.maxLoan}`,
            `Subsidy of ${scheme.subsidy}`,
            `Focus on ${scheme.msmeClass.join('/')} enterprises`,
            `Covers ${scheme.activity.join('/')} activities`
        ],
        eligibilityDetails: scheme.detailedInfo?.eligibilityDetails || [
            `Business must be classified as ${scheme.msmeClass.join(' or ')}`,
            `Applicable for ${scheme.activity.join('/')} sectors`,
            `Entrepreneur must be an Indian citizen`,
            `Must be located in eligible areas: ${scheme.eligibleStates.join(', ')}`
        ],
        documents: scheme.detailedInfo?.documents || [
            "Aadhaar Card",
            "PAN Card",
            "Business Registration Certificate",
            "Project Report",
            "Bank account details",
            "Financial statements (if existing business)"
        ],
        applicationProcess: scheme.detailedInfo?.applicationProcess || [
            "Visit the official portal for the scheme.",
            "Register your business and create a user profile.",
            "Fill out the online application form with all required details.",
            "Upload scanned copies of all necessary documents.",
            "Submit the application and keep track of the application status.",
            "Upon approval, funds will be disbursed as per the scheme guidelines."
        ]
    };
    return baseDetails;
};
