// import './App.css';
// import Axios from 'axios';
// import { useEffect, useState } from 'react';
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'

// function App() {
//   const [avatarURL, setAvatarURL] = useState();
//   const [githubUsername, setGitHubUsername] = useState();
//   const [repoData,setRepoData] = useState();

  
//   async function repoDataURL(){
//     await fetch("https://api.github.com/users/SANIAANJUM/repos")
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         console.log(36,result);
//         const list = result.map((item) => (
//         <div className= "text-center">
//           <a target="_blank" href={item.svn_url}>
//             {item.name}
//           </a>
//         </div>
//     ));
//     setRepoData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
      
//     );
//   }
//   useEffect(() =>{
//     fetch("https://api.github.com/users/SANIAANJUM")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           console.log(result);
//           setAvatarURL(result.avatar_url);
//           setGitHubUsername(result.login);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }, []);
  
//   return (
//     <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column" >
//       <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src= {avatarURL} />
//         <Card.Body>
//           {/* <Card.Title>{githubUsername}</Card.Title> */}
//             <Card.Text>
//               Click on Username for list of Repositories
//             </Card.Text>
//             <Button variant="primary" onClick = {repoDataURL}>{githubUsername}</Button>
//         </Card.Body>
//       </Card>
//       {repoData}
//     </div>
//   );
// }

// export default App;


  
  
//   ________________________________________________________________________________________
//   async function gitHubIdURL() {
//     await fetch("https://github.com/SANIAANJUM/dynamicprogramming --- url of repos")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           console.log(36,result);
//           const list = result.map((item) => (
//           <div className= "text-center">
//             string url=
//             <a target="_blank" href={item.svn_url}>
//               {item.name}
//             </a>
//           </div>
//       ));
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//   }, []);
//   ")
//     .then((res) => res.json())
//     .then(
//       (result) => {
//         console.log(36,result);
//         const list = result.map((item) => (
//         <div className= "text-center">
//           string url=
//           <a target="_blank" href={item.svn_url}>
//             {item.name}
//           </a>
//         </div>
//     ));
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
// }, []);


//------------------------------------------------------------------------------------------------------------------
//after joining

import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [repoData,setRepoData] = useState();
  



  async function gitSubFfileURL(url,treesha){
    
    await fetch(url+treesha)
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(36,result);
        const list = result.map((item) => {
          if(item.type =="blob"){
            var filePath= item.path;
            <a target="_blank" href={item.svn_url}>
            {item.name}
          </a>
          }
          else{
            console.log(item.name);
            <div onClick= {gitSubFfileURL(url,item.sha)} >
              {item.name}
            </div>
          }
        });
    setRepoData(list);
      },
      (error) => {
        console.log(error);
      }
      
    );
  }



  async function gitFileURL(username,repoName){
    var url="https://api.github.com/repos/"+username+"/"+repoName+"/git/trees";
    await fetch(url+"/master")
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(36,result);
        
        if (!Array.isArray(result)){
          result= [result];
        }
        const list = result.map((item) => {
          if(item.type =="blob"){
            var filePath= item.path;
            <a target="_blank" href={item.svn_url}>
            {item.name}
          </a>
          }
          else{
            console.log(item.name);
            <div onClick= {() => gitSubFfileURL(url,item.sha)} >
              {item.name}

            </div>
          }
        }
          );
    setRepoData(list);
      },
      (error) => {
        console.log(error);
      }
      
    );
  }


  
  
  
  
  async function repoDataURL(){
    await fetch("https://api.github.com/users/SANIAANJUM/repos")
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(36,result);
        var reposName = [];
        const list = result.map((item) => (
        <div className= "text-center">
          {/* reposName.push({item.name}); */}
          <div onClick= {() => gitFileURL("SANIAANJUM",item.name)} >
            {item.name}
          </div>
          {/* console.log("https://api.github.com/repos/SANIAANJUM/dynamicprogramming/git/trees/master?recursive=1") */}
          {/* <a target="_blank" href={item.svn_url}>
            {item.name}
          </a>
          {/* <div href={item.svn_url} onClick = {gitFileURL()}>{item.name}</div> */}
           
        </div>
    ));
    setRepoData(list);
      },
      (error) => {
        console.log(error);
      }
      
    );
  }
  useEffect(() =>{
    fetch("https://api.github.com/users/SANIAANJUM")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column" >
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src= {avatarURL} />
        <Card.Body>
          {/* <Card.Title>{githubUsername}</Card.Title> */}
            <Card.Text>
              Click on Username for list of Repositories
            </Card.Text>
            <Button variant="primary" onClick = {repoDataURL}>{githubUsername}</Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  );
}

export default App;

