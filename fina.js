

var fs = require("fs");
var file = fs.readFileSync('Census.csv');
var file1 = fs.readFileSync('IndiaSC2011.csv');
var file2 = fs.readFileSync('IndiaST2011.csv');


var Age,litr,tot,Elp,Ebelow,Epri,Emid,Esec,Ehigh, Enon,Etech,Egrad ,Euncla;
var obj={};
var obj1={};


var i=0,j=0;

function code (file) {
  var stringData=file.toString();
  var arrayOne= stringData.split('\r\n');
  var header=arrayOne[0].split(',');
 //console.log(header);
  Age = header.indexOf('Age-group');
  litr = header.indexOf('Literate - Persons');
  tot=header.indexOf('Total/ Rural/ Urban');
  //console.log(lit);
  Elp = header.indexOf('Educational level - Literate without educational level - Persons');
  Ebelow = header.indexOf('Educational level - Below Primary - Persons');
  Epri = header.indexOf('Educational level - Primary - Persons');
  Emid = header.indexOf('Educational level - Middle - Persons');
  Esec = header.indexOf('Educational level - Matric/Secondary - Persons');
  Ehigh = header.indexOf('Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons');
  Enon = header.indexOf('Educational level - Non-technical diploma or certificate not equal to degree - Persons');
  Etech = header.indexOf('Educational level - Technical diploma or certificate not equal to degree - Persons');
  Egrad = header.indexOf('Educational level - Graduate & above - Persons');
  Euncla = header.indexOf('Educational level - Unclassified - Persons');


  for (i = 1; i < arrayOne.length-1; i++) {
     var line=arrayOne[i].split(',');
    // console.log(line);


  if((line[Age] != '0-6') && (line[tot] == 'Total') && (line[Age] != 'All ages')&& (line[Age] != 'Age not stated') )
  {
    if(obj[line[Age]]==undefined)
    {
      obj[line[Age]]=parseInt(line[litr]);
    }
      //obj[line[lit]]=line[lit];
else{
    obj[line[Age]]+=parseInt(line[litr]);
  }
}


if(obj1[header[Elp]]==undefined && obj1[header[Ebelow]]==undefined && obj1[header[Epri]]==undefined && obj1[header[Emid]]==undefined &&obj1[header[Esec]]==undefined && obj1[header[Ehigh]]==undefined
       && obj1[header[Enon]]==undefined && obj1[header[Etech]]==undefined && obj1[header[Egrad]]==undefined && obj1[header[Euncla]]==undefined)
     {
       obj1[header[Elp]]=0;
       obj1[header[Ebelow]]=0;
       obj1[header[Epri]]=0;
       obj1[header[Emid]]=0;
       obj1[header[Esec]]=0;
       obj1[header[Ehigh]]=0;
       obj1[header[Enon]]=0;
       obj1[header[Etech]]=0;
       obj1[header[Egrad]]=0;
       obj1[header[Euncla]]=0;
     }

     if(line[Age] =='All ages' && line[tot]=='Total')
     {

         obj1[header[Elp]]+=parseInt(line[Elp]);
         obj1[header[Ebelow]]+=parseInt(line[Ebelow]);
         obj1[header[Epri]]+=parseInt(line[Epri]);
         obj1[header[Emid]]+=parseInt(line[Emid]);
         obj1[header[Esec]]+=parseInt(line[Esec]);
         obj1[header[Ehigh]]+=parseInt(line[Ehigh]);
         obj1[header[Enon]]+=parseInt(line[Enon]);
         obj1[header[Etech]]+=parseInt(line[Etech]);
         obj1[header[Egrad]]+=parseInt(line[Egrad]);
         obj1[header[Euncla]]+=parseInt(line[Euncla]);

     }


}
}  //function data
code(file);
code(file1);
code(file2);


var Array3=[];
for(property in obj1)
{
  var obj3={};
  obj3.category=property;
  obj3.value=obj1[property];
  Array3.push(obj3);

}
//console.log(Array3);

var fin=[];
fin1=Object.keys(obj);
//console.log(1.length);
for(i=0;i<fin1.length;i++)
{
  a={};
  a["Age-group"]=fin1[i];
  fina=fin1[i];
  a["Literates"]=obj[fina];
  fin.push(a);
}
//console.log(c);

var b1=JSON.stringify(fin);
fs.writeFile('literate.json', b1,'utf8', function (err){
 if (err) throw err;
});

var file = 'Education.json';

var obj = JSON.stringify(Array3);

fs.writeFileSync(file, obj);
