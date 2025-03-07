const selectDom = (element) => document.querySelector(element);

let siteName = selectDom("#siteName");
let createNewBtn = selectDom('#createNew');
let modalOverlay = selectDom('#modalOverlay');
const bgColorList = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-rose-500",
];

let boards = [
    {
        boardId: 1,
        boardName: "To Do",
        tasks: 2,
        boardItems: [
            {
                itemId: 1,
                title: "Design Homepage",
                description: "Create the main homepage design with responsive layout.",
                priority: 3,
                created_at: "Mar 6, 2025 • 10:45 AM"
            },
            {
                itemId: 1,
                title: "Research Competitors",
                description: "Analyze competitor products and identify market gaps.",
                priority: 2,
                created_at: "Mar 6, 2025 • 10:45 AM"
            },

        ]
    },
    {
        boardId: 2,
        boardName: "In Progress",
        tasks: 2,
        boardItems: [
            {
                itemId: 1,
                title: "Database Schema",
                description: "Design database schema for user management and task tracking.",
                priority: 3,
                created_at: "Mar 6, 2025 • 10:45 AM"
            },
            {
                itemId: 1,
                title: "API Integration",
                description: "Integrate third-party authentication API and payment gateway.",
                priority: 0,
                created_at: "Mar 6, 2025 • 10:45 AM"
            },

        ]
    },
    {
        boardId: 3,
        boardName: "Completed",
        tasks: 1,
        boardItems: [
            {
                itemId: 1,
                title: "User Research",
                description: "Conduct user interviews and analyze feedback for product requirements.",
                priority: 3,
                created_at: "Mar 6, 2025 • 10:45 AM"
            },
        ]
    },
]

const saveSiteName = (e) => {
    e.target.contentEditable = 'false';
    let textValue = e.target.textContent;
    document.title = textValue;
    localStorage.setItem('siteName', textValue);
}

const openModal = () => {
    modalOverlay.classList.add('active');

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

const closeModal = () => {
    modalOverlay.classList.remove('active');
}

const getRandomBgColorClass = () => {
    return bgColorList[Math.floor(Math.random() * bgColorList.length)];

}

const renderBoard = () => {
    let HtmlUI = boards.map((board) => {
        return `
            <div class="bg-white rounded-lg shadow-md p-4 kanban-column">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-bold text-gray-800">${board.boardName}</h2>
                        <span
                            class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full card-count">${board.tasks}
                            Tasks</span>
                    </div>
                    ${board.boardItems.map((item) => {
            return `<div class="kanban-card mb-3 rounded-lg overflow-hidden border border-gray-200">
                        <div class="${getRandomBgColorClass()} text-white p-2 flex justify-between items-center card-header-sine">
                            <div class="flex items-center">
                                <span class="font-medium">${item.title}</span>
                            </div>
                            <div class="flex space-x-1">
                                <button class="card-action-btn text-white hover:text-gray-200 p-1 rounded-full">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                        </path>
                                    </svg>
                                </button>
                                <button class="card-action-btn text-white hover:text-gray-200 p-1 rounded-full">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="p-3 bg-white">
                            <p class="text-sm text-gray-600">${item.description}</p>
                            <div class="flex justify-between items-center mt-3">
                                <div class="flex items-center">
                                    <span class="priority-dot bg-red-500" title="${item.priority} Priority"></span>
                                    <span class="text-xs text-gray-500">${item.priority}</span>
                                </div>
                                <span class="text-xs text-gray-500 whitespace-nowrap">${item.created_at}</span>
                            </div>
                        </div>
                    </div>`
        }).join('')}

                     <!-- add new Board -->
                    <div class="bg-white rounded-lg shadow-md p-4 kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-gray-800">Add New Board</h2>
                        </div>


                        <div class="kanban-card mb-3 rounded-lg overflow-hidden border border-gray-200">
                            <div class="add-new-card flex flex-col justify-center items-center cursor-pointer">
                                <div class="text-3xl">
                                    +
                                    </svg>
                                </div>
                                <div>Create New Board</div>
                            </div>
                        </div>
                    </div>

                </div>
            `;
    }).join('');
    selectDom('#MainContentContainer').innerHTML = HtmlUI;
}

// setting site name if present in local storage
window.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('siteName');
    if (storedName) {
        siteName.textContent = storedName;
        document.title = storedName;
    }
    renderBoard();
});

// Event listeners
siteName.addEventListener('focusout', saveSiteName);
createNewBtn.addEventListener('click', openModal);

closeModal();