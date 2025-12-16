let shops = [];
let guides = [];
let strains = []; // [NEW]
let selectedShopId = null;
let selectedGuideId = null;
let selectedStrainSlug = null; // [NEW]
let currentTab = 'shops'; // 'shops' or 'guides' or 'strains'
let isFilteringDuplicates = false;

const API_URL = 'http://localhost:3001/api';

// --- Selectors ---
const tabs = {
    shops: document.getElementById('tabShops'),
    guides: document.getElementById('tabGuides'),
    strains: document.getElementById('tabStrains') // [NEW]
};

const containers = {
    shopSearch: document.getElementById('shopSearchContainer'),
    guideActions: document.getElementById('guideActionsContainer'),
    strainActions: document.getElementById('strainActionsContainer'), // [NEW]

    shopList: document.getElementById('shopList'),
    guideList: document.getElementById('guideList'),
    strainList: document.getElementById('strainList'), // [NEW]

    shopEditor: document.getElementById('editor'),
    guideEditor: document.getElementById('guideEditor'),
    strainEditor: document.getElementById('strainEditor'), // [NEW]

    emptyState: document.getElementById('emptyState')
};

const saveBtn = document.getElementById('saveBtn');

// --- Initialization ---
async function init() {
    await Promise.all([fetchShops(), fetchGuides(), fetchStrains()]);
    renderList();
    renderTags(); // For shops
    setupListeners();
}

async function fetchShops() {
    try {
        const res = await fetch(`${API_URL}/shops`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            shops = data;
        } else {
            console.error('Detailed shop data:', data);
            throw new Error('API did not return an array');
        }
    } catch (err) {
        console.error('Fetch shops error:', err);
        alert('Failed to load shops: ' + err.message);
    }
}

async function fetchGuides() {
    try {
        const res = await fetch(`${API_URL}/guides`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            guides = data;
        } else {
            console.error('Detailed guide data:', data);
            throw new Error('API did not return an array');
        }
    } catch (err) {
        console.error('Fetch guides error:', err);
        alert('Failed to load guides: ' + err.message);
    }
}

// [NEW]
async function fetchStrains() {
    try {
        const res = await fetch(`${API_URL}/strains`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            strains = data;
        } else {
            console.error('Detailed strain data:', data);
            throw new Error('API did not return an array');
        }
    } catch (err) {
        console.error('Fetch strains error:', err);
        alert('Failed to load strains: ' + err.message);
    }
}

// --- Tabs Logic ---
function switchTab(tab) {
    currentTab = tab;

    // Reset UI Classes
    tabs.shops.className = 'flex-1 py-2 text-sm font-bold text-gray-500 hover:text-green-600';
    tabs.guides.className = 'flex-1 py-2 text-sm font-bold text-gray-500 hover:text-green-600';
    tabs.strains.className = 'flex-1 py-2 text-sm font-bold text-gray-500 hover:text-green-600';

    containers.shopSearch.classList.add('hidden');
    containers.guideActions.classList.add('hidden');
    containers.strainActions.classList.add('hidden');

    containers.shopList.classList.add('hidden');
    containers.guideList.classList.add('hidden');
    containers.strainList.classList.add('hidden');

    // Activate specific tab
    if (tab === 'shops') {
        tabs.shops.className = 'flex-1 py-2 text-sm font-bold text-green-600 border-b-2 border-green-600';
        containers.shopSearch.classList.remove('hidden');
        containers.shopList.classList.remove('hidden');
    } else if (tab === 'guides') {
        tabs.guides.className = 'flex-1 py-2 text-sm font-bold text-blue-600 border-b-2 border-blue-600';
        containers.guideActions.classList.remove('hidden');
        containers.guideList.classList.remove('hidden');
    } else if (tab === 'strains') {
        tabs.strains.className = 'flex-1 py-2 text-sm font-bold text-purple-600 border-b-2 border-purple-600';
        containers.strainActions.classList.remove('hidden');
        containers.strainList.classList.remove('hidden');
    }

    // Reset Selection
    selectedShopId = null;
    selectedGuideId = null;
    selectedStrainSlug = null;
    containers.shopEditor.classList.add('hidden');
    containers.guideEditor.classList.add('hidden');
    containers.strainEditor.classList.add('hidden');
    containers.emptyState.classList.remove('hidden');

    isFilteringDuplicates = false;
    updateDuplicateButtonState();

    renderList();
}

