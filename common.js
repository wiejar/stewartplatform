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
        if(komorka[0]=="ERROR") {
            komorka=["","",""];
            alert("Cannot comunicate with shared memory app");
        }
        var resultsTable = document.getElementById('table');

        //usuwanie ostatniego wiersza
        for (var i = 2; i < resultsTable.rows.length;) {
            resultsTable.deleteRow(i);
        }
        
        var row = resultsTable.insertRow(2);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = komorka[0].toString().replace(",",".");
        cell2.innerHTML = komorka[1].toString().replace(",",".");
        cell3.innerHTML = komorka[2].toString().replace(",",".");
		
		var pitch = komorka[0].toString().replace(",",".");
		pitch = parseFloat(pitch);
		var roll = komorka[1].toString().replace(",",".");
		roll = parseFloat(roll);
		var yaw = komorka[2].toString().replace(",",".");
		yaw = parseFloat(yaw);
				
		var Pdw1 = [181, 20, 0];
		var Pdw2 = [181, -20, 0];
		var Pdw3 = [-73, -166, 0];
		var Pdw4 = [-107, -146, 0];
		var Pdw5 = [-107, 146, 0];
		var Pdw6 = [-73, 166, 0];
	
		var Pgw1 = [82, 103, 0];
		var Pgw2 = [82, -103, 0];	
		var Pgw3 = [48, -123, 0];
		var Pgw4 = [-131, -20, 0];
		var Pgw5 = [-131, 20, 0];
		var Pgw6 = [48, 123, 0];
		
		var macierz = math.matrix([[(math.cos(roll))*(math.cos(pitch)), (-math.cos(yaw))*(math.sin(roll))+(math.sin(yaw))*(math.sin(pitch))*(math.cos(roll)), (math.sin(yaw))*(math.sin(roll))+(math.cos(yaw))*(math.sin(pitch))*(math.cos(roll))],[(math.sin(roll))*(math.cos(pitch)), (math.cos(yaw))*(math.cos(roll))+(math.sin(yaw))*(math.sin(pitch))*(math.sin(roll)), (-math.sin(yaw))*(math.cos(roll))+(math.cos(yaw))*(math.sin(pitch))*(math.sin(roll))],[-math.sin(pitch), (math.sin(yaw))*(math.cos(pitch)), (math.cos(yaw))*(math.cos(pitch))]]); 
	
		var W1 =  math.subtract((math.multiply(macierz, Pgw1)),Pdw1);
		var W2 =  math.subtract((math.multiply(macierz, Pgw2)),Pdw2);
		var W3 =  math.subtract((math.multiply(macierz, Pgw3)),Pdw3);
		var W4 =  math.subtract((math.multiply(macierz, Pgw4)),Pdw4);
		var W5 =  math.subtract((math.multiply(macierz, Pgw5)),Pdw5);
		var W6 =  math.subtract((math.multiply(macierz, Pgw6)),Pdw6);
		
		var LS1 = math.sqrt((math.pow((W1.subset(math.index(0))),2))+(math.pow((W1.subset(math.index(1))),2))+(math.pow((W1.subset(math.index(2))),2)));
		var LS2 = math.sqrt((math.pow((W2.subset(math.index(0))),2))+(math.pow((W2.subset(math.index(1))),2))+(math.pow((W2.subset(math.index(2))),2)));
		var LS3 = math.sqrt((math.pow((W3.subset(math.index(0))),2))+(math.pow((W3.subset(math.index(1))),2))+(math.pow((W3.subset(math.index(2))),2)));
		var LS4 = math.sqrt((math.pow((W4.subset(math.index(0))),2))+(math.pow((W4.subset(math.index(1))),2))+(math.pow((W4.subset(math.index(2))),2)));
		var LS5 = math.sqrt((math.pow((W5.subset(math.index(0))),2))+(math.pow((W5.subset(math.index(1))),2))+(math.pow((W5.subset(math.index(2))),2)));
		var LS6 = math.sqrt((math.pow((W6.subset(math.index(0))),2))+(math.pow((W6.subset(math.index(1))),2))+(math.pow((W6.subset(math.index(2))),2)));
		
        $(document).ready(function() {
            $("[id^=slider]").slider();
            $("#slider0").slider("value", LS1/10);
            $("#slider1").slider("value", LS2/10);
            $("#slider2").slider("value", LS3/10);
            $("#slider3").slider("value", LS4/10);
            $("#slider4").slider("value", LS5/10);
            $("#slider5").slider("value", LS6/10);
        });
	
		var nPgw1 = math.add(Pdw1,W1);
		var nPgw2 = math.add(Pdw2,W2);
		var nPgw3 = math.add(Pdw3,W3);
		var nPgw4 = math.add(Pdw4,W4);
		var nPgw5 = math.add(Pdw5,W5);
		var nPgw6 = math.add(Pdw6,W6);
	}
	
}