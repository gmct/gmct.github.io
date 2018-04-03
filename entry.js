var ao5 = ['2x2', '3x3', '4x4', 'Square-1', 'Clock', '3x3OH', 'Pyraminx', 'Skewb', '2GEN', 'LSE', 'COLL', '5x5', 'Megaminx', '3x3 Mirror Blocks', 'F2L', 'Kilominx', '4x4 OH', '3x3x4', '3x3x5', 'Void Cube', '3x3 with Feet', '3x3x2'];
var mo3 = ['6x6', '7x7'];
var bo3 = ['3BLD', 'FMC'];
var json = window.location.href.split("selected=")[1];
var selected = JSON.parse(decodeURIComponent(json));
var commentText = "";
function convert(input) {
    var parts = input.split(':'),
        minutes = +parts[0],
        seconds = +parts[1];
    return (minutes * 60 + seconds);
}
function mean3(times){
    return ((times[0] + times[1] + times[2])/3).toFixed(2);
}
function meanOf3(times){
    var compare = [];
    for(var i = 0; i < times.length; i++){
        if(times[i].indexOf(':') > 0){
            compare.push(parseFloat(convert(times[i])));
        }
        else{
            compare.push(parseFloat(times[i]));
        }
    }
    var average = ((compare[0] + compare[1] + compare[2])/3).toFixed(2);
    if (average >= 60){
        return Math.trunc(average/60).toString() + ':' + (average%60).toFixed(2).toString();
    }
    return average;
}
function best3(times){
    var compare = [];
    for(var i = 0; i < times.length; i++){
        if(times[i].indexOf(':') > 0){
            compare.push(parseFloat(convert(times[i])));
        }
        else{
            compare.push(parseFloat(times[i]));
        }
    }
    var fastest = compare[0];
    for (var i = 0; i < 3; i++){
        if (compare[i] < fastest){
            fastest = compare[i];
        }
    }
    if (fastest >= 60){
        return Math.trunc(fastest/60).toString() + ':' + (fastest%60).toFixed(2).toString();
    }
    return fastest.toFixed(2);
}
function average5(times){
    var compare = [];
    for(var i = 0; i < times.length; i++){
        if(times[i].indexOf(':') > 0){
            compare.push(convert(times[i]));
        }
        else{
            compare.push(parseFloat(times[i]));
        }
    }
    var fastest = compare[0], slowest = compare[0];
    for(var i = 0; i < compare.length; i++){
        if (compare[i] < fastest){
            fastest = compare[i];
        } else if (compare[i] > slowest){
            slowest = compare[i];
        }
    }
    compare.splice(compare.indexOf(fastest), 1);
    compare.splice(compare.indexOf(slowest), 1);
    var average = mean3(compare);
    if (average >= 60){
        return Math.trunc(average/60).toString() + ':' + (average%60).toFixed(2).toString();
    }
    return average;
}
var container = document.getElementById('selected');
function createRow(name){
    var otherContainer = document.createElement("div");
    var eventName = document.createElement("p");
    eventName.appendChild(document.createTextNode(name));
    eventName.style="display:inline-block";
    otherContainer.appendChild(eventName);
    if (ao5.indexOf(name) > -1){
        for(var i = 0; i < 5; i++){
            var input = document.createElement('input');
            input.id = name + i.toString();
            input.type = "text";
            input.style = "display:inline-block";
            otherContainer.appendChild(input);
        }
    }
    if (mo3.indexOf(name) > -1){
        for(var i = 0; i < 3; i++){
            var input = document.createElement('input');
            input.id = name + i.toString();
            input.type = "text";
            input.style = "display:inline-block";
            otherContainer.appendChild(input);
        }
    }
    if (bo3.indexOf(name) > -1){
        for(var i = 0; i < 3; i++){
            var input = document.createElement('input');
            input.id = name + i.toString();
            input.type = "text";
            input.style = "display:inline-block";
            otherContainer.appendChild(input);
        }
    }
    return otherContainer;
}
for (var i = 0; i < selected.length; i++){
    container.appendChild(createRow(selected[i]));
}
function scoreEvents(){
    for (var i = 0; i < selected.length; i++){
        var eventTimes = [];
        var name = selected[i];
        if (ao5.indexOf(name) > -1){
            for(var j = 0; j < 5; j++){
                eventTimes.push(document.getElementById(name + j.toString()).value);
            }
            commentText += "**" + name + ": " + average5(eventTimes) + "** " + eventTimes.toString() + "\n\n";
        }
        else if (mo3.indexOf(name) > -1){
            for(var j = 0; j < 3; j++){
                eventTimes.push(document.getElementById(name + j.toString()).value);
            }
            commentText += "**" + name + ": " + meanOf3(eventTimes) + "** " + eventTimes.toString() + "\n\n";
        }
        else if (bo3.indexOf(name) > -1){
            for(var j = 0; j < 3; j++){
                eventTimes.push(document.getElementById(name + j.toString()).value);
            }
            commentText += "**" + name + ": " + best3(eventTimes) + "** " + eventTimes.toString() + "\n\n";
        }
    }
}
document.getElementById('finish').onclick=function() {
    scoreEvents();
    document.getElementById('comment').appendChild(document.createTextNode(commentText));
};