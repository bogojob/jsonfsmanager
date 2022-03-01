const express = require('express')
const app = express();
const dotenv = require('dotenv');
const httpServer = require('http').createServer(app);
dotenv.config({ path: './config.env' });
const JSONFS = require('./JsonFsClass');
const jsondoc = require('./jsondoc')

//import JSONFS from './JsonFsClass';
/* model file system document */
//import jsondoc from './jsondoc.json';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



httpServer.listen(process.env.PORT, () => {
  console.log(`server listen on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
}
);




app.get('/add', async (req, res) => {

  const toFind = req.body.nodeid;
  const userid = req.body.userid;
  console.log('id target=>' + toFind)
  console.log('userid target=>' + req.body.userid)




  let jfs = new JSONFS(toFind);


  await jfs.locate(userid, jsondoc);

  const doc = jfs.getLocateNode();
  const filesystemsize = doc.filesystem.size;
const nodes = doc.filesystem.nodes;


jfs = new JSONFS(toFind);

  //const jfs = new JSONFS(toFind);
  const payload = {

    "_id": "00000000a0bf003300000000",
    "name": "colosseum",
    "type": "file",
    "mime": "image/jpeg",
    "size": 100000,
    "childs":[],
    "parts":["part1","part2","parte3","parte4"]
  }

  filesystem = await jfs.add(toFind, nodes, payload);

  doc.filesystem.size += payload.size;
  console.log(JSON.stringify(filesystem));
  res.send("document added succefull!!!");

});





app.get('/remove', async (req, res) => {

  const toFind = req.body.nodeid;
  const userid = req.body.userid;
  const doc = JSON.parse(jsondoc);
  console.log('id target=>' + toFind)
  console.log('userid target=>' + req.body.userid)
  const nodes = doc[0].filesystem.nodes;
  const filesystemsize = doc[0].filesystem.size;
  const jfs = new JSONFS(toFind);
  filesystem = await jfs.remove(toFind, nodes);
  console.log(JSON.stringify(filesystem));
  res.send("document added succefull!!!");

});


app.get('/move', async (req, res) => {

  const toFind = req.body.nodeid; /*  node that needs to be moved */
  const toDest = req.body.nodedest; /*  destination node */
  const userid = req.body.userid;
  const doc = JSON.parse(jsondoc);
  console.log('node to move =>' + toFind)
  console.log('destination node =>' + toDest)
  console.log('userid target=>' + req.body.userid)

  const nodes = doc[0].filesystem.nodes;
  const filesystemsize = doc[0].filesystem.size;
  const jfs = new JSONFS(toFind);

  filesystem = await jfs.move(toFind, toDest, nodes);

  console.log(JSON.stringify(filesystem));
  res.send("Move node completed succefull!!");




});