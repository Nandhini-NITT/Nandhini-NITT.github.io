var sec_count,min_count,stop,timerPause=0;
var flag=0;
var memory_values=[];
var memory_tile_ids=[];
var arr=[];
var memory_random=[];
var tiles_flipped=0,moves=0,score=0,rows=0,columns=0;

window.onload=function()
{
getGrid();
}
function hide (elements) 
{
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) 
  {
		elements[index].style.display = 'none';
  }
}
function unhide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++)
  {
    elements[index].style.display = 'inline';
  }
}
function validate()
{
	rows=document.getElementById("rows").value;
	columns=document.getElementById("cols").value;
	if((rows*columns)%2!=0)
		alert("The total number of cells has to be even");
	else if(rows>7 || columns>6)
		alert("For better experience it is advisable to have maximum dimensions of 7*6");
	else if(rows==7)
		{
		hide(document.getElementById("header"));
		random_assign();
		alert("Generating Table");
		hide(document.getElementById("get-values"));
		generate_board();
		new_board();
		timer_initialiser();
		}
	else
		{
		random_assign();
		alert("Generating Table");
		hide(document.getElementById("get-values"));
		generate_board();
		new_board();
		timer_initialiser();
		}
}
		
function getGrid()
{	
	hide(document.getElementById("wrapper"));
	unhide(document.getElementById("get-values"));
	document.getElementById("get-values").innerHTML="<h1>Dimensions &nbsp Of  &nbsp Grid</h1>"
	document.getElementById("get-values").innerHTML+="<input type='text' placeholder='Rows' id='rows'>";
	document.getElementById("get-values").innerHTML+="<input type='text' placeholder='Columns' id='cols'>";
	document.getElementById("get-values").innerHTML+="<button onClick='validate()'>Submit</button>";
}
	
function generate_board()
{	var k=1;
	unhide(document.getElementById("wrapper"));
	var table="<table id='game-board'> ";
	for(var i=0;i<parseInt(rows);i++)
		{
		table+="<tr>";
			for(var j=0;j<parseInt(columns);j++)
				{
				table+='<td id="'+k+'"><img src="tile.jpg"></td>';
				k++;
				}
		table+="</tr>";
		}
	table+="</table>";
	document.getElementById("wrapper").innerHTML=table;
}

function new_board()
{
	table = document.getElementById("game-board");
	if (table != null) 
	{
		for (var i = 0; i < table.rows.length; i++) 
		{
			for (var j = 0; j < table.rows[i].cells.length; j++)
			{
				table.rows[i].cells[j].onclick = function () 
				{
					if(timerPause==0)
					{
					moves++;
					memoryFlipTile(this);
					}
				}
			table.rows[i].cells[j].innerHTML="<img src='tile.jpg'><p id='number'>"
		}
	}
}
}
function pause_timer()
{
	clearInterval(stop);
	timerPause=1;
}
function timer_initialiser()
{	
	if(rows*columns/2==2)
		{
		sec_count=15;
		min_count=0;
		}
	else if(rows*columns/2==3)
		{
		sec_count=30;
		min_count=0;
		}
	else if(rows*columns/2==4)
		{
		sec_count=45;
		min_count=0;
		}
	else if(rows*columns/2==5)
		{
		sec_count=0;
		min_count=1;
		}
	else if(rows*columns/2==6)
		{
		sec_count=15;
		min_count=1;
		}
	else if(rows*columns/2==7)
		{
		sec_count=30;
		min_count=1;
		}
	else if(rows*columns/2==8)
		{
		sec_count=45;
		min_count=1;
		}
	else if(rows*columns/2==9)
		{
		sec_count=0;
		min_count=2;
		}
	else 
		{
		sec_count=0;
		min_count=2;
		}
	document.getElementById("min").innerHTML=("0"+min_count).slice(-2);
	document.getElementById("sec").innerHTML=("0"+sec_count).slice(-2);
	main_timer();
}
function replay()
{
	score=0;
	moves=0;
	arr=[];
	memory_random=[];
	memory_values = [];
	memory_tile_ids = [];
	tiles_flipped=0;
	pause_timer();
	getGrid();
}
function main_timer()
{
	timerPause=0;	
	clearInterval(stop);
	stop=setInterval(function(){
	if(sec_count==0 && min_count>0)
	{
		min_count-=1;
		sec_count=59;
	}
	else if(min_count==0 && sec_count==0)
	{
		alert("Game Over... Score "+score+" number of moves"+moves);
		replay();
	}
	else 
		sec_count--;
	document.getElementById("min").innerHTML=(min_count>=0 && min_count<10)?('0'+min_count):min_count;
	document.getElementById("sec").innerHTML=(sec_count>=0 && sec_count<10)?('0'+sec_count):sec_count;
	},1000);
}

function memoryFlipTile(tile)
{	
	var a=arr.indexOf(parseInt(tile.id));
	var b=Math.floor(a/2);
	if(memory_values.length < 2)
	{	
		tile.innerHTML=memory_random[b];
		if(memory_values.length == 0)
		{
		    memory_values.push(memory_random[b]);
			memory_tile_ids.push(tile.id);
		} 
		else if(memory_values.length == 1)
		{
			memory_values.push(memory_random[b]);
			memory_tile_ids.push(tile.id);
				if(memory_values[0] == memory_values[1] && memory_tile_ids[0]!=memory_tile_ids[1])
				{	score++;
					tiles_flipped += 2;
				// Clear both arrays
					memory_values = [];
					
					memory_tile_ids = [];
					
						tile.onclick = function () 
						{
						;
						}
					
							
				// Check to see if the whole board is cleared
					if(tiles_flipped == (rows*columns))
					{
						alert("Board cleared... Score"+score+" number of moves"+moves/2);
						replay();

					}
				}	 
				else 
				{
					function flip2Back()
				{
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.innerHTML="<img src='tile.jpg' style='display:table-cell'>";
				    tile_2.innerHTML = "<img src='tile.jpg' style='display:table-cell'>";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}
		
		

function removeChar(possible,rand1)
{
	var pos=possible.indexOf(rand1);
	var part1=possible.slice(0,pos);
	var part2=possible.slice(pos+1,possible.length);
	possible=part1.concat(part2);
	return possible;
		
}

function random_assign()
{	
	var possible="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	while(arr.length < (rows*columns))
	{
		var randomnumber=Math.floor(Math.random()*(rows*columns))+1;
		var found=false;
		for(var i=0;i<arr.length;i++)
		{
			if(arr[i]==randomnumber)
			{found=true;
			break;}
		}
		if(!found)
		arr[arr.length]=randomnumber;
	}
	for(var i=0;i<((rows*columns)/2);i++)
		{
		var rand1=possible.charAt(Math.floor(Math.random()*possible.length));
		possible=removeChar(possible,rand1);
		memory_random[i]=rand1;
		}
}
