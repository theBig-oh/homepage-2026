var data = {
            /* Personal Info */
            "person": {
              "name": ["Oscar","Medrano"],
              "position": [
                "front end developer",
                "web developer",
                "UX developer"
              ],    
              "location": [
                  "new york city", 
                  "new york",
                  "nyc",
                  "bronx",
                  "queens"
               ],                       
              "contact": [
                {
                  "name":"Email",
                  "link":"mailTo:Oscar@TheBigOh.net",
                  "handle":"Oscar@TheBigOh.net",
                  "icon":"../images/icons/email.png"
                },
                {
                  "name":"linkedIn",
                  "link":"https://www.linkedin.com/in/oscarmedrano/",
                  "handle":"Oscar Medrano",
                  "icon":"../images/icons/linkedIn.png"
                },
                {
                  "name":"Github",
                  "link":"http://github.com/thebig-oh",
                  "handle":"thebig-oh",
                  "icon":"../images/icons/gitBlack.png"
                },
                {
                  "name":"Instagram",
                  "link":"http://instagram.com/the_big_oh",
                  "handle":"@the_big_oh",
                  "icon":"../images/icons/insta.svg"
                },

               ],
              "skillSet": [
                { 
                  "name" : "JS/ES6",
                  "level": 8.75
                },
                {
                  "name":"HTML5",
                  "level": 9
                },
                {
                  "name":"CSS",
                  "level": 10,
                },
                {
                  "name":"ReactJS",
                  "level": 7.5
                },
                {
                  "name":"VueJS",
                  "level": 7
                },
                {
                  "name":"Java",
                  "level": 10
                }
              ],
            },
            /* Work Exp */
            "work": [
              {
                "name": "People Inc.",
                "position": "Software Developer",
                "location": "New York, New York",
                "startDate": "Feb 2019",
                "endDate": "Oct 2026",
                "isPresent": false,
                "duties": [
                  "Building new components using custom framework",
                  "Implementing designs to further push CPM",
                  "Working with designers, QA, and product stakeholders",
                  "Researching new workflows for quicker development process"
                ]
              },
              {
                "name": "Brickwork Software",
                "position": "Front End Developer",
                "location": "New York, New York",
                "startDate": "May 2017",
                "endDate": "July 2018",
                "isPresent": false,
                "duties": [
                  "Working with clients for online to in-store conversions",
                  "Clients include Chanel, Saks, and David Yurman",
                  "Implementing client designs into final product",
                  "Developing new ideas to streamline implementation of projects",
                  "Writing up new components to meet client demands"
                ]
              },
              {
                "name": "Freelance",
                "position": "Web Developer / Graphic Artist",
                "location": "New York, New York",
                "startDate": "July 2014",
                "endDate": null,
                "isPresent": true,
                "duties": [
                  "Developing custom websites for clients",
                  "Drawing up layouts using Illustrator",
                  "Creating custom logos and graphic assets to fullfill client needs",
                  "Host and maintain sites"
                ]
              }
            ],
            /* Projects */
            "projects": [
              {
                "name": "Guitar Tools",
                "url":"http://reactguitar.thebigoh.net",
                "framework":"ReactJS",
                "purpose": [
                  "Wanted to help guitarist find their way around the fretboard with music theory",
                  "Added a \"Lefty\" mode for lefty guitarist after popular demand",
                  "Made with \"Responsive Design\" in mind, so you can use it on any device."
                ],
                "projectImage": "https://i.imgur.com/b4bmsg2.png?1",
              },
              {
                "name": "Guitar Tools",
                "url":"http://guitarredux.thebigoh.net",
                "framework":"Vanilla JS / No Framework",
                "purpose": [
                  "Helping guitarists learn where the nearest harmonic is for different positions on the fretboard",
                  "Stylized to look like a marshalls amp",
                  "Made with Vanilla JS only. Desktop Only"
                ],
                "projectImage": "https://i.imgur.com/b4bmsg2.png?1",
              }              
            ]
          }

export default data;
