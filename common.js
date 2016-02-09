$(document).ready(function() {
    $("[id^=slider]").slider();
    $("#slider0").slider("value", 50);
    $("#slider1").slider("value", 50);
    $("#slider2").slider("value", 50);
    $("#slider3").slider("value", 50);
    $("#slider4").slider("value", 50);
    $("#slider5").slider("value", 50);
});

function createSocket() {

    var socket = io();

    socket.on('error', function(data) {
        addMessage('ERROR');
    });

    socket.on('data', function(data) {
        addMessage(data);
    });

    function addMessage(message) {
        var komorka = message.split(";", 3);
        var resultsTable = document.getElementById('table');

        //usuwanie ostatniego wiersza
        for (var i = 2; i < resultsTable.rows.length;) {
            resultsTable.deleteRow(i);
        }

        var row = resultsTable.insertRow(2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = komorka[0];
        cell2.innerHTML = komorka[1];
        cell3.innerHTML = komorka[2];
    }
}