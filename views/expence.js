let form = document.getElementById('my-form');
let list = document.getElementById('users');
let list1 = document.getElementById('users1');
let list2 = document.getElementById('users2');

let id;

//after refresh take all data from server to UI
window.addEventListener('DOMContentLoaded', async () => {
    try {
        let promise = await axios.get("http://localhost:4000/expense/get-expense");
        // console.log(promise.data.allExpenses)
        promise.data.allExpenses.forEach((ele) => {
            showNewUserOnscreen(ele);
        })
    } catch (err) {
        console.log(err);
    }
})



form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();
    // console.log('add item');

    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let categary = document.getElementById('categary').value;


    if (amount == "" && description == "" && categary == "categary") {
        return alert('all field is empty' + "\n" + 'please fill the details !!!');
    } else if (amount == "") {
        return alert('amount field is empty' + "\n" + 'please fill amount !!!');
    } else if (description == "") {
        return alert('description field is empty' + "\n" + 'please fill description !!!');
    } else if (categary == "categary") {
        return alert('categary field is empty' + "\n" + 'please select categary !!!');
    }

    let obj = {
        amount,
        description,
        categary
    }
    async function modifyList() {
        try {
            let promise;
            if (id) {
                //if expense exist then update expense.
                console.log(id);
                promise = await axios.post(`http://localhost:4000/expense/update-expense/${id}`, obj);
                updateExpenseOnScreen(id, promise.data.newExpenseDetail);
            } else {
                //if expense doesn't exist then create a new expense.
                promise = await axios.post("http://localhost:4000/expense/add-expense", obj);
                showNewUserOnscreen(promise.data.newExpenseDetail);
            }
            // console.log(promise.data.newExpenseDetail);

        } catch (err) {
            document.body.innerHTML += "<h4>Something went wrong !</h4>";
            console.log(err);
        }
        return;
    }
    modifyList();
}

//delete item event
list.addEventListener('click', removeItem);
list1.addEventListener('click', removeItem);
list2.addEventListener('click', removeItem);
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            li = e.target.parentElement;
            let id = li.dataset.id;
            // id=400;
            deleteData(id, li);
        }
    }
}

//function for deleting data from server as well as UI.
deleteData = async (id, li) => {
    try {
        await axios.delete(`http://localhost:4000/expense/delete-expense/${id}`);
        window.location.reload();
    } catch (error) {
        console.log(error);
        document.body.innerHTML += "<h4>Something went wrong !</h4>";
    }
}

//edit item event
list.addEventListener('click', editItem);
list1.addEventListener('click', editItem);
list2.addEventListener('click', editItem);
function editItem(e) {
    if (e.target.classList.contains('edit')) {
        // console.log('edit');
        li = e.target.parentElement;
        let amt = li.childNodes[0].textContent;
        let dis = li.childNodes[2].textContent;
        let ctg = li.childNodes[4].textContent;


        let amount = document.getElementById('amount');
        let description = document.getElementById('description');
        let categary = document.getElementById('categary');

        id = li.dataset.id;

        // //deleting the data from server as well as UI.
        // deleteData(id, li);

        amount.value = amt;
        description.value = dis;
        categary.value = ctg;
    }
}

//function for to add delete and edit button.
function delEdit(li) {
    let del = document.createElement('button');
    del.appendChild(document.createTextNode('Delete Expence'));
    del.className = 'delete btn btn-danger';
    let edit = document.createElement('button');
    edit.className = 'edit btn btn-primary';
    edit.appendChild(document.createTextNode('Edit Expence'));
    li.appendChild(del);
    li.appendChild(edit);
}


//for display list on screen
function showNewUserOnscreen(obj) {
    let li = document.createElement('li');
    li.className = 'ulList';
    li.setAttribute('data-id', obj.id);

    li.appendChild(document.createTextNode(obj.amount));
    li.appendChild(document.createTextNode("--"));
    li.appendChild(document.createTextNode(obj.description));
    li.appendChild(document.createTextNode("--"));
    li.appendChild(document.createTextNode(obj.categary));
   
    
    if(obj.categary=='Electronicitem'){
        list.appendChild(li);
    }
    else if(obj.categary=='food'){
        list1.appendChild(li);
    }
    else if(obj.categary=='skin'){
        list2.appendChild(li);
    }
    //make empty all details for new user 
    let val = document.querySelector('#amount');
    let val2 = document.querySelector('#description');
    let val3 = document.querySelector('#categary');
    val.value = null;
    val2.value = null;
    val3.value = 'categary';

    //delete and edit button creating.
    delEdit(li);
    // if(obj.categary.value=='Electronicitem'){
    //     list.appendChild(li);
    // }
    // else{
    //     list1.appendChild(li);
    // }
    
    // list2.appendChild(li);
}


//updating the list after editing data.
updateExpenseOnScreen = (id, obj) => {
    let li = document.getElementsByTagName('li');
    Array.from(li).forEach(ele => {
        if (id == ele.dataset.id) {
            // console.log(ele);
            ele.childNodes[0].textContent = obj.amount;
            ele.childNodes[2].textContent = obj.description;
            ele.childNodes[4].textContent = obj.categary;

            //make empty all details for new user 
            let val = document.querySelector('#amount');
            let val2 = document.querySelector('#description');
            let val3 = document.querySelector('#categary');
            val.value = null;
            val2.value = null;
            val3.value = 'categary';
        }
    })
}


