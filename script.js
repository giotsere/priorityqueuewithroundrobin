var taskAmount = document.getElementById("taskAmount");
var arrivalTime = document.getElementsByClassName("arrivalTime");
var processTime = document.getElementsByClassName("processTime");
var taskPriority = document.getElementsByClassName("taskPriority");
var taskID = document.getElementsByClassName("taskID");
var ok = document.getElementById("ok");
var gnrt = document.getElementById("gnrt");
var btnBuildTable = document.getElementById("buildTable");
var dataDiv = document.getElementById("data");
var pArt = document.getElementById("art");
var pAtt = document.getElementById("att");
var taskA;
var rrArray = [];
var btn = 0;
var okBtn = 0;
var rng = 0;
var c = 0;

ok.addEventListener("click",() =>{
    if(okBtn == 0){
        if(taskAmount.value == ""){
            alert("Δωσε Aριθμο!");
        }else{
            createDiv();
        }
    }else{
        clearEverything();
        createDiv();
    }
});

gnrt.addEventListener("click",() =>{
    if(rng = 0){
        rngDiv();
        rngValues();
    }else{
        clearEverything();
        rngDiv();
        rngValues();
    }
});

btnBuildTable.addEventListener("click",() =>{
    let i;
    let alert = 0;
    if(btn == 0){
        for(i = 0;i < taskAmount.value;i++){
            if(taskID[i].innerHTML == "" || arrivalTime[i].value == "" || processTime[i].value == ""){
                alert = 1;
            }
        }
        if(alert == 1){
            window.alert("field empty");
        }else{
            build();
            roundRobin(); 
            checkRoundRobin();
        }
    }
});

function createDiv(){
    formsDiv = document.getElementById("forms");
    
    let i;
    for (i = 1; i <= taskAmount.value;i++){
        let newForm = document.createElement("form");
        newForm.className = "tasks";   
        newForm.innerHTML = "<h4 class='taskID'>Δ"+ [i] + "</h4>"
        newForm.innerHTML += '<p>Χρονος Αφιξης</p><input type="text" class="arrivalTime">'
        newForm.innerHTML += '<p>Χρονος Καταιγισμου</p><input type="text" class="processTime">'
        let newSelect = document.createElement("select");
        newSelect.className = "taskPriority";
        newSelect.innerHTML = '<p>Προτεραιοτητα</p><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>'
        newForm.appendChild(newSelect);
        formsDiv.appendChild(newForm);
        btnBuildTable.style.display = "block";
        okBtn = 1;
        rng = 1;
        c = 0;
        btn = 0;
    }  
}

function clearEverything(){
    let form = document.getElementById("forms");
    let data = document.getElementById("data");
    let avg = document.getElementsByClassName("avg");
    form.innerHTML = "";
    data.innerHTML = "";
    avg[0].style.display = "none";
    avg[1].style.display = "none";
    avg[0].innerText = "Average Response Time =";
    avg[1].innerText = "Average Turnaround Time =";
    collection = [];
    responseTime = [];
    rrArray = [];
    artSum = 0;
    art = 0;
    attSum = 0;
    att = 0;
    executeTime = 0;
}

function rngDiv(){
    formsDiv = document.getElementById("forms");
    taskA = Math.floor(Math.random() * (11 - 1) + 1);
    taskAmount.value = taskA;
    
    let i;
    for (i = 1; i <= taskA;i++){
        let newForm = document.createElement("form");
        newForm.className = "tasks";   
        newForm.innerHTML = "<h4 class='taskID'>Δ"+ [i] + "</h4>"
        newForm.innerHTML += '<p>Χρονος Αφιξης</p><input type="text" class="arrivalTime">'
        newForm.innerHTML += '<p>Χρονος Καταιγισμου</p><input type="text" class="processTime">'
        let newSelect = document.createElement("select");
        newSelect.className = "taskPriority";
        newSelect.innerHTML = '<p>Προτεραιοτητα</p><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>'
        newForm.appendChild(newSelect);
        formsDiv.appendChild(newForm);
        btnBuildTable.style.display = "block";
        rng = 1;
        okBtn = 1;
        c = 1;
        btn = 0;
    }  
}

function rngValues(){
    let i;
    Math.floor(Math.random() * (10 - 1) + 1);
    let tasks = document.getElementsByClassName("tasks")
    for(i = 0;i < tasks.length;i++){
        arrivalTime[i].value = Math.floor(Math.random() * (8 - 1) + 1);
        processTime[i].value = Math.floor(Math.random() * (8 - 1) + 1);
        taskPriority[i].value = Math.floor(Math.random() * (8 - 1) + 1);

    }
}

