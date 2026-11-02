import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';
import NavBar from './Components/navbar.js';
import AboutCard from './Pages/aboutCard.js';
import ProjectsCard from './Pages/projectsCard.js';
import Data from './data/data.js';


// Need to move this into a data file.
let siteName = 'The_Big_Oh';
let sitePages = ['About','Projects', 'Contact', 'Ghost'];


console.log(Data);

function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',false,'bodyContain');  
  let bodySpacer = makeEle.createEle('div', 'bodyContainer', false,['bodyItems','bodySpacer']);


  let bodyLayout = [NavBar(siteName, sitePages),
                    bodySpacer,
                    AboutCard(Data.person),
                    ProjectsCard(Data.work),
                    makeEle.createEle('div','bodyArt',false,['bodyArt', 'bodyItems']),
                    makeEle.createEle('div','footer',false,'footer-container')];


  bodyLayout.forEach((item) => {
    console.log(item);
    bodyContainer.append(item);
  })

  body.append(bodyContainer);
}

RenderSite(); 