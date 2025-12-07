let shops = [];
let selectedShopId = null;

const API_URL = 'http://localhost:3001/api';

const availableTags = [
    "Top Pick",
    "Tourist Friendly",
    "Local Favorite",
    "Quality Focus",
    "Good Prices",
    "Unique Vibe",
    "Historic"
];

// Elements
const shopListEl = document.getElementById('shopList');
const searchEl = document.getElementById('search');
const editorEl = document.getElementById('editor');
const emptyStateEl = document.getElementById('emptyState');
const saveBtn = document.getElementById('saveBtn');
const tagsContainer = document.getElementById('tagsContainer');

// Inputs
const inputs = {
    name: document.getElementById('inputName'),
    location: document.getElementById('inputLocation'),
    address: document.getElementById('inputAddress'),
    lat: document.getElementById('inputLat'),
    lng: document.getElementById('inputLng'),
    image: document.getElementById('inputImage'),
    description: document.getElementById('inputDescription'),
    detailedReview: document.getElementById('inputDetailedReview'),
    approved: document.getElementById('editApproved')
};

const previewImage = document.getElementById('previewImage');
const uploadInput = document.getElementById('uploadImage');

// Init
async function init() {
    try {
        const res = await fetch(`${API_URL}/shops`);
        shops = await res.json();
        renderList();
        renderTags();
    } catch (err) {
        alert('Failed to load shops: ' + err.message);
    }
}

function renderTags() {
    tagsContainer.innerHTML = '';
    availableTags.forEach(tag => {
        const label = document.createElement('label');
        label.className = 'flex items-center space-x-2 cursor-pointer';
        label.innerHTML = `
            <input type="checkbox" value="${tag}" class="tag-checkbox w-4 h-4 text-blue-600 rounded">
            <span class="text-sm text-gray-700">${tag}</span>
        `;
        tagsContainer.appendChild(label);

        // Add listener
        label.querySelector('input').addEventListener('change', updateState);
    });
}

// Render List
function renderList() {
    const query = searchEl.value.toLowerCase();
    shopListEl.innerHTML = '';

    shops.forEach(shop => {
        if (shop.name.toLowerCase().includes(query)) {
            const div = document.createElement('div');
            div.className = `p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selectedShopId === shop.id ? 'selected' : ''}`;
            div.onclick = () => selectShop(shop.id);

            div.innerHTML = `
                <div class="flex justify-between items-center">
                    <span class="font-medium text-gray-800">${shop.name}</span>
                    ${shop.coraxApproved ? '<span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Approved</span>' : ''}
                </div>
                <div class="text-xs text-gray-500 mt-1">${shop.location}</div>
            `;
            shopListEl.appendChild(div);
        }
    });
}

// Select Shop
function selectShop(id) {
    selectedShopId = id;
    const shop = shops.find(s => s.id === id);
    if (!shop) return;

    // UI Toggle
    editorEl.classList.remove('hidden');
    emptyStateEl.classList.add('hidden');
    renderList(); // Update selection style

    // Populate Fields
    document.getElementById('editName').textContent = shop.name;
    document.getElementById('editId').textContent = `ID: ${shop.id}`;

    inputs.name.value = shop.name;
    inputs.location.value = shop.location;
    inputs.address.value = shop.address;
    inputs.lat.value = shop.coordinates[0];
    inputs.lng.value = shop.coordinates[1];
    inputs.image.value = shop.image;
    inputs.description.value = shop.description;
    inputs.detailedReview.value = shop.detailedReview || '';
    inputs.approved.checked = !!shop.coraxApproved;

    previewImage.src = shop.image;

    // Populate Tags
    const currentTags = shop.tags || [];
    document.querySelectorAll('.tag-checkbox').forEach(cb => {
        cb.checked = currentTags.includes(cb.value);
    });
}

// Update Local State on Input
function updateState() {
    if (!selectedShopId) return;
    const shop = shops.find(s => s.id === selectedShopId);

    shop.name = inputs.name.value;
    shop.location = inputs.location.value;
    shop.address = inputs.address.value;
    shop.coordinates = [parseFloat(inputs.lat.value), parseFloat(inputs.lng.value)];
    shop.image = inputs.image.value;
    shop.description = inputs.description.value;
    shop.detailedReview = inputs.detailedReview.value;
    shop.coraxApproved = inputs.approved.checked;

    // Update Tags
    const selectedTags = [];
    document.querySelectorAll('.tag-checkbox:checked').forEach(cb => {
        selectedTags.push(cb.value);
    });
    shop.tags = selectedTags;

    // Update header immediately
    document.getElementById('editName').textContent = shop.name;
}

// Add listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', updateState);
});

searchEl.addEventListener('input', renderList);

// Image Upload
uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (data.path) {
            inputs.image.value = data.path;
            previewImage.src = data.path;
            updateState();
        }
    } catch (err) {
        alert('Upload failed: ' + err.message);
    }
});

// Save All
saveBtn.addEventListener('click', async () => {
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        const res = await fetch(`${API_URL}/shops`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shops)
        });

        if (res.ok) {
            alert('Saved successfully!');
            renderList(); // Refresh badges
        } else {
            alert('Save failed!');
        }
    } catch (err) {
        alert('Error saving: ' + err.message);
    } finally {
        saveBtn.textContent = 'Save All Changes';
        saveBtn.disabled = false;
    }
});

init();
