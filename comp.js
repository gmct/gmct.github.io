var events = ["2x2", "3x3", "4x4", "3BLD", "Square-1", "Clock", "3x3OH", "Pyraminx", "Skewb", "2GEN", "LSE", "COLL"];
var weeklyRotation = ["5x5", "7x7", "Megaminx"];
var bonusEvents = ["3x3 Mirror Blocks/Bump", "F2L", "6x6", "Kilominx", "4x4 OH", "3x3x4", "3x3x5", "Void Cube", "2-3-4 Relay", "FMC", "3x3 With Feet", "3x3x2", "3x3 Relay of 3", "PLL Time Attack"];
var selectedEvents = [];

function makeCheckList(array) {
    // Create the list element:
    var checkList = document.createElement('div');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var container = document.createElement("div");
        //container.align="center";
        var check = document.createElement('input');
        check.setAttribute("type", "checkbox");
        var item = document.createElement('label');
        // Set its contents:
        check.setAttribute("id", array[i]);
        item.appendChild(document.createTextNode(array[i]));
        item.setAttribute("for", array[i]);
        container.appendChild(check);
        container.appendChild(item);
        // Add it to the list:
        checkList.appendChild(container);
    }

    // Finally, return the constructed list.
    return checkList;
}

function getSelected(){
    for(var i = 0; i < events.length; i++){
        if (document.getElementById(events[i]).checked){
            selectedEvents.push(events[i]);
        }
    }
    for(var i = 0; i < weeklyRotation.length; i++){
        if (document.getElementById(weeklyRotation[i]).checked){
            selectedEvents.push(weeklyRotation[i]);
        }
    }
    for(var i = 0; i < bonusEvents.length; i++){
        if (document.getElementById(bonusEvents[i]).checked){
            selectedEvents.push(bonusEvents[i]);
        }
    }
}
// Add the contents of options[0] to #foo:
console.info(JSON.stringify(weeklyRotation));
document.getElementById('weekly').appendChild(makeCheckList(events));
document.getElementById('cycle').appendChild(makeCheckList(weeklyRotation));
document.getElementById('bonus').appendChild(makeCheckList(bonusEvents));
document.getElementById('enterTimes').onclick = function() {getSelected();
                                                           location.href="timeEntry.html?selected="+JSON.stringify(selectedEvents);};
