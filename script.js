const selectDom = (element) => document.querySelector(element);

const siteName = selectDom("#siteName");
const createNewBtn = selectDom('#createNew');
const modalOverlay = selectDom('#modalOverlay');
const createTaskBtn = selectDom('#createTaskBtn');

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
const priorityList = ['High', 'Medium', 'Low'];

let boards = [
    {
        boardId: 1,
        boardName: "To Do",
        boardItems: []
    },
    {
        boardId: 2,
        boardName: "In Progress",
        boardItems: []
    },
    {
        boardId: 3,
        boardName: "Completed",
        boardItems: []
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
const getFormattedDate = () => {
    const currentDate = new Date();

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = currentDate.toLocaleString('en-US', options);

    const finalFormattedDate = formattedDate.replace(',', ' •');

    return finalFormattedDate;
}

const addTask = () => {
    const taskTitle = selectDom('#taskTitle').value;
    const taskDescription = selectDom('#taskDescription').value;
    const taskPriority = selectDom('#taskPriority').value;
    if (taskTitle && taskPriority) {
        let item = {
            itemId: boards[0]?.boardItems.length + 1 ?? 0,
            title: taskTitle,
            description: taskDescription,
            priority: taskPriority,
            created_at: getFormattedDate()
        }

        // adding data in local storage 
        boards[0].boardItems.push(item);
        localStorage.setItem('board', JSON.stringify(boards));

        selectDom('#taskDescription').value = "";
        selectDom('#taskTitle').value = "";
        selectDom('#taskPriority').value = "";

        closeModal();
        renderBoard();
    }
    else {
        alert('Title & Description Must Be Requied');
        return false;
    }
}

const addNewBoard = () => {
    const NewBoardObj = {
        boardId: boards.length + 1,
        boardName: "Rename Board Here",
        boardItems: []
    }
    boards.push(NewBoardObj);
    localStorage.setItem('board', JSON.stringify(boards)) // saving in again local storage 
    renderBoard();
}


const renderBoard = () => {
    let HtmlUI = boards.map((board, index) => {
        return `
            <div class="bg-white rounded-lg shadow-md p-4 kanban-column board" id="board-${board.boardId}" data-id="${index}">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-bold text-gray-800 board-name" data-boardId="${index}" onClick="this.contentEditable='true';" >${board.boardName}</h2>
                            <div class="flex gap-2">
                                <button class="card-action-btn hover:text-gray-600 p-1 rounded-full board-delete cursor-pointer" data-boardIndex="${index}">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                                <span
                                    class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full card-count">${board.boardItems.length}
                                Tasks</span>
                            </div>
                    </div>
                    ${board.boardItems.map((item, itemIndex) => {
            return `<div class="kanban-card mb-3 rounded-lg overflow-hidden border border-gray-200 cursor-move" draggable="true" data-id="${item.itemId}" data-itemIndex="${itemIndex}" data-boardIndex="${index}">
                        <div class="${getRandomBgColorClass()} text-white p-2 flex justify-between items-center card-header-sine">
                            <div class="flex items-center">
                                <span class="font-medium">${item.title}</span>
                            </div>
                            <div class="flex space-x-1">
                               <!-- <button class="card-action-btn text-white hover:text-gray-200 p-1 rounded-full">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                        </path>
                                    </svg>
                                </button> -->
                                <button class="card-action-btn text-white hover:text-gray-200 p-1 rounded-full item-delete cursor-pointer" data-itemIndex="${itemIndex}" data-boardIndex="${index}">
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
                                    <span class="text-xs text-gray-500">${priorityList[item.priority]}</span>
                                </div>
                                <span class="text-xs text-gray-500 whitespace-nowrap">${item.created_at}</span>
                            </div>
                        </div>
                    </div>`
        }).join('')}
                </div>
            `;
    }).join('') + `<!-- add new Board -->
                    <div class="bg-white rounded-lg shadow-md p-4 kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-bold text-gray-800">Add New Board</h2>
                        </div>


                        <div class="kanban-card mb-3 rounded-lg overflow-hidden border border-gray-200">
                            <div class="add-new-card flex flex-col justify-center items-center cursor-pointer" id="addNewBoard">
                                <div class="text-3xl">
                                    +
                                    </svg>
                                </div>
                                <div>Create New Board</div>
                            </div>
                        </div>
                    </div>`;
    selectDom('#MainContentContainer').innerHTML = HtmlUI;

    document.querySelectorAll('.kanban-card').forEach((card) => {
        card.addEventListener('dragstart', (e) => {
            e.target.classList.add('flying');
        });
        card.addEventListener('dragend', (e) => {
            e.target.classList.remove('flying');
        });
    })

    document.querySelectorAll('.board').forEach((selectedBoard) => {
        selectedBoard.addEventListener('dragover', (dragedBoard) => {
            const flyingElement = selectDom('.flying');
            selectedItemsId = flyingElement.getAttribute('data-id'); // item index
            selectedItemsIndex = flyingElement.getAttribute('data-itemIndex'); // items index
            flyingBoardIndex = flyingElement.getAttribute('data-boardIndex'); // fling board items
            selectedBoardIndex = dragedBoard.target.getAttribute('data-id'); // board index
            dragedBoard.target.appendChild(flyingElement);
            selectedItemsJSONData = boards[flyingBoardIndex].boardItems[selectedItemsIndex];
            boards[selectedBoardIndex].boardItems.push(selectedItemsJSONData); // setting items in new position in board variable & local storage 
            // removed selected items 
            boards[flyingBoardIndex].boardItems.splice(selectedItemsIndex, 1);
            localStorage.setItem('board', JSON.stringify(boards)) // saving in again local storage 
            renderBoard();
        })
    })

    // delete items 
    document.querySelectorAll('.item-delete').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (e) => {
            itemIndex = e.currentTarget.getAttribute('data-itemindex');
            boardIndex = e.currentTarget.getAttribute('data-boardindex');
            boards[boardIndex]?.boardItems.splice(itemIndex, 1);
            localStorage.setItem('board', JSON.stringify(boards)) // saving in again local storage 
            renderBoard();
        })
    })
    // calling create new board 
    selectDom('#addNewBoard').addEventListener('click', addNewBoard);

    // saveing board name 
    document.querySelectorAll('.board-name').forEach((element) => {
        element.addEventListener('focusout', (e) => {
            e.currentTarget.contentEditable = 'false';
            let textValue = e.currentTarget.textContent;
            const boardId = e.currentTarget.getAttribute('data-boardId');
            boards[boardId].boardName = textValue;
            localStorage.setItem('board', JSON.stringify(boards)) // saving in again local storage 
        })
    })

    // delete Board
    document.querySelectorAll('.board-delete').forEach((element)=>{
        element.addEventListener('click',(e)=>{
            let boardindex = e.currentTarget.getAttribute('data-boardIndex');
            boards.splice(boardindex,1);
            localStorage.setItem('board', JSON.stringify(boards)) // saving in again local storage 
            renderBoard();
        })
    })
}

// setting site name if present in local storage
window.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('siteName');
    if (storedName) {
        siteName.textContent = storedName;
        document.title = storedName;
    }

    // checking is board is not in local staorage than set it 
    if (localStorage.getItem('board')) boards = JSON.parse(localStorage.getItem('board') ?? '[]')
    else localStorage.setItem('board', JSON.stringify(boards));

    renderBoard();
});

// Event listeners
siteName.addEventListener('focusout', saveSiteName);
createNewBtn.addEventListener('click', openModal);
createTaskBtn.addEventListener('click', addTask);

closeModal();