function buildTable(){
    var table = document.createElement("table");
    table.id = "table";
    dataDiv.appendChild(table);
    var tr;
    tr = document.createElement("tr");
    tr.id = "time-parent";
    table.appendChild(tr);

    var timeParent = document.getElementById("time-parent");

    tr = document.createElement("tr");
    tr.id = "priority";
    table.appendChild(tr);


    tr = document.createElement("tr")
    tr.className = "task";
    table.appendChild(tr);

    var th;
    var td;
    var task;
    var priority;
    
    let i;
    for (i = 0;i < rrArray.length;i++){
        th = document.createElement("th");
        th.className = "task-number";
        th.innerText += rrArray[i][0];
        timeParent.appendChild(th);

        td = document.createElement("td");
        td.className = "priority";
        td.innerText += "P" + rrArray[i][3];
        priority = document.getElementById("priority");
        priority.appendChild(td);


        td = document.createElement("td");
        td.className = "completed";
        td.innerText += rrArray[i][2];

        task = document.getElementsByClassName("task");
        task[0].appendChild(td);
    }
}

let collection = [];

function priorityQueue () {
    this.enqueue = (element) =>{
        if (collection.length === 0){
            collection.push(element);
        }else{
            var added = false;
            let i;
            for (i = 0; i < collection.length; i++){
                if (element[3] < collection[i][3]){
                    collection.splice(i,0,element);
                    added = true;
                    break;
                }else if(element[3] == collection[i][3]){
                    if(element[1] < collection[i][1]){
                        collection.splice(i,0,element);
                        added = true;
                        break;
                    }
                }
            }
            if (!added){
                collection.push(element);
            }
        }
    };
}

var pq = new priorityQueue();

function build(){
    let i;
    if(c == 1){
        for(i = 0;i < taskA; i++){
            pq.enqueue([taskID[i].innerText,arrivalTime[i].value,processTime[i].value,taskPriority[i].value]);
        }   
    }else{
        for(i = 0;i < taskAmount.value; i++){
            pq.enqueue([taskID[i].innerText,arrivalTime[i].value,processTime[i].value,taskPriority[i].value]);
        }  
    }
    btn = 1;
}

var responseTime = [];


function roundRobin(){
    let i,j,k;
    let tempArray = [];
    let total = 0;
    let count;
    let deleteArr = [];
    const it = collection.length;

    for(j = 0; j < it;j++){
        if(collection.length <= 0){
            break;
        }

        deleteArr.length = 0;
        tempArray.length = 0;
        count = 0;
        total = 0;

        for (i = 0;i < collection.length;i++){
            if(i != collection.length - 1){
                if(collection[i][3] == collection[i+1][3]){
                    tempArray[count] = collection[i];
                    deleteArr.push(i);
                    count++;
                }else if(count > 0){
                    if(collection[i][3] == tempArray[count-1][3]){
                        tempArray[count] = collection[i];
                        deleteArr.push(i);
                        
                        break;
                    }
                }
            }else{
                if((count > 0)){
                    if(collection[i][3] == tempArray[count-1][3]){
                        tempArray[count] = collection[i];
                        deleteArr.push(i);
                        
                        break;
                    }
                }
            }
        }
    
        if(tempArray.length == 0){
            break;
        }

        let num = deleteArr[0];
        collection.splice(num,deleteArr.length);
        
        for (i = 0; i < tempArray.length;i++){
            total += parseInt(tempArray[i][2]);
        }
        
        let b = 0;
        let clock = parseInt(tempArray[0][1]);

        while(total > 0){
            if(total < 0){
                break;
            }
            
            for(i = 0;i < tempArray.length;i++){
                if(clock < tempArray[i][1]){
                    break;
                }
            
                if(i != tempArray.length - 1){
                    if(rrArray.length > 0 && tempArray[i][3] != rrArray[0][3]){
                        if(tempArray[i][2] == 1){

                            rrArray.push(tempArray[i].slice());
                            tempArray[i][2] -= 1;
                            total -= 1;
                            clock += 1;
                        }else{
                            if(tempArray[i][2] > 0){
    
                                rrArray.push(tempArray[i].slice());
                                tempArray[i][2] -= 1;
                                total -= 1;
                                clock += 1;
                                i++;
                                
                            }
                        }
                    }
                }else{
                    if(rrArray.length > 0 && tempArray[i][3] != rrArray[0][3]){
                        if(tempArray[i][2] > 0){

                            rrArray.push(tempArray[i].slice());
                            tempArray[i][2] -= 1;
                            total -= 1;
                            clock += 1;
                            break;
                        }
                    }
                }

                if(i != tempArray.length - 1){
                    if(tempArray[i][2] <= tempArray[i+1][1] - tempArray[i][1] && i == 0){
                        for(k = 0; k < tempArray[i+1][1] - tempArray[i][1];k++){
                            if(tempArray[i][2] > 0){
    
                                rrArray.push(tempArray[i].slice());
                                tempArray[i][2] -= 1;
                                total -= 1;
                                clock += 1;
                            }
                            break;
                        }
                    }else if(tempArray[i][2] == 1){
                        rrArray.push(tempArray[i].slice());
                        tempArray[i][2] -= 1;
                        total -= 1;
                        clock += 1;
                    }else if(tempArray[i][2] > 0 && (tempArray[i+1][1] - tempArray[i][1]) != 0){
                        if(i == 0 && b == 0){
                            for(k = 0; k < tempArray[i+1][1] - tempArray[i][1];k++){
                                if(tempArray[i][2] > 0){
        
                                    rrArray.push(tempArray[i].slice());
                                    tempArray[i][2] -= 1;
                                    total -= 1;
                                    clock += 1;
                                }
                                b = 1;
                            }
                        }else if(tempArray[0][2] == 0 && tempArray[i-1][2] <= 0 && clock < tempArray[i+1][1]){
                            for(k = 0;k < tempArray[i+1][i] - clock;k++){
                                if(tempArray[i][2] > 0){
        
                                    rrArray.push(tempArray[i].slice());
                                    tempArray[i][2] -= 1;
                                    total -= 1;
                                    clock += 1;
                                }
                            }
                        }else{
                            if(tempArray[i][2] > 0){
    
                                rrArray.push(tempArray[i].slice());
                                tempArray[i][2] -= 1;
                                total -= 1;
                                clock += 1;
                            }
                        }
                    }else{
                        if(tempArray[i][2] > 0){

                            rrArray.push(tempArray[i].slice());
                            tempArray[i][2] -= 1;
                            total -= 1;
                            clock += 1;
                            break;
                        }
                    }
                }else{
                    if(tempArray[i][2] > 0){
                        rrArray.push(tempArray[i].slice());
                        tempArray[i][2] -= 1;
                        total -= 1;
                        clock += 1;
                        break;
                    }
                }
            }
        }
    }
}

