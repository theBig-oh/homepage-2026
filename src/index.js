import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';
import NavBar from './Components/navbar.js';
import TitleCard from './Pages/titleCard.js';

// Need to move this into a data file.
let siteName = 'The_Big_Oh';
let sitePages = ['Projects', 'Experience', 'Contact', 'Ghost'];



function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',false,'bodyContain');  



  let bodyLayout = [NavBar(siteName, sitePages),
                    TitleCard(),
                    makeEle.createEle('div','bodyProjects',false,['bodyProjects', 'bodyItems']),
                    makeEle.createEle('div','bodyArt',false,['bodyArt', 'bodyItems']),
                    makeEle.createEle('div','footer',false,'footer-container')];


  bodyLayout.forEach((item) => {
    console.log(item);
    bodyContainer.append(item);
  })

  body.append(bodyContainer);
}

RenderSite(); 