import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState([]);
  const [repoData, setRepoData] = useState([]);

  const parentmap = {};

  const renderData = (parentId, result) => {};

  async function gitSubFfileURL(event, url, treeval, parentname) {
    if(event && event.stopPropagation) event.stopPropagation(); 
    const parentdiv = document.getElementById(parentname);
    await fetch(`${url}/${treeval}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result);

          result.tree.forEach((val) => {
            if (val.type == "blob") {
              const childdiv = document.createElement("a");
              childdiv.className = "casscade";
              // childdiv.href = val.url;
              childdiv.target = "_blank";
              childdiv.id = val.path;
              childdiv.innerText = val.path;
              parentdiv.appendChild(childdiv);
              //childdivs.push(childdiv);
            } else {
              const childdiv = document.createElement("div");
              childdiv.onclick = (e) => gitSubFfileURL.bind(null,e,
                url,
                val.sha,
                val.path
              );
               //val=val.sha
              childdiv.className = "casscade";
              childdiv.id = val.path;
              childdiv.innerText = val.path;
              parentdiv.appendChild(childdiv);
              //childdivs.push(childdiv);
            }
           });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async function gitFileURL(username, repoName) {
    var url =
      "https://api.github.com/repos/" +
      username +
      "/" +
      repoName +
      "/git/trees";
    await fetch(url + "/master")
      .then((res) => res.json())
      .then((result) => {
        console.log(36, result);

        if (!Array.isArray(result)) {
          result = [result];
        }
        const parentdiv = document.getElementById(repoName);
        const childdivs = [];
        // if (parentmap[repoName]) {
        //   parentmap[repoName].forEach((ele) => {
        //     parentdiv.removeChild(ele);
        //   });
        // }
        result.forEach((item) => {
          return item.tree.forEach((val) => {
            if (val.type == "blob") {
              const childdiv = document.createElement("a");
              childdiv.className = "casscade";
              childdiv.href = val.url;
              childdiv.target = "_blank";
              childdiv.innerText = val.path;
              childdiv.id = val.path;
              parentdiv.appendChild(childdiv);
              childdivs.push(childdiv);
            } else {
              const childdiv = document.createElement("div");
              childdiv.onclick = gitSubFfileURL.bind(
                null,
                null,
                url,
                val.sha,
                val.path
              ); //val=val.sha
              childdiv.className = "casscade";
              childdiv.id = val.path;
              childdiv.innerText = val.path;
              parentdiv.appendChild(childdiv);
              childdivs.push(childdiv);
            }
          });

          // const list = result.map((item) => {
          //   return item.tree.map((val) => {
          //     if (val.type == "blob") {
          //       return (
          //         <a target="_blank" href={val.url}>
          //           {val.path}
          //         </a>
          //       );
          //     } else {
          //       return (
          //         <div onClick={() => gitSubFfileURL(url, val.sha)}>
          //           {val.path}
          //         </div>
          //       );
          //     }
          //   });
          // });
          //setRepoData(list);
        });
        parentmap[repoName] = childdivs;
        // setRepoData(list);
        //   },
        //   (error) => {
        //     console.log(error);
        //   }

        // );
      });
  }

  async function repoDataURL() {
    await fetch("https://api.github.com/users/SANIAANJUM/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result);
          var reposName = [];
          const list = result.map((item) => (
            <div className="text-center">
              {/* reposName.push({item.name}); */}
              <div
                id={item.name}
                className="parentcasscade d-tree-toggler"
                onClick={() => gitFileURL("SANIAANJUM", item.name)}
              >
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
  useEffect(() => {
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
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={avatarURL} />
        <Card.Body>
          {/* <Card.Title>{githubUsername}</Card.Title> */}
          <Card.Text>Click on Username for list of Repositories</Card.Text>
          <Button variant="primary" onClick={repoDataURL}>
            {githubUsername}
          </Button>
        </Card.Body>
      </Card>
      {repoData}
    </div>
  );
}

export default App;
