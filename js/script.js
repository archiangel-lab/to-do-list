{
    const welcome = () => {
        console.log("Witaj! Zapraszam do sprawdzenie mojej pracy. Dziękuję za wszelkie uwagi i wskazówki :)");
    }

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const hideDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const completeAll = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let HTMLContent = "";

        for (const task of tasks) {
            HTMLContent += `
          <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
            <button class="list__button list__button--done js-done">
              ${task.done ? "✓" : ""}
            </button>
            <p class=" ${task.done ? "list__item--done" : ""}">${task.content}</p>
            <button class="list__button list__button--remove js-remove">
             🗑
            </button>
          </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = HTMLContent;
    };

    const renderButtons = () => {
        let HTMLContent = "";

        if (tasks.length) {
            HTMLContent = `
                <button class="buttons__button js-hideDoneTasks">
                  ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="buttons__button buttons__button--disabled js-completeAll" ${tasks.every(({ done }) => done) ? "disabled"
                    : ""}>
                  Ukończ wszystkie
                </button>
            `;
        }

        document.querySelector(".js-buttons").innerHTML = HTMLContent;
    };

    const bindButtonsEvents = () => {
        const hideDoneTasks = document.querySelector(".js-hideDoneTasks");
        if (hideDoneTasks) {

            hideDoneTasks.addEventListener("click", () => {
                hideDone();
            });
        }

        const ToggleDoneEvents = document.querySelector(".js-completeAll");
        if (hideDoneTasks) {
            ToggleDoneEvents.addEventListener("click", () => {
                completeAll();
            });
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskObject = document.querySelector(".js-newTask");
        const newTaskContent = newTaskObject.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskObject.value = "";
        }

        newTaskObject.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        welcome();
    };

    init();
}