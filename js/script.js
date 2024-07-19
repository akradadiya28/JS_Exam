
let taskD = document.getElementById("task");
let list = document.getElementById("list");

let isEdit = false;
let isIndex;

let getData = () => {

    let data = JSON.parse(localStorage.getItem('tasks'));
    // console.log(data);

    if (data) {
        return data;
    } else {
        return [];
    }
}

let storage = getData();

const formData = () => {

    event.preventDefault();

    let taskData = {
        id: isIndex ? isIndex : Math.floor(Math.random() * 100 + 1),
        task: taskD.value
    }
    console.log(taskData);

    if (isEdit) {
        let update = [...storage];

        let updateData = update.map((rec) => {
            if (rec.id == isIndex) {
                return taskData;
            } else {
                return rec;
            }
        })
        storage = updateData;

        isEdit = false;
        isIndex = undefined;

    } else {
        storage = [...storage, taskData];
    }

    taskD.value = "";
    localStorage.setItem('tasks', JSON.stringify(storage));

    viewData();

}

const viewData = () => {

    list.innerHTML = "";

    storage.forEach((rec) => {
        list.innerHTML += ` <li class="p-2 rounded-lg">
                        <div class="flex align-middle flex-row justify-between">
                        <div class="p-2">
                                    <input type="checkbox" class="h-6 w-6 " value="true"/>
                                </div>
                            <div class="p-2">
                                <p class="text-lg text-black">${rec.task}</p>
                            </div>
                            <div class="flex">
                                <button class="flex text-green-500 border-2 border-green-500 p-2 rounded-lg mr-3" onclick="return editData(${rec.id})">
                                    <span>Edit <i class="bi bi-pencil-square"></i></span>
                                </button>
                                <button class="flex text-red-500 border-2 border-red-500 p-2 rounded-lg" onclick="return deleteData(${rec.id})">
                                    <span>Remove <i class="bi bi-trash"></i></span></span>
                                </button>
                            </div>
                        </div>
                        <hr class="mt-2" />
                    </li>`
    });
}
viewData();

const editData = (id) => {

    let record = [...storage];

    let singleRec = record.filter((rec) => {
        return rec.id == id;
    })

    taskD.value = singleRec[0].task;

    isEdit = true;
    isIndex = id;
}

const deleteData = (id) => {

    let record = [...storage];

    let deleteRecord = record.filter((rec) => {
        return rec.id != id;
    })

    localStorage.setItem('tasks', JSON.stringify(deleteRecord));
    storage = getData();
    viewData();

}