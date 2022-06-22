import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function App() {

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

        <div>
            {gitFileURL}
        </div>
      );    

}

export default App;