function updateDuplicateButtonState() {
    const btn = document.getElementById('findDuplicatesBtn');
    if (!btn) {
        return;
    }
    if (isFilteringDuplicates) {
        btn.classList.add('bg-yellow-200', 'ring-2', 'ring-yellow-400');
        btn.textContent = 'Show All Shops';
    } else {
        btn.classList.remove('bg-yellow-200', 'ring-2', 'ring-yellow-400');
        btn.textContent = 'Find Duplicate Addresses';
    }
}

// --- Rendering Lists ---
function renderList() {
    if (currentTab === 'shops') renderShopList();
    else if (currentTab === 'guides') renderGuideList();
    else renderStrainList();
}

function renderShopList() {
    containers.shopList.innerHTML = '';
    let shopsToRender = [];

    if (isFilteringDuplicates) {
        // Group by normalized address
        const groups = {};
        shops.forEach(shop => {
            if (!shop.address) return;
            const key = shop.address.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
            if (!groups[key]) groups[key] = [];
            groups[key].push(shop);
        });

        // Filter for duplicates
        shopsToRender = Object.values(groups)
            .filter(group => group.length > 1)
            .flat()
            .sort((a, b) => {
                const addrA = a.address.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
                const addrB = b.address.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
                return addrA.localeCompare(addrB);
            });

        if (shopsToRender.length === 0) {
            containers.shopList.innerHTML = '<div class="p-4 text-center text-gray-500">No duplicate addresses found!</div>';
            return;
        }

    } else {
        const query = document.getElementById('search').value.toLowerCase();
        shopsToRender = shops.filter(shop => shop.name.toLowerCase().includes(query));
    }

    // Apply Amsterdam Filter
    const amsterdamOnly = document.getElementById('filterAmsterdam').checked;
    if (amsterdamOnly) {
        shopsToRender = shopsToRender.filter(shop => shop.location && shop.location.toLowerCase() === 'amsterdam');
    }

    // Sort Alphabetically
    shopsToRender.sort((a, b) => a.name.localeCompare(b.name));

    shopsToRender.forEach(shop => {
        const div = document.createElement('div');
        div.className = `p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selectedShopId === shop.id ? 'bg-green-50 border-l-4 border-green-500' : ''}`;
        div.onclick = () => selectShop(shop.id);
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="font-medium text-gray-800">${shop.name}</span>
                ${shop.coraxApproved ? '<span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Approved</span>' : ''}
            </div>
            <div class="text-xs text-gray-500 mt-1">${shop.location}</div>
            <div class="text-xs text-gray-400 mt-0.5">${shop.address || 'No Address'}</div>
        `;
        containers.shopList.appendChild(div);
    });
}

function renderGuideList() {
    containers.guideList.innerHTML = '';

    guides.forEach(guide => {
        const div = document.createElement('div');
        div.className = `p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selectedGuideId === guide.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`;
        div.onclick = () => selectGuide(guide.id);
        div.innerHTML = `
            <div class="font-medium text-gray-800">${guide.title}</div>
            <div class="text-xs text-gray-500 mt-1">${guide.slug}</div>
        `;
        containers.guideList.appendChild(div);
    });
}

// [NEW]
function renderStrainList() {
    containers.strainList.innerHTML = '';

    strains.forEach(strain => {
        const div = document.createElement('div');
        div.className = `p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selectedStrainSlug === strain.slug ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`;
        div.onclick = () => selectStrain(strain.slug);
        div.innerHTML = `
            <div class="font-medium text-gray-800">${strain.name}</div>
            <div class="text-xs text-gray-500 mt-1">${strain.slug}</div>
        `;
        containers.strainList.appendChild(div);
    });
}

// --- Selection Logic ---
function selectShop(id) {
    selectedShopId = id;
    renderShopList();
    containers.emptyState.classList.add('hidden');
    containers.shopEditor.classList.remove('hidden');
    containers.guideEditor.classList.add('hidden');
    containers.strainEditor.classList.add('hidden');
    populateShopEditor(shops.find(s => s.id === id));
}

function selectGuide(id) {
    selectedGuideId = id;
    renderGuideList();
    containers.emptyState.classList.add('hidden');
    containers.shopEditor.classList.add('hidden');
    containers.guideEditor.classList.remove('hidden');
    containers.strainEditor.classList.add('hidden');
    populateGuideEditor(guides.find(g => g.id === id));
}

// [NEW]
function selectStrain(slug) {
    selectedStrainSlug = slug;
    renderStrainList();
    containers.emptyState.classList.add('hidden');
    containers.shopEditor.classList.add('hidden');
    containers.guideEditor.classList.add('hidden');
    containers.strainEditor.classList.remove('hidden');
    populateStrainEditor(strains.find(s => s.slug === slug));
}


// --- Editors (Shops) ---
function populateShopEditor(shop) {
    if (!shop) return;

    document.getElementById('editName').textContent = shop.name;
    document.getElementById('editId').textContent = `ID: ${shop.id}`;

    setValue('inputName', shop.name);
    setValue('inputLocation', shop.location);
    setValue('inputAddress', shop.address);
    setValue('inputLat', shop.coordinates[0]);
    setValue('inputLng', shop.coordinates[1]);
    setValue('inputImage', shop.image);
    setValue('inputDescription', shop.description);
    setValue('inputDetailedReview', shop.detailedReview || '');
    document.getElementById('editApproved').checked = !!shop.coraxApproved;
    document.getElementById('previewImage').src = shop.image;

    // Tags
    const currentTags = shop.tags || [];
    document.querySelectorAll('.tag-checkbox').forEach(cb => {
        cb.checked = currentTags.includes(cb.value);
    });
}

// --- Editors (Guides) ---
function populateGuideEditor(guide) {
    if (!guide) return;

    setValue('guideTitle', guide.title);
    setValue('guideSlug', guide.slug);
    setValue('guideH1', guide.h1);
    setValue('guideIntro', guide.intro);
    setValue('guideMetaDesc', guide.metaDescription);
    document.getElementById('guideDate').textContent = guide.datePublished || 'Draft';

    // Sections
    const sectionsContainer = document.getElementById('sectionsContainer');
    sectionsContainer.innerHTML = '';
    (guide.sections || []).forEach((section, idx) => {
        addSectionToDOM(section, idx);
    });

    // Stats
    const statsContainer = document.getElementById('statsContainer');
    statsContainer.innerHTML = '';
    (guide.sidebarStats || []).forEach((stat, idx) => {
        addStatToDOM(stat, idx);
    });
}

// [NEW] --- Editors (Strains) ---
function populateStrainEditor(strain) {
    if (!strain) return;

    document.getElementById('editStrainName').textContent = strain.name;

    setValue('strainName', strain.name);
    setValue('strainSlug', strain.slug);
    setValue('strainDescriptor', strain.descriptor);
    setValue('strainH1', strain.h1);
    setValue('strainIntro', strain.intro);
    setValue('strainInputImage', strain.image);
    document.getElementById('strainPreviewImage').src = strain.image || '/images/hero_bud.png';

    // Quick Facts
    const factsContainer = document.getElementById('factsContainer');
    factsContainer.innerHTML = '';
    if (strain.quickFacts) {
        Object.entries(strain.quickFacts).forEach(([key, value]) => {
            addFactToDOM(key, value);
        });
    }

    // Sections
    const sectionsContainer = document.getElementById('strainSectionsContainer');
    sectionsContainer.innerHTML = '';
    (strain.sections || []).forEach((section, idx) => {
        addStrainSectionToDOM(section, idx);
    });
}

function addSectionToDOM(section = { title: '', content: '' }, index) {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-4 rounded border relative group';
    div.innerHTML = `
        <button class="delete-section absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100" data-idx="${index}">×</button>
        <input type="text" class="section-title w-full p-2 border rounded mb-2 font-bold" placeholder="Section Title" value="${section.title || ''}">
        <textarea class="section-content w-full p-2 border rounded text-sm h-32" placeholder="Markdown content...">${section.content || ''}</textarea>
    `;

    // Bind events
    div.querySelector('.section-title').oninput = (e) => updateSection(index, 'title', e.target.value);
    div.querySelector('.section-content').oninput = (e) => updateSection(index, 'content', e.target.value);
    div.querySelector('.delete-section').onclick = () => deleteSection(index);

    document.getElementById('sectionsContainer').appendChild(div);
}

function addStatToDOM(stat = { label: '', value: '' }, index) {
    const div = document.createElement('div');
    div.className = 'flex space-x-2 items-center group';
    div.innerHTML = `
        <input type="text" class="stat-label w-1/3 p-1 text-xs border rounded" placeholder="Label" value="${stat.label || ''}">
        <input type="text" class="stat-value flex-1 p-1 text-xs border rounded font-mono" placeholder="Value" value="${stat.value || ''}">
        <button class="delete-stat text-red-500 opacity-0 group-hover:opacity-100 text-xs" data-idx="${index}">×</button>
    `;

    div.querySelector('.stat-label').oninput = (e) => updateStat(index, 'label', e.target.value);
    div.querySelector('.stat-value').oninput = (e) => updateStat(index, 'value', e.target.value);
    div.querySelector('.delete-stat').onclick = () => deleteStat(index);

    document.getElementById('statsContainer').appendChild(div);
}

// [NEW]
function addFactToDOM(key, value) {
    const div = document.createElement('div');
    div.className = 'flex space-x-2 items-center group mb-2';
    div.innerHTML = `
        <input type="text" class="fact-key w-1/3 p-1 text-xs border rounded font-bold" placeholder="Key" value="${key || ''}">
        <input type="text" class="fact-value flex-1 p-1 text-xs border rounded" placeholder="Value" value="${value || ''}">
        <button class="delete-fact text-red-500 opacity-0 group-hover:opacity-100 text-xs">×</button>
    `;

    // Because quickFacts is an object, updates are a bit trickier (key changes mean re-assignment).
    // For simplicity, we'll rebuild the object on every change or just update specialized state logic.
    // Let's attach listeners that call a specific updated helper.

    // We bind the current element reference to the update logic
    div.querySelector('.fact-key').onchange = () => updateStrainFacts();
    div.querySelector('.fact-value').onchange = () => updateStrainFacts();
    div.querySelector('.delete-fact').onclick = () => { div.remove(); updateStrainFacts(); };

    document.getElementById('factsContainer').appendChild(div);
}

// [NEW]
function addStrainSectionToDOM(section = { title: '', content: '' }, index) {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 p-4 rounded border relative group';
    div.innerHTML = `
        <button class="delete-strain-section absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100" data-idx="${index}">×</button>
        <input type="text" class="section-title w-full p-2 border rounded mb-2 font-bold" placeholder="Section Title" value="${section.title || ''}">
        <textarea class="section-content w-full p-2 border rounded text-sm h-32" placeholder="Markdown content...">${section.content || ''}</textarea>
    `;

    div.querySelector('.section-title').oninput = (e) => updateStrainSection(index, 'title', e.target.value);
    div.querySelector('.section-content').oninput = (e) => updateStrainSection(index, 'content', e.target.value);
    div.querySelector('.delete-strain-section').onclick = () => deleteStrainSection(index);

    document.getElementById('strainSectionsContainer').appendChild(div);
}


// --- Updates (State Management) ---

// Shops
function updateShopState(key, value) {
    const shop = shops.find(s => s.id === selectedShopId);
    if (!shop) return;

    if (key === 'coordinates') {
        const lat = parseFloat(document.getElementById('inputLat').value);
        const lng = parseFloat(document.getElementById('inputLng').value);
        shop.coordinates = [lat, lng];
    } else if (key === 'tags') {
        shop.tags = Array.from(document.querySelectorAll('.tag-checkbox:checked')).map(cb => cb.value);
    } else {
        shop[key] = value;
    }

    if (key === 'name') document.getElementById('editName').textContent = value;
}

// Guides
function updateGuideState(key, value) {
    const guide = guides.find(g => g.id === selectedGuideId);
    if (!guide) return;
    guide[key] = value;
    if (key === 'title') renderGuideList(); // Refresh list title
}

function updateSection(index, field, value) {
    const guide = guides.find(g => g.id === selectedGuideId);
    if (!guide.sections[index]) guide.sections[index] = {};
    guide.sections[index][field] = value;
}

function deleteSection(index) {
    const guide = guides.find(g => g.id === selectedGuideId);
    guide.sections.splice(index, 1);
    populateGuideEditor(guide);
}

function updateStat(index, field, value) {
    const guide = guides.find(g => g.id === selectedGuideId);
    if (!guide.sidebarStats[index]) guide.sidebarStats[index] = {};
    guide.sidebarStats[index][field] = value;
}

function deleteStat(index) {
    const guide = guides.find(g => g.id === selectedGuideId);
    guide.sidebarStats.splice(index, 1);
    populateGuideEditor(guide);
}

// [NEW] Strains
function updateStrainState(key, value) {
    const strain = strains.find(s => s.slug === selectedStrainSlug);
    if (!strain) return;
    strain[key] = value;
    if (key === 'name') {
        document.getElementById('editStrainName').textContent = value;
        renderStrainList();
    }
}

function updateStrainFacts() {
    const strain = strains.find(s => s.slug === selectedStrainSlug);
    if (!strain) return;

    // Rebuild object from DOM
    const newFacts = {};
    document.querySelectorAll('#factsContainer > div').forEach(div => {
        const k = div.querySelector('.fact-key').value.trim();
        const v = div.querySelector('.fact-value').value.trim();
        if (k) newFacts[k] = v;
    });
    strain.quickFacts = newFacts;
}

function updateStrainSection(index, field, value) {
    const strain = strains.find(s => s.slug === selectedStrainSlug);
    if (!strain.sections[index]) strain.sections[index] = {};
    strain.sections[index][field] = value;
}

function deleteStrainSection(index) {
    const strain = strains.find(s => s.slug === selectedStrainSlug);
    strain.sections.splice(index, 1);
    populateStrainEditor(strain);
}


function createNewGuide() {
    const newGuide = {
        id: 'new-guide-' + Date.now(),
        slug: 'new-guide',
        title: 'New Guide',
        h1: 'New Guide Header',
        intro: '',
        metaDescription: '',
        datePublished: new Date().toISOString().split('T')[0],
        sections: [],
        sidebarStats: []
    };
    guides.push(newGuide);
    selectGuide(newGuide.id);
}

// --- Listeners ---
function setupListeners() {
    // Tabs
    tabs.shops.onclick = () => switchTab('shops');
    tabs.guides.onclick = () => switchTab('guides');
    tabs.strains.onclick = () => switchTab('strains'); // [NEW]

    // Search
    document.getElementById('search').addEventListener('input', () => {
        isFilteringDuplicates = false; // Reset duplicate filter on search
        updateDuplicateButtonState();
        renderList();
    });

    // Amsterdam Filter
    document.getElementById('filterAmsterdam').addEventListener('change', () => {
        renderList();
    });

    // Find Duplicates
    document.getElementById('findDuplicatesBtn').onclick = () => {
        isFilteringDuplicates = !isFilteringDuplicates;
        updateDuplicateButtonState();
        renderList();
    };

    // Guide Actions
    document.getElementById('addGuideBtn').onclick = createNewGuide;
    document.getElementById('addSectionBtn').onclick = () => {
        const guide = guides.find(g => g.id === selectedGuideId);
        guide.sections.push({ title: '', content: '' });
        populateGuideEditor(guide); // Re-render to show new section
    };
    document.getElementById('addStatBtn').onclick = () => {
        const guide = guides.find(g => g.id === selectedGuideId);
        if (!guide.sidebarStats) guide.sidebarStats = [];
        guide.sidebarStats.push({ label: '', value: '' });
        populateGuideEditor(guide);
    };

    // [NEW] Strain Actions
    document.getElementById('addFactBtn').onclick = () => {
        addFactToDOM('', '');
    }
    document.getElementById('addStrainSectionBtn').onclick = () => {
        const strain = strains.find(s => s.slug === selectedStrainSlug);
        if (!strain.sections) strain.sections = [];
        strain.sections.push({ title: '', content: '' });
        populateStrainEditor(strain);
    }


    // Delete Shop
    document.getElementById('deleteShopBtn').onclick = (e) => {
        if (e) e.preventDefault();
        if (!selectedShopId) return;

        if (confirm('Are you sure you want to delete this shop? This cannot be undone until you save.')) {
            // Use String() to ensure type safety ensuring we don't miss matches
            shops = shops.filter(s => String(s.id) !== String(selectedShopId));

            selectedShopId = null;

            // UI Updates
            containers.shopEditor.classList.add('hidden');
            containers.emptyState.classList.remove('hidden');

            // Re-render
            renderList();

            // If in duplicate mode, verify if we still have duplicates
            updateDuplicateButtonState();
        }
    };

    // Shop Inputs
    bindInput('inputName', (v) => updateShopState('name', v));
    bindInput('inputLocation', (v) => updateShopState('location', v));
    bindInput('inputAddress', (v) => updateShopState('address', v));
    bindInput('inputDescription', (v) => updateShopState('description', v));
    bindInput('inputDetailedReview', (v) => updateShopState('detailedReview', v));
    bindInput('inputLat', () => updateShopState('coordinates'));
    bindInput('inputLng', () => updateShopState('coordinates'));
    bindInput('inputImage', (v) => updateShopState('image', v));

    document.getElementById('editApproved').addEventListener('change', (e) => updateShopState('coraxApproved', e.target.checked));

    // Guide Inputs
    bindInput('guideTitle', (v) => updateGuideState('title', v));
    bindInput('guideSlug', (v) => updateGuideState('slug', v));
    bindInput('guideH1', (v) => updateGuideState('h1', v));
    bindInput('guideIntro', (v) => updateGuideState('intro', v));
    bindInput('guideMetaDesc', (v) => updateGuideState('metaDescription', v));

    // [NEW] Strain Inputs
    bindInput('strainName', (v) => updateStrainState('name', v));
    bindInput('strainSlug', (v) => updateStrainState('slug', v));
    bindInput('strainDescriptor', (v) => updateStrainState('descriptor', v));
    bindInput('strainH1', (v) => updateStrainState('h1', v));
    bindInput('strainIntro', (v) => updateStrainState('intro', v));
    bindInput('strainInputImage', (v) => updateStrainState('image', v));

    // Image Upload
    document.getElementById('uploadImage').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.path) {
                document.getElementById('inputImage').value = data.path;
                document.getElementById('previewImage').src = data.path;
                updateShopState('image', data.path);
            }
        } catch (err) { alert('Upload failed'); }
    });

    // [NEW] Strain Image Upload
    document.getElementById('uploadStrainImage').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
            const data = await res.json();
            if (data.path) {
                document.getElementById('strainInputImage').value = data.path;
                document.getElementById('strainPreviewImage').src = data.path;
                updateStrainState('image', data.path);
            }
        } catch (err) { alert('Upload failed'); }
    });

    // Save
    saveBtn.onclick = async () => {
        saveBtn.textContent = 'Saving...';
        saveBtn.disabled = true;
        try {
            // Save ALL
            await fetch(`${API_URL}/shops`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(shops) });
            await fetch(`${API_URL}/guides`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(guides) });
            await fetch(`${API_URL}/strains`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(strains) }); // [NEW]
            alert('Saved successfully!');
            renderList();
        } catch (err) {
            alert('Save failed: ' + err.message);
        } finally {
            saveBtn.textContent = 'Save All Changes';
            saveBtn.disabled = false;
        }
    };
}

function bindInput(id, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', (e) => handler(e.target.value));
}

function setValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val === undefined ? '' : val;
}

// Shop Tags
function renderTags() {
    const container = document.getElementById('tagsContainer');
    const tags = ["Top Pick", "Tourist Friendly", "Local Favorite", "Quality Focus", "Good Prices", "Unique Vibe", "Historic"];
    container.innerHTML = '';
    tags.forEach(tag => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 cursor-pointer';
        label.innerHTML = `<input type="checkbox" value="${tag}" class="tag-checkbox w-4 h-4 text-blue-600 rounded"><span class="text-sm text-gray-700">${tag}</span>`;
        label.querySelector('input').addEventListener('change', () => updateShopState('tags'));
        container.appendChild(label);
    });
}

init();