function checkRoundRobin(){
    let i;
    if(rrArray.length == 0){
        for(i = 0;i < collection.length;i++){
            rrArray.push(collection[i]);
        }
        buildTable();
        avgResponseTime();
        avgTurnaroundTime();
    }else{
        buildFinalArray();
        buildTable();
    }
}

function buildFinalArray(){
    let i,j;
    if(collection.length > 0){
        for(i = 0;i < collection.length;i++){
            for(j = 0;j < rrArray.length;j++){
                if(collection[i][3] < rrArray[j][3]){
                    rrArray.splice(j,0,collection[i]);
                    break;
                }else if(rrArray[j][3] < collection[i]){
                    if(j == rrArray.length - 1){
                        rrArray.push(collection[i]);
                        break;
                    }
                }
            }
        }
    }
}

function avgResponseTime(){
    var artSum = 0;
    var art = 0;
    responseTime[0] = 0;
    var executeTime = parseInt(collection[0][2]) + parseInt(collection[0][1]);
    let i;
    for (i = 1;i < collection.length;i++){
        responseTime[i] = executeTime - parseInt(collection[i][1]);
        if(responseTime[i] < 0){
            responseTime[i] = 0;
        }

        executeTime = parseInt(collection[i][2]) + parseInt(collection[i][1]) + responseTime[i];
    }
    
    for (i = 0; i < responseTime.length;i++){
        artSum += responseTime[i];
        if(responseTime.length == 1 && i == 0){
            pArt.innerText += " (" + responseTime[i] + ") = ";
        }else if(i == responseTime.length - 1){
            pArt.innerText += " " + responseTime[i] + ") = ";
        }else if(i == 0){
            pArt.innerText += " (" + responseTime[i] + " + ";
        }else{
            pArt.innerText += " " + responseTime[i] + " + ";
        }
    }
    art = (artSum / responseTime.length).toFixed(1);
    pArt.innerText += " " + art;
    pArt.style.display = "block";
}

function avgTurnaroundTime(){
    var tAroundTime = [];
    let i;
    var attSum = 0;
    var att = 0;
    for(i = 0;i < responseTime.length;i++){
        tAroundTime[i] = responseTime[i] + parseInt(collection[i][2]);
    }
    for(i = 0;i < tAroundTime.length;i++){
        attSum += tAroundTime[i];
        if(tAroundTime.length == 1 && i == 0){
            pAtt.innerText += " (" + tAroundTime[i] + ") = ";
        }else if(i == tAroundTime.length - 1){
            pAtt.innerText += " " + tAroundTime[i] + ") = ";
        }else if(i == 0){
            pAtt.innerText += " (" + tAroundTime[i] + " + ";
        }else{
            pAtt.innerText += " " + tAroundTime[i] + " + ";
        }
    }
    att = (attSum / tAroundTime.length).toFixed(1);
    pAtt.innerText += " " + att;
    pAtt.style.display = "block";
}
